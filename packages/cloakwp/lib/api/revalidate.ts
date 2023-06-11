import { useGlobalConfig } from "../hooks/useGlobalConfig";

export default async function regenerateStaticPage(req, res){
  const config = await useGlobalConfig()
  const { pathname, secret } = req.query;

  try {
    if (secret !== config.sources.default.secret) {
      throw 'Page Revalidation - Invalid preview secret';
    }

    await res.revalidate(pathname).catch((err) => {
      throw `Page Revalidation - Can't revalidate path '${pathname}'`;
    });

    return res.json({ page: pathname, revalidated: true });
  } catch (error) {
    console.error(new Error(error));
    return res.status(500).send({ error: error, slug: pathname });
  }
}