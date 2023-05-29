import { regenerateStaticPage } from 'cloakwp'

const handler = async (req, res) => regenerateStaticPage(req, res)
export default handler