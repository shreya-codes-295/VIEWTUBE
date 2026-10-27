/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ViewTube renders images with plain <img> elements (local files in /public/images, plus
  // Pexels photos when PEXELS_API_KEY is set), so this list is not required today. It is kept
  // so that switching any component to next/image later works with the Pexels host.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
