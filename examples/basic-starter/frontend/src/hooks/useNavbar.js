import { useFetchRestAPI } from "cloakwp";

export async function useNavbar() {
  const data = await useFetchRestAPI('/menu', false); // requires a PHP snippet in WP theme > functions.php to create 'menu' API endpoint

  const formattedData = data?.map(({url, title}) => {
    // remove http:// or https:// from url:
    url = url.replace("https://", "").replace("http://", "")

    // now chop off domain name so we're left with a relative path (ensures menu links work across different environments):
    url = url.substring(url.indexOf('/'))

    // Remove trailing backslash to avoid hydration error:
    url = url.replace(/\/$/, "")

    return {
      url,
      title
    }
  })
  
  return formattedData;
}
