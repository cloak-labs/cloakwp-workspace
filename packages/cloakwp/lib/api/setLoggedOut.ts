import { setCookie } from 'cookies-next'
import { useGlobalConfig } from '../hooks/useGlobalConfig';

export default async function setLoggedOut(req, res) {
  const config = await useGlobalConfig()
  
  const { secret } = req.query;
  
  // Check the secret and next parameters.
  // This secret should only be known by this API route
  if (!config.wpSecret){
    return res.status(401).json({ message: "You haven't supplied a secret via the 'wpSecret' prop in your cloakwp.config.js file." });
  }
  if (secret !== config.wpSecret){
    return res.status(401).json({ message: 'Invalid secret token -- pass in a valid secret via a "secret" parameter that matches the secret you supplied as "wpSecret" in your cloakwp.config.js file.' });
  }
  
  setCookie('cloakwp-logged-in', 'false', { req, res });
  
  // console.log('log out and redirect back to wp-admin')
  res.writeHead(307, { Location: `${config.wpUrl}/${config.wpAdminUrl || 'wp-admin'}` }).end()

  // return res.status(200).json({ login: 'false' });
}