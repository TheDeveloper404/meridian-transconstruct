import type { NextConfig } from "next";

// Headere de securitate aplicate pe toate rutele. CSP-ul complet (cu nonce pentru scripturile Next)
// rămâne pentru faza de deploy, împreună cu configurația reverse proxy-ului — vezi BACKLOG.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

// Modul de rulare pe OVHcloud (ex. `output: "standalone"`) se alege la deploy (B-002);
// până atunci se folosește `next start`.
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
