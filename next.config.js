/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'apiv2.mysweetwishes.com',
      'gratisography.com',
      'www.radiustheme.com',
      'image.shutterstock.com',
      'i.ibb.co',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'api.mysweetwishes.com'
    ],
    // unoptimized: true,  
  },

  // // Enable static export
  // output: 'export',

 
};

module.exports = nextConfig;
