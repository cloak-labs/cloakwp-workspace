import { setCookies } from 'cookies-next'
import validateAuthRequest from './validateAuthRequest';

export default async function setLoggedOut(req, res) {
  const { error, redirectUrlBase } = validateAuthRequest(req, res)
  if (error) return error

  setCookies('cloakwp-logged-in', 'false', { req, res });
  
  // redirect back to wp-admin
  res.writeHead(307, { Location: redirectUrlBase }).end()
}