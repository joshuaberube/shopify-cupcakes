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
    key: 'X-XSS-Protection',
    value: '0'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'Expect-CT',
    value: 'max-age=86400, enforce'
  },
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; base-uri 'self'; img-src 'self' data: https://cdn.shopify.com; frame-ancestors 'none'; frame-source 'none'; ${isProd ? '' : "script-src 'self' 'unsafe-eval'; connect-src 'self'; style-src 'self' 'unsafe-inline';"}`
  },
  {
    key: 'Feature-Policy',
    value: `camera 'none'; microphone 'none'`
  }
]

//when a user logs out, use Clear-Site-Data header (somehow, look more into it)

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
