/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: 'export',
    distDir: 'build',
    basePath: isProd ? '/tile-expert-test-tasks' : '',
    assetPrefix: isProd ? '/tile-expert-test-tasks/' : '',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;