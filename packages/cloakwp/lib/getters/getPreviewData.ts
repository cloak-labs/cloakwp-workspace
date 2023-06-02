import { useFetchRestAPI } from "../hooks/useFetchRestAPI";

export async function getPreviewData(previewParams) {
  const { revisionId = null, postId, postTypeRestEndpoint, ...rest } = previewParams.post

  let data
  if(revisionId){
    data = await useFetchRestAPI(`/${postTypeRestEndpoint}/${postId}/revisions/${revisionId}`);
  }
  
  if(!revisionId || !data || data?.data?.status == 404) { // sometimes someone is previewing a post with no revisions, so we just show them the published data:
    data = await useFetchRestAPI(`/${postTypeRestEndpoint}/${postId}`);
  }

  return {
    data,
    params: {
      revisionId,
      postId,
      postTypeRestEndpoint,
      ...rest
    }
  }
}