let blockConfig;
console.log('CloakWP custom config path: ', process.env.NEXT_PUBLIC_CUSTOM_CLOAKWP_CONFIG_PATH)

if (process.env.NEXT_PUBLIC_CUSTOM_CLOAKWP_CONFIG_PATH) {
  blockConfig = require(process.env.NEXT_PUBLIC_CUSTOM_CLOAKWP_CONFIG_PATH);
} else if (process.env.NODE_ENV == 'development') {
  blockConfig = require('../../../../examples/basic-starter/cloakwp.config.js');
} else {
  blockConfig = require('../../../../cloakwp.config.js');
}

export function useGlobalConfig() {
  if (!blockConfig) throw Error("You're missing a blockConfig object in your root-level cloakwp.config.js file.")
  return blockConfig
}