import nodemailer from "nodemailer";
import type { SmtpConfig } from "./config";
import type { MailTransport, OutgoingMail } from "./mail-transport";

// Adaptor SMTP: singurul loc care depinde de Nodemailer.
export function createSmtpTransport(config: SmtpConfig): MailTransport {
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
    // Timeout-uri scurte: vizitatorul așteaptă răspunsul formularului.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  return {
    async send(mail: OutgoingMail) {
      await transporter.sendMail({
        from: mail.from,
        to: mail.to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
      });
    },
  };
}
