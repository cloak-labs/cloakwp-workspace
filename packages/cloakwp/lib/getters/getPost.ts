import { getQueryParamsString } from "../utils/getQueryParamsString";
import { useFetchRestAPI } from "../hooks/useFetchRestAPI";

export async function getPost({ postType = 'posts', slug, id, queryParams = '' }) {
  let endpoint
  if (id) endpoint = `/${postType}/${id}`
  else endpoint = (slug && slug != '/') ? `/${postType}?slug=${slug}` : `/frontpage`
  
  let queryParamsString = getQueryParamsString(queryParams, endpoint)

  let data = await useFetchRestAPI(`${endpoint}${queryParamsString}`);
  if (Array.isArray(data)) data = data[0]
  return { data }
}