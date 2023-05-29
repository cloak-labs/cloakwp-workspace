export default async function exit(req, res) {
    // Exit the current user from "Preview Mode". This function accepts no args.
    const { parentSlug } = req.query;
    res.clearPreviewData()
  
    // Redirect the user back to the index page.
    res.writeHead(307, { Location: `/${parentSlug}` })
    res.end()
}  