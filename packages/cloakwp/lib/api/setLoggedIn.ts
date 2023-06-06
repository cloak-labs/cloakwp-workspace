import { setCookies } from 'cookies-next'
import validateAuthRequest from './validateAuthRequest';

export default async function setLoggedIn(req, res) {
  const { error, redirectUrlBase } = validateAuthRequest(req, res)  
  if (error) return error

  setCookies('cloakwp-logged-in', 'true', { req, res, maxAge: 60 * 60 * 48 }); // logged in status expires in 48 hours (the default session length for WordPress)

  // redirect back to WordPress wp-admin "posts" page (opinion: the dashboard page is useless)
  res.writeHead(307, { Location: `${redirectUrlBase}/edit.php` }).end()
}