module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com", "images.unsplash.com"],
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    AUTH_KEY: process.env.AUTH_KEY,
  },
};
