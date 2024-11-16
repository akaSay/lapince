import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import * as path from 'path';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private logoBase64: string;

  constructor() {
    try {
      const logoPath = path.resolve(__dirname, '..', 'assets', 'logo.svg');
      this.logger.log(`Tentative de lecture du logo à partir de : ${logoPath}`);

      const logoFile = fs.readFileSync(logoPath);
      this.logoBase64 = `data:image/svg+xml;base64,${logoFile.toString('base64')}`;
      this.logger.log(
        `Logo chargé avec succès. Taille: ${this.logoBase64.length} caractères`,
      );
    } catch (error) {
      this.logger.error('Erreur lors du chargement du logo:', error);
      this.logoBase64 = ''; // Fallback à une chaîne vide si le logo n'est pas trouvé
    }
  }

  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendPasswordResetEmail(to: string, resetLink: string) {
    const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Réinitialisation de votre mot de passe</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #f3f4f6; background-color: #111827; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1f2937; padding: 20px; border-radius: 8px;">
        <tr>
          <td align="center">
            <img src="${this.logoBase64}" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
            <h1 style="color: #f3f4f6; margin-bottom: 20px;">Réinitialisation de votre mot de passe</h1>
            <p style="font-size: 16px; margin-bottom: 20px;">Bonjour,</p>
            <p style="font-size: 16px; margin-bottom: 20px;">Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.</p>
            <p style="font-size: 16px; margin-bottom: 20px;">Pour réinitialiser votre mot de passe, veuillez cliquer sur le bouton ci-dessous :</p>
            <p style="text-align: center; margin-bottom: 30px;">
              <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px; hover: background-color: #4338ca;">Réinitialiser mon mot de passe</a>
            </p>
            <p style="font-size: 14px; margin-bottom: 20px;">Si le bouton ne fonctionne pas, vous pouvez copier et coller le lien suivant dans votre navigateur :</p>
            <p style="font-size: 14px; word-break: break-all; background-color: #374151; padding: 10px; border-radius: 4px; margin-bottom: 20px;">${resetLink}</p>
            <p style="font-size: 16px; margin-bottom: 20px;">Ce lien expirera dans 1 heure pour des raisons de sécurité.</p>
            <p style="font-size: 16px; margin-bottom: 20px;">Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <p style="font-size: 16px;">Cordialement,<br>L'équipe de support</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    try {
      await this.transporter.sendMail({
        from: `"Support Gestion" <${process.env.SMTP_USER}>`,
        to,
        subject: 'Réinitialisation de votre mot de passe',
        text: `Vous avez demandé une réinitialisation de mot de passe. Voici votre lien : ${resetLink}`,
        html: html,
      });
      this.logger.log(`Email de réinitialisation envoyé à ${to}`);
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi de l'email à ${to}:`, error);
      throw error;
    }
  }
}
