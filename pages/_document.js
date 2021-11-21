import Document, { Html, Head, Main, NextScript } from 'next/document'
import crypto from 'crypto'
import { v4 } from 'uuid'

const generateCsp = () => {
  const isProd = process.env.NODE_ENV === 'production'

  const hash = crypto.createHash('sha256')
  hash.update(v4())
  const nonce = hash.digest('base64')

  const csp = `default-src 'self'; base-uri 'self'; img-src 'self' data: https://cdn.shopify.com; ${isProd ? '' : "script-src 'self' 'unsafe-eval'; connect-src 'self'; style-src 'self' 'unsafe-inline';"}`

  return { csp, nonce }
}

class MyDocument extends Document {
  render() {
    const { csp, nonce } = generateCsp()

    return (
      <Html lang="en">
        <Head nonce={nonce}>
          <meta property="csp-nonce" content={nonce} />
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript nonce={nonce} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
