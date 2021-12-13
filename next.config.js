module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com", "images.unsplash.com"],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    AUTH_KEY: process.env.AUTH_KEY,
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.AUTH_DOMAIN,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDING_ID: process.env.MESSAGEING_SENDING_ID,
    APP_ID: process.env.APP_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
  },
};
