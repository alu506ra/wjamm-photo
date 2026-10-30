import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, locale } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "jacek@wjamm-photo.pl";

    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Fotografia WJAMM – Jacek Galewicz <noreply@wjamm-photo.pl>",
          to: [toEmail],
          reply_to: email,
          subject: `[Fotografia WJAMM][${locale?.toUpperCase() ?? "PL"}] ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #1a1a1a; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                <h1 style="color: #e63946; margin: 0 0 4px; font-size: 20px;">Fotografia WJAMM – Jacek Galewicz</h1>
                <p style="color: #888; margin: 0; font-size: 13px;">Fotografia WJAMM – Jacek Galewicz | Nowa wiadomość z formularza kontaktowego</p>
              </div>
              <table style="width: 100%; border-collapse: collapse; background: #222; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 20px; color: #888; font-size: 13px; width: 100px; border-bottom: 1px solid #333;">Imię</td>
                  <td style="padding: 12px 20px; color: #fff; font-size: 14px; border-bottom: 1px solid #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; color: #888; font-size: 13px; border-bottom: 1px solid #333;">E-mail</td>
                  <td style="padding: 12px 20px; color: #fff; font-size: 14px; border-bottom: 1px solid #333;"><a href="mailto:${email}" style="color: #e63946;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; color: #888; font-size: 13px; border-bottom: 1px solid #333;">Temat</td>
                  <td style="padding: 12px 20px; color: #fff; font-size: 14px; border-bottom: 1px solid #333;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 20px; color: #888; font-size: 13px; vertical-align: top;">Wiadomość</td>
                  <td style="padding: 12px 20px; color: #fff; font-size: 14px; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>
              <p style="color: #555; font-size: 12px; margin-top: 16px; text-align: center;">Język: ${locale?.toUpperCase() ?? "PL"} — wjamm-photo.pl</p>
            </div>
          `,
        }),
      });

      if (!res.ok) {
        console.error("Resend error:", await res.text());
        return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
      }
    } else {
      // No API key — log to console (dev mode)
      console.log("📧 Contact form submission:", { name, email, subject, message, locale });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
