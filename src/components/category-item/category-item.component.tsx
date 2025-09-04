import { Category } from '../../types/category.types'
import './category-item.styles.css'

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div
      className="category-item-container"
      style={{ backgroundImage: `url(${category.imageUrl})` }}>
      <div className="category-name">
        <p>{category.displayName}</p>
        <p>Explorar</p>
      </div>
    </div>
  )
}

export default CategoryItem
