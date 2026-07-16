import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, company, spend, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('No RESEND_API_KEY set — form submission logged only');
    console.log({ name, email, company, spend, message });
    return NextResponse.json({ success: true });
  }

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: 'COYT Website <onboarding@resend.dev>',
    to: 'tom@coyt.com.au',
    replyTo: email,
    subject: `New enquiry from ${name}${company ? ` (${company})` : ''}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      `Monthly ad spend: ${spend || 'Not provided'}`,
      '',
      `Message:`,
      message,
    ].join('\n'),
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
