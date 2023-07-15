export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  app: {
    operationsEmail: 'ahoy@barelyhuman.dev',
  },
  security: {
    jwt: process.env.JWT_SECRET,
    session: process.env.SESSION_SECRET,
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    password: process.env.REDIS_PASSWORD || 'examplepassword',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  email: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Boolean(process.env.SMTP_SECURE) || false,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
  queue: {
    email: {
      name: 'email',
      types: {
        loginEmail: 'email:login',
      },
    },
  },
}
