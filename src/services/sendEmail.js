import nodemailer from 'nodemailer';
import { getEnvVar } from '../utils/getEnvVar.js';
import createHttpError from 'http-errors';

export const sendEmail = async ({ from, to, subject, html }) => {
    const transporter = nodemailer.createTransport({
      host: getEnvVar('SMTP_HOST'),
      port: parseInt(getEnvVar('SMTP_PORT')),
      secure: false, 
      auth: {
        user: getEnvVar('SMTP_USER'),
        pass: getEnvVar('SMTP_PASSWORD'),
      },
    });
  
    try {
      await transporter.sendMail({
        from, 
        to,   
        subject,
        html,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw createHttpError(500, 'Failed to send the email, please try again later.');
    }
  };