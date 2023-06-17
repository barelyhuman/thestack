export const config = {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    password: process.env.REDIS_PASSWORD || 'examplepassword',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  queue: {
    email: {
      name: 'email',
      types: {
        loginEmail: 'email:login',
      },
    },
  },
};
