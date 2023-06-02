import { useFetchRestAPI } from "../hooks/useFetchRestAPI";
import { getPosts } from "./getPosts";

export async function getPaths(postType = 'pages', prependSlug = false) {
    // const { postType = 'pages', prependSlug = false } = props || {}
    let home
    if(postType == 'pages') home = await useFetchRestAPI('/frontpage')

    const posts = await getPosts(postType);

    const prepend = prependSlug ? (
        typeof prependSlug == "boolean" ? `/${postType}` : `/${prependSlug}` // you can either set prependSlug to true/false or a custom string -- if true, we'll use the postType string as the prepend string
    ) : ''

    return posts?.map((post) => {
        const slug = (postType == 'pages' && post.slug == home?.slug) ? '' : post.slug
        return `${prepend}/${slug}`
    }) || [];
}