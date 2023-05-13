/* DEVELOPMENT:
*   While testing locally, uncomment the below line and specify the absolute path to the cloakwp config file of the project you're testing with via npm link
*/
// const blockConfig = require('C:/Users/Kaelan Smith/Documents/Stikky Media/Lionheart Coaching/website-2/tailwindui-pocket/cloakwp.config.js');

/* FOR PRODUCTION:
*   In production, we grab the cloakwp config using a relative path, which assumes the user's node_modules folder is at the root level, and cloakwp.config is also at the root level.. can improve this later to work in edge-case scenarios
*/
let blockConfig;

blockConfig = require('../../../../cloakwp.config.js');

if (process.env.CUSTOM_CLOAKWP_CONFIG_PATH) {
  blockConfig = require(process.env.CUSTOM_CLOAKWP_CONFIG_PATH);
}

// Below, I tried dynamically using the imported config based on whether NODE_ENV == production or development.. but a "Module not found" error will always occur for one of the above imports, so I'm abandoning this for now and just manually commenting out the development/testing import 
// const config = {
//     development: devBlockConfig,
//     production: blockConfig
// }[process.NODE_ENV]

export function useGlobalConfig() {
  if (!blockConfig) throw Error("You're missing a blockConfig object in your root-level cloakwp.config.js file.")
  return blockConfig
}