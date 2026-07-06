import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      url,
      category,
      subcategory,
      shortDescription,
      longDescription,
      pricing,
      appType,
      logoUrl,
      metaDescription,
      submitterEmail,
      submitterName,
    } = body

    if (
      !name ||
      !url ||
      !category ||
      !subcategory ||
      !shortDescription ||
      !longDescription ||
      !pricing ||
      !appType ||
      !metaDescription
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      )
    }

    await resend.emails.send({
      from: 'AI CentralHub <noreply@info.ai-centralhub.com>',
      to: process.env.CONTACT_EMAIL!,
      subject: `New Tool Submission: ${name}`,
      html: `
        <h2>New Tool Submission</h2>
        <p><strong>Submitted by:</strong> ${submitterName} (${submitterEmail})</p>
        <hr/>
        <p><strong>Tool Name:</strong> ${name}</p>
        <p><strong>URL:</strong> <a href="${url}">${url}</a></p>
        <p><strong>Category:</strong> ${category} → ${subcategory}</p>
        <p><strong>Pricing:</strong> ${pricing}</p>
        <p><strong>App Type:</strong> ${appType}</p>
        ${logoUrl ? `<p><strong>Logo URL:</strong> ${logoUrl}</p>` : ''}
        <hr/>
        <p><strong>Short Description:</strong><br/>${shortDescription}</p>
        <p><strong>Full Description:</strong><br/>${longDescription}</p>
        <p><strong>Meta Description:</strong><br/>${metaDescription}</p>
        <hr/>
        <p><em>Review and approve in Django admin by setting is_active = true</em></p>
      `,
    })

    // Confirmation to submitter
    await resend.emails.send({
      from: 'AI CentralHub <noreply@info.ai-centralhub.com>',
      to: submitterEmail,
      subject: `We received your submission: ${name}`,
      html: `
        <h2>Thanks for submitting ${name}!</h2>
        <p>Hi ${submitterName},</p>
        <p>We've received your tool submission and our team will review it within 3-5 business days. We'll be in touch at this email address once it's been reviewed.</p>
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>Our team reviews your submission for quality and accuracy</li>
          <li>If approved, your tool will appear in the AI CentralHub directory</li>
          <li>We'll notify you by email either way</li>
        </ul>
        <p>In the meantime, <a href="https://ai-centralhub.com">browse our directory</a> to discover more AI tools.</p>
        <br/>
        <p>The AI CentralHub Team</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit tool error:', error)
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 })
  }
}
