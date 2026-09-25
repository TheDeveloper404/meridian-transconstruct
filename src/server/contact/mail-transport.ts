// Portul de transport e-mail folosit de serviciul de contact. Implementarea SMTP este în
// smtp-transport.ts; testele folosesc un transport fals.

export type OutgoingMail = {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
};

export interface MailTransport {
  send(mail: OutgoingMail): Promise<void>;
}
