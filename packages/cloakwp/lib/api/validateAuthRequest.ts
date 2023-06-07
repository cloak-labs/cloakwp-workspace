import { useGlobalConfig } from "../hooks/useGlobalConfig";

export default async function validateAuthRequest (req, res) {
  const config = await useGlobalConfig()
  const { sources: { default: { secret: wpSecret, url, adminPath }}} = config
  const { secret } = req.query

  // Check the secret
  if (!wpSecret){
    return { error: res.status(401).json({ message: "You haven't supplied a secret via the 'sources.default.secret' prop in your cloakwp.config.js file." }) };
  }
  if (secret !== wpSecret){
    return { error: res.status(401).json({ message: 'Invalid secret token -- pass in a valid secret via a "secret" parameter that matches the secret you supplied as "sources.default.secret" in your cloakwp.config.js file.' }) };
  }

  return { redirectUrlBase: `${url}${adminPath}`}
}