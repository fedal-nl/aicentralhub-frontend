import { Resend } from 'resend'

export async function sendNewUserEmails(params: {
  name: string | null | undefined
  email: string | null | undefined
  provider: string
}) {
  const { name, email, provider } = params

  const resendApiKey = process.env.RESEND_API_KEY
  const contactEmail = process.env.CONTACT_EMAIL

  if (!resendApiKey || !contactEmail || !email) {
    console.error(
      'New user email skipped: missing RESEND_API_KEY, CONTACT_EMAIL, or user email',
    )
    return
  }

  const resend = new Resend(resendApiKey)
  const displayName = name || email

  try {
    // Admin notification
    await resend.emails.send({
      from: 'AI CentralHub <noreply@info.ai-centralhub.com>',
      to: contactEmail,
      subject: `New user signup: ${displayName}`,
      html: `
        <h2>New User Signup</h2>
        <p><strong>Name:</strong> ${displayName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Provider:</strong> ${provider}</p>
      `,
    })

    // Welcome email to the new user
    await resend.emails.send({
      from: 'AI CentralHub <noreply@info.ai-centralhub.com>',
      to: email,
      subject: 'Welcome to AI CentralHub!',
      html: `
        <h2>Welcome to AI CentralHub, ${displayName}!</h2>
        <p>Thanks for signing up. Your account is all set up and ready to go.</p>
        <p><strong>Here's what you can do now:</strong></p>
        <ul>
          <li>Browse and search our full directory of AI tools</li>
          <li>Save your favorite tools to your dashboard</li>
          <li>Leave reviews and ratings on tools you've used</li>
          <li><a href="https://ai-centralhub.com/submit-tool">Submit your own AI tool</a> to the directory</li>
        </ul>
        <p><a href="https://ai-centralhub.com/dashboard">Go to your dashboard</a></p>
        <br/>
        <p>The AI CentralHub Team</p>
      `,
    })
  } catch (error) {
    // Never let an email failure break the sign-in flow
    console.error('Failed to send new user emails:', error)
  }
}
