import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router and Turbopack-safe
  pageExtensions: ["js", "jsx", "ts", "tsx"],

  // Image optimization for SEO and Core Web Vitals
  images: {
    qualities: [75, 85, 90, 100],
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optimize image loading
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for immutable images
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react-icons"],
  },

  // Enable static optimization for better SEO
  output: "standalone",

  // Compress responses for faster delivery
  compress: true,

  productionBrowserSourceMaps: false,

  // Headers for SEO and security
  async headers() {
    return [
      {
        // Build assets are crawlable (see app/robots.ts) so that Googlebot can
        // fetch them and observe this noindex. That is the only mechanism that
        // removes the /_next/static/media/*.avif and *.woff2 URLs which were
        // already indexed; a robots.txt Disallow would strand them there.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noimageindex, nofollow",
          },
        ],
      },
      {
        // Same treatment for anything served straight out of /public that is an
        // asset rather than a page.
        source: "/:path*.(avif|webp|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|otf|mp4|webm)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noimageindex",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(self), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self';script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;style-src 'self' 'unsafe-inline';img-src 'self' data: https:;font-src 'self' data:;connect-src 'self' https:;frame-src https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self';form-action 'self';frame-ancestors 'none';upgrade-insecure-requests;`,
          },
        ],
      },
    ];
  },

  // Redirects for SEO (consolidate trailing slashes)
  async redirects() {
    return [
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default bundleAnalyzer(nextConfig);
