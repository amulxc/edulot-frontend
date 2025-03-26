/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "sig.figma.com",
      "s3-alpha-sig.figma.com", // Ensure the correct Figma image domain
      "cdn.dribbble.com",
      "skyaitechnologies.com",
      "static.vecteezy.com",
      "ouch-cdn2.icons8.com",
      "png.pngtree.com",
      "cdni.iconscout.com",
      "www.pngmart.com",
      "www.goodfreephotos.com",
      "cdn-icons-png.flaticon.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;
