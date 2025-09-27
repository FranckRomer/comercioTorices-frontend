import React from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  originalPrice: number;
  description: string;
  category: string;
  images: {
    main: string;
    thumbnails: string[];
  };
  rating: number;
  reviews: number;
  colors?: Array<{ name: string; value: string }>;
  lengths?: string[];
  thicknesses?: string[];
}

interface ProductGridProps {
  products: Product[];
  showDescription?: boolean;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  showDescription = false,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
};
