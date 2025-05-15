import path from 'node:path';

export const sortList = ["asc", "desc"];
export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
  };

  export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

  export const CLOUDINARY = {
    CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
    API_KEY: 'CLOUDINARY_API_KEY',
    API_SECRET: "CLOUDINARY_API_SECRET",
  };

  export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');