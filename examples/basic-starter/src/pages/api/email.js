export default function handler(req, res) {
  const form = req.body
  if (!form || !form.email || !form.phone)
    return res.status(400).json({ message: 'The form was not filled out properly.', error: 400 })

  const Mailjet = require('node-mailjet')

  const mailjet = new Mailjet.apiConnect(
    process.env.MJ_APIKEY_PUBLIC, // TODO: set these env vars
    process.env.MJ_APIKEY_PRIVATE,
    {
      config: {},
      options: {},
    }
  )

  // TODO: change the email settings below to line up with the project
  const request = mailjet.post('send', { version: 'v3.1' }).request(JSON.stringify({
    Messages: [
      {
        From: {
          Email: "kaelan@stikkymedia.com",
          Name: "Kaelan"
        },
        To: [
          {
            Email: "kaelan@stikkymedia.com",
            Name: "Kaelan"
          },
        ],
        Subject: 'Website Inquiry',
        TextPart: `First name: ${form.first_name},\r\n Last Name: ${form.last_name},\r\n Email: ${form.email},\r\n Company: ${form.company},\r\n Phone: ${form.phone},\r\n Location: ${form.location},\r\n Message: ${form.message},\r\n Heard about via: ${form.hear_about}\r\n`,
        HTMLPart: `
            <span>First name: ${form.first_name}</span><br>
            <span>Last Name: ${form.last_name}</span><br>
            <span>Email: ${form.email}</span><br>
            <span>Company: ${form.company}</span><br>
            <span>Phone: ${form.phone}</span><br>
            <span>Location: ${form.location}</span><br>
            <span>Message: ${form.message}</span><br>
            <span>Heard about via: ${form.hear_about}</span><br>
          `,
      },
    ],
  }))

  request
    .then((result) => {
      console.log(result.body)
      return res.status(200).json(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
      return res.status(500).json(err.statusCode)
    })
}