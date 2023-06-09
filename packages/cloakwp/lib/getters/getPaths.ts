import { getPosts } from "./getPosts";

export async function getPaths(postType = 'pages') {
  const posts = await getPosts(postType, {
    queryParams: { '_fields': 'pathname' }
  });
  
  return posts?.map(post => post.pathname) || [];
}