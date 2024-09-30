/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'api.mysweetwishes.com',
      'gratisography.com',
      'image.shutterstock.com',
      'i.ibb.co',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
    ],
   unoptimized: true,  
  },

  // // Enable static export
   output: 'export',

 
};

module.exports = nextConfig;
