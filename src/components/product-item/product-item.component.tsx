import { FunctionComponent } from 'react'
import {
  ProductContainer,
  ProductImage,
  ProductInfo
} from './product-item.styles'
import { Product } from '../../types/product.types'
import CustomButton from '../custom-button/custom-button.component'
import { BsCartPlus } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { addProductToCart } from '../../store/reducers/cart/cart.actions'

interface ProductItemProps {
  product: Product
}

const ProductItem: FunctionComponent<ProductItemProps> = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addProductToCart(product))
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
