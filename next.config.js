const isProd = process.env.NODE_ENV === 'production'

const csp = `
  default-src 'none';
  base-uri 'none';
  img-src 'self' data: https://cdn.shopify.com;
  script-src 'self' ${isProd ? '' : "'unsafe-eval'"};
  style-src 'self' ${isProd ? '' : "'unsafe-inline'"};
  ${isProd ? '' : "connect-src 'self';"}
  frame-ancestors 'none';
  frame-source 'none';
  form-action: 'none'
`

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
    value: csp.replace(/\n/gm, '')
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
