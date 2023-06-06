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
    includeJwt = true,
    dataSource = 'default', // optionally specify the WordPress dataSource key, matching your cloakwp.config.js, to fetch data from another WP instance
  } = options

  if(!endpoint) throw new Error('You must pass in an endpoint to useFetchRestAPI')
  const config = await useGlobalConfig()

  const sourceConfig = config?.sources?.[dataSource]
  if(!sourceConfig) throw new Error(`The WordPress data source "${dataSource}" is missing from your cloakwp.config.js -- so there's nothing to fetch from.`)

  let { url, jwt, contentPath } = sourceConfig
  if(!url) throw new Error(`The WordPress URL for the data source "${dataSource}" is missing from your cloakwp.config.js -- this is required to use useFetchRestAPI.`)

  let headers = {
    'Content-Type': 'application/json',
  };

  // The JWT isn't required for all requests, only protected routes such as post revisions
  if (includeJwt && jwt) headers['Authorization'] = `Bearer ${jwt}`

  let embedParam = ''
  if(embed){
    if(endpoint.includes('?')) embedParam = '&_embed='
    else embedParam = '?_embed='
  }

  if(url.slice(-1) != "/") url += '/' // add trailing slash if missing

  const fetchUrl = `${url}${apiNamespace}${endpoint}${embedParam}`
  // console.log('Fetch URL: ', fetchUrl)

  const res = await fetch(
    fetchUrl,
    {
      headers,
      method: 'GET',
    }
  );

  let posts = await res.json();

  if (posts.errors) throw new Error(`Failed to fetch data from WP REST API at "${fetchUrl}" -- Error: ${posts.errors}`);

  if (res.status !== 200) {
    console.error(res.status, res.statusText);
  }

  if(modifyBaseSlugs) posts = await slugModifier(posts) // adjust post slugs if necessary

  if(posts && convertToRelativeURLs){ // remove all references to WP URL in data
    let postsString = JSON.stringify(posts)
    const hasTrailingSlash = url.slice(-1) == '/'
    const wpUrl = hasTrailingSlash ? url.slice(0, -1) : url

    // remove all references to WordPress URL but then add them back for any URLs referencing content under /wp-content folder, where the WP URL reference is required
    postsString = postsString?.replaceAll(wpUrl, '')?.replaceAll(`/${contentPath}`, `${wpUrl}/${contentPath}`)
    posts = JSON.parse(postsString)
  }

  return posts;
}