import React from 'react';
import { AddToCartButton } from './AddToCartButton';
import { AddToFavoritesButton } from './AddToFavoritesButton';

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

interface ProductCardProps {
  product: Product;
  showDescription?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showDescription = false,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow group ${className}`}>
      <div className="relative">
        <div className="w-full h-48 bg-gray-100 rounded mb-4 flex items-center justify-center overflow-hidden">
          <img 
            src={product.images.main} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        {/* Badge */}
        <div className="absolute top-2 left-2">
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Oferta
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <AddToCartButton
            productId={product.id}
            productName={product.name}
            price={product.price}
            originalPrice={product.originalPrice}
            image={product.images.main}
            category={product.category}
            sku={product.sku}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-blue-50 transition-colors"
            title="Agregar al carrito"
          >
            <i className="fas fa-shopping-cart text-gray-600"></i>
          </AddToCartButton>
          
          <AddToFavoritesButton
            productId={product.id}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-blue-50 transition-colors"
          />
          
          <a 
            href={`/producto/${product.id}`}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-blue-50 transition-colors"
            title="Ver detalles"
          >
            <i className="fas fa-search text-gray-600"></i>
          </a>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">SKU-{product.sku}</p>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex text-yellow-400">
            {Array.from({ length: product.rating }).map((_, index) => (
              <i key={index} className="fas fa-star text-xs"></i>
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
          <span className="text-xl font-bold text-blue-900">${product.price}</span>
        </div>
        
        {/* Category */}
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        {/* Description */}
        {showDescription && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="mt-4 space-y-2">
        <a 
          href={`/producto/${product.id}`} 
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group"
        >
          <i className="fas fa-eye"></i>
          <span>Ver detalles</span>
        </a>
        
        <AddToCartButton
          productId={product.id}
          productName={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          image={product.images.main}
          category={product.category}
          sku={product.sku}
          className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Agregar al carrito</span>
        </AddToCartButton>
      </div>
    </div>
  );
};
