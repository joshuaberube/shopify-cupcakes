import Head from 'next/head'
import 'tailwindcss/tailwind.css'

const MyApp = ({ Component, pageProps}) => (
  <>
    <Head>
      <title>Our Cupcakes</title>
      <meta name="description" content="Best cupcakes in the world" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </>
)

export default MyApp
