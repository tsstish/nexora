/** NeXora 2026 production cutover.
 * Keep the approved city design in its isolated /building-preview source tree.
 * Public URLs resolve to those pages without exposing the staging prefix.
 * Legacy indexed URLs redirect to their new canonical equivalents. */
const nextConfig = {
  async redirects() {
    return [
      { source: "/building-preview", destination: "/", permanent: true },
      { source: "/building-preview/:path*", destination: "/:path*", permanent: true },
      { source: "/ready/monthly", destination: "/pricing#monthly", permanent: true },
      { source: "/ready", destination: "/#collection", permanent: true },
      { source: "/services/:path*", destination: "/pricing#individual", permanent: true },
      { source: "/services", destination: "/pricing", permanent: true },
      { source: "/privacy", destination: "/docs/privacy", permanent: true },
      { source: "/terms", destination: "/docs/terms", permanent: true },
      { source: "/accessibility", destination: "/docs/accessibility", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/building-preview" },
        { source: "/pricing", destination: "/building-preview/pricing" },
        { source: "/contacts", destination: "/building-preview/contacts" },
        { source: "/docs/:slug", destination: "/building-preview/docs/:slug" },
        { source: "/ready/:slug/story", destination: "/building-preview/ready/:slug/story" },
        { source: "/ready/:slug", destination: "/building-preview/ready/:slug" },
        { source: "/atmospheres", destination: "/building-preview/atmospheres" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};
export default nextConfig;
