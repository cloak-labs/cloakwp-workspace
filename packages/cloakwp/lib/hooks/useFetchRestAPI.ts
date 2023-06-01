import { useGlobalConfig } from "./useGlobalConfig";
import { useSlugModifier } from "./useSlugModifier";

export async function useFetchRestAPI(
  endpoint, // api URL endpoint that comes after `wp-json/wp/v2` (include first slash)
  embed = true, // the embed param tells WordPress to return expanded data for certain things such as a page/post's full taxonomy data
  modifyBaseSlugs = true, // when true, our custom hook, useSlugModifier, is used to prepend the page/post slugs returned from WP according to the package user's config
  convertToRelativeURLs = true // when true, we search/replace all WordPress admin URLs found in data returned from WP with an empty string, except /wp-content URLs. This ensures internal linking always works (including across environments)
) {

  if(!endpoint) throw new Error('You must pass in an endpoint to useFetchRestAPI')
  const config = await useGlobalConfig()

  if(!config?.wpUrl) throw new Error('wpUrl is missing from CloakWP global config -- this is required to use useFetchRestAPI.')

  // JWT is required for fetching post revisions (for preview feature), and for fetching draft posts (so logged in users can preview drafts)
  if(!config?.wpJwt) throw new Error('wpJwt is missing from CloakWP global config -- this is required to use useFetchRestAPI.') 

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.wpJwt}`, // including our JWT in all requests just ensures we can fetch data from any protected routes (such as post revisions for our preview feature)
  };

  let embedParam = ''
  if(embed){
    if(endpoint.includes('?')) embedParam = '&_embed='
    else embedParam = '?_embed='
  }

  let url = config.wpUrl
  if(url.slice(-1) != "/") url += '/' // add trailing slash if missing

  const res = await fetch(
    `${url}wp-json/wp/v2${endpoint}${embedParam}`,
    {
      headers,
      method: 'GET',
    }
  );

  console.log(`Fetched`)
  let posts = await res.json();

  if (posts.errors) {
    console.log(`Fetch errors`)
    console.error(posts.errors);
    throw new Error('Failed to fetch data from REST API: ', posts.errors);
  }

  if (res.status !== 200) {
    console.error(res.status, res.statusText);
  }

  if(modifyBaseSlugs) posts = await useSlugModifier(posts) // adjust post slugs if necessary

  if(posts && convertToRelativeURLs){ // remove all references to WP URL in data
    let postsString = JSON.stringify(posts)
    const hasTrailingSlash = config.wpUrl.slice(-1) == '/'
    const url = hasTrailingSlash ? config.wpUrl.slice(0, -1) : config.wpUrl
    postsString = postsString?.replaceAll(url, '')?.replaceAll('/wp-content', `${url}/wp-content`) // removes all references to WordPress URL but then adds them back for any URLs referencing content under /wp-content folder, where the WP URL reference is required
    posts = JSON.parse(postsString)
  }


  return posts;
}