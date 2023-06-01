let blockConfig;

if (process.env.NEXT_PUBLIC_CUSTOM_CLOAKWP_CONFIG_PATH) {
  // user can set this ENV var in their front-end to customize the path to the CloakWP config file
  blockConfig = require(process.env.NEXT_PUBLIC_CUSTOM_CLOAKWP_CONFIG_PATH);
} else {
  // defaults to assuming we're running in node_modules at the root of the project:
  blockConfig = require('../../../../cloakwp.config.js');
}

export function useGlobalConfig() {
  if (!blockConfig) throw Error("You're missing a blockConfig object in your root-level cloakwp.config.js file.")
  return blockConfig
}