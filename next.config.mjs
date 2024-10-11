/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/web",
        permanent: true, // Sử dụng true nếu bạn muốn chuyển hướng vĩnh viễn (301) hoặc false cho chuyển hướng tạm thời (302)
      },
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true, // Sử dụng true nếu bạn muốn chuyển hướng vĩnh viễn (301) hoặc false cho chuyển hướng tạm thời (302)
      },
    ];
  },
};

export default nextConfig;
