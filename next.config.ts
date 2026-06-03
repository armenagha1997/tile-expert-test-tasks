/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'build',
    basePath: '/tile-expert-test-tasks',
    assetPrefix: '/tile-expert-test-tasks/',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;