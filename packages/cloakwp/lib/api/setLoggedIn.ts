import { setCookies } from 'cookies-next'
import { useGlobalConfig } from '../hooks/useGlobalConfig';

export default async function setLoggedIn(req, res) {
  const config = await useGlobalConfig()

  const { secret } = req.query;

  console.log({secret})

  // Check the secret and next parameters.
  // This secret should only be known by this API route
  if (!config.wpSecret){
    return res.status(401).json({ message: "You haven't supplied a secret via the 'wpSecret' prop in your cloakwp.config.js file." });
  }
  if (secret !== config.wpSecret){
    return res.status(401).json({ message: 'Invalid secret token -- pass in a valid secret via a "secret" parameter that matches the secret you supplied as "wpSecret" in your cloakwp.config.js file.' });
  }

  setCookies('cloakwp-logged-in', 'true', { req, res, maxAge: 60 * 60 * 48 }); // logged in status expires in 48 hours (the default session length for WordPress)

  // redirect back to WordPress wp-admin "posts" page (opinion: the dashboard page is useless)
  res.writeHead(307, { Location: `${config.wpUrl}${config.wpAdminUrl || 'wp-admin'}/edit.php` }).end()
}