import Image from 'next/image'
import Link from 'next/link'

const Product = ({product: {images, title, description, handle}}) => {
  return (
    <li>
      <Link href={`/products/${handle}`} passHref>
        <a>
          <Image src={images[0].src} alt={title} width="200px" height="200px" />
          <h2>{title}</h2>
          <p>{description}</p>
        </a>
      </Link>
    </li>
  )
}

export default Product