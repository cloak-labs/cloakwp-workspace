import { useGlobalConfig } from "./useGlobalConfig"

/* Function definition:
  useSlugModifier() takes an array of posts (or a single post object), and modifies each post's slug based on your CloakWP config option "postBaseSlugs". 
  'postBaseSlugs' allows you to specify that certain post type slugs should get prepended with a sub-directory. If you specify in your Next.js routing that blog posts live under the '/blog/' route,
  you must specify 'postBaseSlugs': { post: 'blog/' } in your cloakwp.config.js file. This ensures any time you fetch blog posts from WordPress, each post's slug property gets prepended with 'blog/',
  which ensures all internal linking and static revalidation works as expected. This is required because WordPress doesn't know about your Next.js routing strategy, and doesn't ever prepend the 'slug' property of posts with the correct sub-route.
*/
export async function useSlugModifier(posts) {
  const config = await useGlobalConfig()
  const { postBaseSlugs } = config
  if(!postBaseSlugs) return posts
  
  // the package user has provided baseSlugs to prepend to certain post type slugs, which we do below:
  let convertedToArray = false
  if(!Array.isArray(posts)) {
    convertedToArray = true
    posts = [posts]
  }
  posts = posts.map(post => {
    // modify post object's slug:
    if(post && post.type && postBaseSlugs[post.type]){
      post.slug = `${postBaseSlugs[post.type]}${post.slug}`
    }

    // modify any post slugs for any posts in ACF relationship/page_link/post_object fields
    if(post.has_blocks && post.blocksData && post.blocksData.length){
      post.blocksData.map(block => {
        if(block.attrs.hasRelationshipFields){
          // let blockFieldValues = Object.values(block.attrs.data)
          let blockFields = Object.entries(block.attrs.data)
          blockFields = blockFields.map(([key, val]) => {
            if(val && val.value && (val.type == 'relationship' || val.type == 'page_link' || val.type == 'post_object')){
              val.value = val.value.map(relatedPost => {
                if(relatedPost && relatedPost.post_type && postBaseSlugs[relatedPost.post_type]){
                  relatedPost.slug = `${postBaseSlugs[relatedPost.post_type]}${relatedPost.post_name}`
                }
                return relatedPost
              })
            }
            return [key, val]
          })
          block.attrs.data = Object.fromEntries(blockFields);
        }
        return block
      })
    }

    return post
  })

  return posts.length > 1 ? posts : (
    convertedToArray ? posts[0] : posts
  )
}
