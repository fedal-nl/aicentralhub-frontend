import { Resend } from 'resend'

const FROM_ADDRESS = 'AI CentralHub <noreply@info.ai-centralhub.com>'
const SITE_URL = 'https://ai-centralhub.com'
const LOGO_URL = `${SITE_URL}/assets/ai-centralhub-logo-dark-version.png`

// Brand colors (kept in sync with the submission decision email templates)
const COLOR_DARK = '#0a111e'
const COLOR_ACCENT = '#207adf'
const COLOR_PAGE_BG = '#f4f5f7'
const COLOR_FOOTER_TEXT = '#d1d5db'
const FONT_STACK = 'Arial, Helvetica, sans-serif'

// Names and emails come from OAuth providers or user input, so escape them
// before inserting into HTML.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildWelcomeEmailHtml(greetingName: string): string {
  const name = escapeHtml(greetingName)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to AI CentralHub</title>
</head>
<body style="margin:0; padding:0; background-color:${COLOR_PAGE_BG};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLOR_PAGE_BG};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:560px; background-color:#ffffff; border-radius:8px;">
          <tr>
            <td align="center" bgcolor="${COLOR_DARK}"
              style="padding:24px; background-color:${COLOR_DARK}; border-radius:8px 8px 0 0; font-family:${FONT_STACK}; font-size:13px; line-height:1.5; color:${COLOR_FOOTER_TEXT};">
              <h1 style="margin:0; font-size:22px; line-height:1.3; color:#ffffff;">Welcome to AI CentralHub</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:32px; font-family:${FONT_STACK}; font-size:16px; line-height:1.6; color:${COLOR_DARK};">

              <p style="margin:0 0 16px;">Hi ${name},</p>

              <p style="margin:0 0 24px;">Thanks for signing up. Your account is all set up and ready to go.</p>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td style="background-color:${COLOR_PAGE_BG}; border-left:3px solid ${COLOR_DARK}; padding:12px 16px; font-family:${FONT_STACK}; font-size:15px; line-height:1.6; color:${COLOR_DARK};">
                    <p style="margin:0 0 8px; font-weight:bold;">Here's what you can do now</p>
                    <p style="margin:0 0 4px;">&bull; Browse and search our full directory of AI tools</p>
                    <p style="margin:0 0 4px;">&bull; Save your favorite tools to your dashboard</p>
                    <p style="margin:0 0 4px;">&bull; Leave reviews and ratings on tools you've used</p>
                    <p style="margin:0;">&bull; <a href="${SITE_URL}/submit-tool" style="color:${COLOR_DARK};">Submit your own AI tool</a> to the directory</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:6px; background-color:${COLOR_ACCENT};">
                    <a href="${SITE_URL}/dashboard"
                      style="display:inline-block; padding:12px 24px; font-family:${FONT_STACK}; font-size:16px; color:#ffffff; text-decoration:none; border-radius:6px;">Go to your dashboard</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;">Thanks,<br>The AI CentralHub team</p>

            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="${COLOR_DARK}"
              style="padding:28px 32px; background-color:${COLOR_DARK}; border-radius:0 0 8px 8px; font-family:${FONT_STACK}; font-size:13px; line-height:1.5; color:${COLOR_FOOTER_TEXT};">
              <a href="${SITE_URL}" style="text-decoration:none;">
                <img src="${LOGO_URL}" alt="AI CentralHub" width="160"
                  style="display:block; width:160px; max-width:160px; height:auto; border:0; margin:0 auto 12px;">
              </a>
              <a href="${SITE_URL}" style="color:${COLOR_FOOTER_TEXT}; text-decoration:none;">ai-centralhub.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function buildWelcomeEmailText(greetingName: string): string {
  return `Hi ${greetingName},

Thanks for signing up. Your account is all set up and ready to go.

Here's what you can do now:
- Browse and search our full directory of AI tools
- Save your favorite tools to your dashboard
- Leave reviews and ratings on tools you've used
- Submit your own AI tool to the directory: ${SITE_URL}/submit-tool

Go to your dashboard: ${SITE_URL}/dashboard

Thanks,
The AI CentralHub team

AI CentralHub
${SITE_URL}`
}

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
  const greetingName = name?.trim() || 'there'

  try {
    // Admin notification
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: contactEmail,
      subject: `New user signup: ${displayName}`,
      html: `
        <h2>New User Signup</h2>
        <p><strong>Name:</strong> ${escapeHtml(displayName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Provider:</strong> ${escapeHtml(provider)}</p>
      `,
    })

    // Welcome email to the new user
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Welcome to AI CentralHub!',
      html: buildWelcomeEmailHtml(greetingName),
      text: buildWelcomeEmailText(greetingName),
    })
  } catch (error) {
    // Never let an email failure break the sign-in flow
    console.error('Failed to send new user emails:', error)
  }
}
