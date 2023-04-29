import { useGlobalConfig } from "../hooks/useGlobalConfig";
import { useSlugModifier } from "../hooks/useSlugModifier";

export default async function regenerateStaticPage(req, res){
    const config = await useGlobalConfig()
    const { slug, type, secret } = req.query;
    const post = await useSlugModifier({slug, type})

    console.log('on-demand revalidate page: ', post.slug)

    try {
        if (secret !== config.wpSecret) {
            throw 'Page Revalidation - Invalid preview secret';
        }

        await res.revalidate(`/${post.slug}`).catch((err) => {
            throw `Page Revalidation - Can't revalidate slug '/${post.slug}'`;
        });

        return res.json({ page: `/${post.slug}`, revalidated: true });
    } catch (error) {
        console.error(new Error(error));
        return res.status(500).send({ error: error, slug: `/${post.slug}` });
    }
}