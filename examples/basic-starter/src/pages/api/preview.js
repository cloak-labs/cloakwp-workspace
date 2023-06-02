import { getPage } from 'cloakwp';

export default async function preview(req, res) {
  const { secret, id, slug, parent } = req.query;

  // Check the secret and next parameters
  // This secret should only be known by this API route
  if (
    !process.env.WORDPRESS_PREVIEW_SECRET ||
    secret !== process.env.WORDPRESS_PREVIEW_SECRET ||
    (!id && !slug)
  ){
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const { data: {slug: parentSlug} } = await getPage({id: parent});
  // console.log(parent);

  // If the post doesn't exist prevent preview mode from being enabled
  if (!parentSlug) {
    return res.status(401).json({ message: 'Post not found' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    post: {
      id,
      parent,
      parentSlug
    },
  });

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${parentSlug}`});
  res.end();
}
