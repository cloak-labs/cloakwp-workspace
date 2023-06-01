export default async function exitPreviewMode(req, res) {
  const { slug } = req.query;

  /* Exit the current user from "Preview Mode".
     Note: we pass in an options object with path == the path of the page we were previewing. 
          This is required when setting options.path inside setPreviewData() -- like we're 
          doing. Otherwise exiting preview mode doesn't work. This was a bug that was 
          reported here: https://github.com/vercel/next.js/issues/39853, and was fixed in 
          Next v12.3.0 here: https://github.com/vercel/next.js/pull/40238/files .. 
          Passing options into clearPreviewData() is currently undocumented, but was discovered
          by reading the code changes in the above link.

          * Therefore, using cloakwp's preview feature requires using Next v12.3.0 or greater 
  */
  res.clearPreviewData({ path: `/${slug}` })

  // Redirect the user back to the same page they were just previewing -- they'll now see the published version.
  res.writeHead(307, { Location: `/${slug}` })
  res.end()
}