import { Product } from 'shared/type/product/product.ts';
import { ProductCard } from '../product-card/product-card.tsx';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: Readonly<ProductListProps>) {
  const productCards = products.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ));

  return (
    <div className="catalog-cards">
      <ul className="catalog-cards__list">
        {productCards}
      </ul>
    </div>
  );
}
