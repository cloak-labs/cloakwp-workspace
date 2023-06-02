import { getPost } from "./getPost";

export async function getPage({ slug, id, queryParams }) {
  const page = getPost({
    postType: "pages",
    slug,
    id,
    queryParams
  });
  return page;
}
