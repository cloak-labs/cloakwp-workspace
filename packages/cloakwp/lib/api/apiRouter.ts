import { NextApiRequest, NextApiResponse } from "next";
import setLoggedIn from "./setLoggedIn";
import setLoggedOut from "./setLoggedOut";
import regenerateStaticPage from "./revalidate";
import enablePreviewMode from "./enablePreviewMode";
import exitPreviewMode from "./exitPreviewMode";

export default function apiRouter(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const slug = req.query.route;

  switch (slug[0]) {
    case 'login':
      return setLoggedIn(req, res);
    case 'logout':
      return setLoggedOut(req, res);
    case 'revalidate':
      return regenerateStaticPage(req, res);
    case 'preview':
      return enablePreviewMode(req, res);
    case 'exit-preview':
      return exitPreviewMode(req, res);
    default:
      res.statusCode = 404;
      res.end();
  }
}