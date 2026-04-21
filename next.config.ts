import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://exam-app.elevate-bootcamp.cloud"),
      // new URL("https://www.elevate-bootcamp.cloud/storage/entities/**"),
      // new URL("http://elevate-bootcamp.cloud/storage/entities/**"),
      // new URL("http://www.elevate-bootcamp.cloud/storage/entities/**"),

      // new URL("https://exam-app.elevate-bootcamp.cloud/storage/entities/**"),
      // new URL("https://www.exam-app.elevate-bootcamp.cloud/storage/entities/**"),
      // new URL("http://exam-app.elevate-bootcamp.cloud/storage/entities/**"),
      // new URL("http://www.exam-app.elevate-bootcamp.cloud/storage/entities/**"),
    ],
  },
};

export default nextConfig;
