import { FunctionComponent, useContext } from 'react'
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.styles'
import { Product } from '../../types/product.types'
import CustomButton from '../custom-button/custom-button.component'
import { BsCartPlus } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const { addProductCart } = useContext(CartContext)

  const handleAddToCart = () => {
    addProductCart(product)
  }

  return (
    <ProductContainer>
      <ProductImage imageUrl={product.imageUrl}>
        <CustomButton onClick={handleAddToCart} icon={<BsCartPlus size={18} />}>
          Adicionar ao Carrinho
        </CustomButton>
      </ProductImage>
      <ProductInfo>
        <p>{product.name}</p>
        <p>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(product.price)}
        </p>
      </ProductInfo>
    </ProductContainer>
  )
}

export default ProductItem
