import { useGlobalConfig } from "./useGlobalConfig";
// import { useSlugModifier } from "../hooks/useSlugModifier";

export async function useFetchGraphAPI(query = '', { variables } = {}) {
  const config = await useGlobalConfig()
  if(!config.wpGraphQlBaseURL) throw new Error('wpGraphQlBaseURL is missing from CloakWP global config -- this is required to use useFetchGraphAPI().')
  // if(!config.wpAuthRefreshToken) throw 'wpAuthRefreshToken is missing from CloakWP global config -- this is required to use useFetchGraphAPI().'

  const headers = { 'Content-Type': 'application/json' };

  if (config.wpAuthRefreshToken) headers['Authorization'] = `Bearer ${config.wpAuthRefreshToken}`;

  // WPGraphQL Plugin must be enabled
  const res = await fetch(config.wpGraphQlBaseURL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch data from GraphQL API: ', json.errors);
  }
  
  return json.data;
}