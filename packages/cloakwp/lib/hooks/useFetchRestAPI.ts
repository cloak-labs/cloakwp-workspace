import { useGlobalConfig } from "./useGlobalConfig";
import { slugModifier } from "../utils/slugModifier";

export async function useFetchRestAPI(
  endpoint, // api URL endpoint that comes after `wp-json/wp/v2` (include first slash)
  options = {},
) {
  const {
    embed = true, // the embed param tells WordPress to return expanded data for certain things such as a page/post's full taxonomy data
    modifyBaseSlugs = true, // when true, our custom hook, slugModifier, is used to prepend the page/post slugs returned from WP according to the package user's config
    convertToRelativeURLs = true, // when true, we search/replace all WordPress admin URLs found in data returned from WP with an empty string, except /wp-content URLs. This ensures internal linking always works (including across environments)
    apiNamespace = "wp-json/wp/v2",
    includeJwt = true
  } = options

  if(!endpoint) throw new Error('You must pass in an endpoint to useFetchRestAPI')
  const config = await useGlobalConfig()

  if(!config?.wpUrl) throw new Error('wpUrl is missing from CloakWP global config -- this is required to use useFetchRestAPI.')

  let headers = {
    'Content-Type': 'application/json',
  };

  if (includeJwt && config.wpJwt) headers['Authorization'] = `Bearer ${config.wpJwt}` // including our JWT in all requests just ensures we can fetch data from any protected routes (such as post revisions for our preview feature)

  let embedParam = ''
  if(embed){
    if(endpoint.includes('?')) embedParam = '&_embed='
    else embedParam = '?_embed='
  }

  let url = config.wpUrl
  if(url.slice(-1) != "/") url += '/' // add trailing slash if missing

  const fetchUrl = `${url}${apiNamespace}${endpoint}${embedParam}`
  console.log('Fetch URL: ', fetchUrl)

  const res = await fetch(
    fetchUrl,
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

  if(modifyBaseSlugs) posts = await slugModifier(posts) // adjust post slugs if necessary

  if(posts && convertToRelativeURLs){ // remove all references to WP URL in data
    let postsString = JSON.stringify(posts)
    const hasTrailingSlash = config.wpUrl.slice(-1) == '/'
    const url = hasTrailingSlash ? config.wpUrl.slice(0, -1) : config.wpUrl
    postsString = postsString?.replaceAll(url, '')?.replaceAll('/wp-content', `${url}/wp-content`) // removes all references to WordPress URL but then adds them back for any URLs referencing content under /wp-content folder, where the WP URL reference is required
    posts = JSON.parse(postsString)
  }


  return posts;
}