import { useState } from 'react'
import Image from 'next/image'
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
    <div>
      <Image src={images[0].src} alt={title} width="300px" height="300px" />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${productPrice}</p>
      <fieldset>
        <legend>{options[0].name}</legend>
        {variants.map(({id, title, price}) => (
          <label key={id}>
            {title}
            <input 
              type="radio" 
              name={options[0].name} 
              value={price} 
              onChange={setPrice.bind(null, price)} 
              checked={productPrice === price}
            />
          </label>
        ))}
      </fieldset>
    </div>
  )
}

export default ProductPage