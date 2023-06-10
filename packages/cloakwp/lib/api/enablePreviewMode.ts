import { getPost } from "../getters/getPost";
import { useGlobalConfig } from "../hooks/useGlobalConfig";

export default async function enablePreviewMode(req, res) {
  const config = await useGlobalConfig()

  let { secret, revisionId, postId, postType } = req.query;

  if(postId == 0 || postId == '0') {
    postId = `${revisionId}` // this fixes previewing a draft or a post that doesn't have a revision.. string interpolation is used to *copy* revisionId rather than reference it
    revisionId = null
  }

  // Check the secret and next parameters.
  // This secret should only be known by this API route
  if (!config.wpSecret){
    return res.status(401).json({ message: "You haven't supplied a secret via the 'wpSecret' prop in your cloakwp.config.js file." });
  }
  if (secret !== config.wpSecret){
    return res.status(401).json({ message: 'Invalid secret token -- pass in a valid secret via a "secret" parameter that matches the secret you supplied as "wpSecret" in your cloakwp.config.js file.' });
  }
 
  // if (!revisionId) return res.status(401).json({ message: 'A post revision ID was not supplied -- pass it in via a "revisionId" parameter.' });
  if (!postId) return res.status(401).json({ message: 'A master post ID was not supplied -- pass it in via a "postId" parameter.' });
  if (!postType) return res.status(401).json({ message: 'A post type was not supplied -- pass it in via a "postType" parameter.' });

  let postTypeRestEndpoint = postType
  if(postType == 'page') postTypeRestEndpoint = 'pages'
  else if(postType == 'post') postTypeRestEndpoint = 'posts'

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const { data: { pathname } } = await getPost({
    postType: postTypeRestEndpoint,
    id: postId
  });
  
  // If the post doesn't exist prevent preview mode from being enabled
  if (!pathname) {
    return res.status(401).json({ message: `Post of type "${postType}" with ID "${postId}" was not found; therefore, we abandoned preview mode.` });
  }
    
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    post: {
      pathname,
      revisionId,
      postId,
      postType,
      postTypeRestEndpoint,
    },
  }, {
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
    path: pathname, // The preview mode cookies apply to the page we're previewing (visiting any other page turns off preview mode)
  });

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: pathname });
  res.end();
}