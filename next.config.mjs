/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images:{
    remotePatterns:[
      {protocol:"https", hostname:"www.dominos.co.in",},
      {protocol:"https",hostname:"images.pexels.com"},
    ],
  }
};

export default nextConfig;
