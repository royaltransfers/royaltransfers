import { NextRequest, NextResponse } from "next/server";
import { MailDataRequired } from "@sendgrid/mail";
import sendgrid from "@/config/sendgrid-config";

interface EmailRequest {
  email: string;
  name: string;
  message: string;
  html?: string;
}

export async function POST(req: NextRequest) {
  const {
    email: from,
    name,
    message: text,
    html,
  }: EmailRequest = await req.json();

  if (!from || !name || !text) {
    return NextResponse.json(
      { message: "From, name, and text fields are required.", success: false },
      { status: 400 }
    );
  }

  const toEmail = process.env.EMAIL_TO;
  const fromEmail = process.env.EMAIL_FROM;

  if (!toEmail || !fromEmail) {
    return NextResponse.json(
      {
        error: "EMAIL_TO or EMAIL_FROM environment variables are missing.",
        success: false,
      },
      { status: 500 }
    );
  }

  try {
    const emailData: MailDataRequired = {
      to: toEmail,
      from: fromEmail,
      replyTo: {
        email: from,
        name: name,
      },
      subject: `Message from ${name} - Contact Form`,
      text,
      html: html || undefined,
    };
    console.log("email data is ", emailData);
    await sendgrid.send(emailData);

    return NextResponse.json(
      { message: "Email sent successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("SendGrid Error:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { message: "Failed to send email.", success: false },
      { status: 500 }
    );
  }
}
