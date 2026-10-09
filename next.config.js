/** @type {import('next').NextConfig} */
const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  // output: "export", // Comment this line when not building the project
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath: "",
  assetPrefix: "",
  images: {
    loader: "imgix",
    path: "/",
  },
  transpilePackages: ["leaflet", "filepond", "apexcharts"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
};

module.exports = nextConfig;
