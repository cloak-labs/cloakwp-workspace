import { useFetchRestAPI } from "../hooks/useFetchRestAPI";

// Function: returns all menus using CloakWP's custom /menus endpoint created by the WP Plugin
// @params slug - optionally provide a menu slug to only fetch a specific menu
export async function getMenus(slug = '') {
  let res = await useFetchRestAPI(`/menus${slug ? `/${slug}` : ''}`, {
    apiNamespace: "wp-json/cloakwp",
    embed: false,
    includeJwt: false
  });

  console.log("Menu res: ", res)

  if(!Array.isArray(res)) res = [res]

  // convert internal links to relative paths to ensure menu links work across different environments
  const formattedMenus = res?.map(menu => {
    const formattedMenuItems = menu.menu_items?.map(item => {
      let { link_type, url } = item

      if (link_type == "custom") return item // don't alter custom links since these are most likely linking to 3rd party sites

      // remove http:// or https:// from url:
      url = url.replace("https://", "").replace("http://", "")
  
      // now chop off domain name so we're left with a relative path
      url = url.substring(url.indexOf('/'))
  
      // Remove trailing backslash to avoid hydration error:
      url = url.replace(/\/$/, "")
  
      return {
        ...item,
        url
      }
    })

    return {
      ...menu,
      menu_items: formattedMenuItems
    }
  })

  return slug && Array.isArray(formattedMenus) ? formattedMenus[0] : formattedMenus
}