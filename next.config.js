/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withPlugins([[withBundleAnalyzer]], {
    images: {
        formats: ['image/avif', 'image/webp'],
        domains: [
            'res.cloudinary.com',
            'file.hstatic.net',
            'scontent.fsgn8-2.fna.fbcdn.net',
        ],
    },
})
