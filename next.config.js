const isProd = process.env.NODE_ENV === 'production'

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; base-uri 'self'; img-src 'self' https://cdn.shopify.com; ${isProd ? '' : "'unsafe-inline' 'unsafe-eval'; connect-src 'self';"}`
  }
]

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com']
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ]
  }
}
