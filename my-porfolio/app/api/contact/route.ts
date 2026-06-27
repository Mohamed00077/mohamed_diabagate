import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { prenom, nom, email, sujet, message } = await req.json();

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", 
      to: "momodiabagate71@gmail.com",             
      subject: `[Portfolio] ${sujet}`,
      html: `
        <h2>Nouveau message de ${prenom} ${nom}</h2>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${sujet}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}