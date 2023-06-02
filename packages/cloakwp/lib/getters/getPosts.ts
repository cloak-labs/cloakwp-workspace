import { getQueryParamsString } from "../utils/getQueryParamsString";
import { useFetchRestAPI } from "../hooks/useFetchRestAPI";

export async function getPosts(postType = 'posts', options = {}) {
  let { queryParams = '', postsPerCall = 100 } = options

  // WordPress limits us to retrieve at most 100 pages/posts at a time, so the following loop logic retrieves all posts/pages using multiple requests if needed.
  let numCalls = 0
  let allPosts = []
  let endpoint = `/${postType}?per_page=${postsPerCall}`
  let queryParamsString = getQueryParamsString(queryParams, endpoint)
  while(allPosts.length == (postsPerCall * numCalls)){ // this loop will finish once a fetch returns less posts than the postsPerCall value
    let posts = await useFetchRestAPI(`${endpoint}&offset=${postsPerCall * numCalls}${queryParamsString}`);
    if(posts && posts.length) allPosts.push(...posts)
    else break
    numCalls++
  }

  return allPosts;
}