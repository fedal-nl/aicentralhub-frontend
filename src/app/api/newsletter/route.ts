import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // For now: notify yourself of new subscribers
    // TODO: replace with Resend Audiences / Beehiiv API when newsletter is ready
    await resend.emails.send({
      from: 'AI CentralHub <noreply@info.ai-centralhub.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New newsletter subscriber: ${email}`,
      html: `<p>New subscriber: <strong>${email}</strong></p>`,
    })

    // Send confirmation to subscriber
    await resend.emails.send({
      from: 'AI CentralHub <noreply@info.ai-centralhub.com>',
      to: email,
      subject: "You're subscribed to AI CentralHub!",
      html: `
        <h2>Welcome to AI CentralHub!</h2>
        <p>Thanks for subscribing. You'll receive the best new AI tools in your inbox every week.</p>
        <p>In the meantime, <a href="https://ai-centralhub.com">browse our directory</a> to discover 7,400+ AI tools.</p>
        <br/>
        <p style="color: #666; font-size: 12px;">You can unsubscribe at any time by replying to this email.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
