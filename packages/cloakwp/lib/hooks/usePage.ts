import { usePost } from "./usePost";

export async function usePage({ slug, id, queryParams }) {
  const page = usePost({
    postType: "pages",
    slug,
    id,
    queryParams
  });
  return page;
}
