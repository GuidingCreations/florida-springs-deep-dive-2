const { webpack } = require("next/dist/compiled/webpack/webpack");

module.exports = {
    images: {
        domains: ['res.cloudinary.com'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve = {
            ...config.resolve,
            fallback: {
              net: false,
              dns: false,
              tls: false,
              fs: false,
              request: false,
            },
          };
        }
        return config;
      },
      env: {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET
      }
}