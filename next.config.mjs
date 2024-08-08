/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/indoor",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
