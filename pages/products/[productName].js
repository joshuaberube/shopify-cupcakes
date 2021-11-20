import { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { client } from '../../shopifyClient'

export const getStaticProps = async context => {
  const { productName } = context.params
  const product = await client.product.fetchByHandle(productName)

  return {
    props: {
      product: JSON.parse(JSON.stringify(product))
    }
  }
}

export const getStaticPaths = async () => {
  const products = await client.product.fetchAll()
  const fixedProducts = JSON.parse(JSON.stringify(products))

  const pathsWithParams = fixedProducts.map(({handle}) => ({ params: { productName: handle } }))

  return {
    paths: pathsWithParams,
    fallback: false
  }
}

const ProductPage = ({product: {images, title, description, options, variants}}) => {
  const [productPrice, setPrice] = useState(variants[0].price)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Image src={images[0].src} alt={title} width="300px" height="300px" />
        <h2>{title}</h2>
        <p>{description}</p>
        <p>${productPrice}</p>
        <fieldset className="w-screen">
          <legend className="mb-2">{options[0].name}</legend>
          {variants.map(({id, title, price}) => (
            <label key={id} className="m-2">
              <input
                className="hidden peer"
                type="radio"
                name={options[0].name}
                value={price}
                onChange={setPrice.bind(null, price)}
                checked={productPrice === price}
              />
              <span className="inline-block w-12 text-center bg-gray-200 rounded-full peer-checked:bg-gray-400">{title}</span>
            </label>
          ))}
        </fieldset>
      </main>
    </>
  )
}

export default ProductPage