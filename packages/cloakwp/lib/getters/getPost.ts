import { getQueryParamsString } from "../utils/getQueryParamsString";
import { useFetchRestAPI } from "../hooks/useFetchRestAPI";

export async function getPost({ postType = 'posts', slug, id, queryParams = '', fetchOptions = {} }) {
  let endpoint
  if (id) endpoint = `/${postType}/${id}`
  else endpoint = (slug && slug != '/') ? `/${postType}?slug=${slug}` : `/frontpage`
  
  let queryParamsString = getQueryParamsString(queryParams, endpoint)

  let data = await useFetchRestAPI(`${endpoint}${queryParamsString}`, { includeJwt: false, ...fetchOptions });
  if (Array.isArray(data)) data = data[0]
  return { data }
}