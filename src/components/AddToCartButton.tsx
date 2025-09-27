import React from 'react';
import { useCart } from '../hooks/useCart';

interface AddToCartButtonProps {
    productId: number;
    productName: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    sku: string;
    options?: {
        color?: string;
        length?: string;
        thickness?: string;
    };
    className?: string;
    children?: React.ReactNode;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
    productId,
    productName,
    price,
    originalPrice,
    image,
    category,
    sku,
    options,
    className = '',
    children
}) => {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();

        addItem({
            id: productId,
            name: productName,
            price,
            originalPrice,
            image,
            category,
            sku,
            options
        });
    };

    return (
        <button
            onClick={handleAddToCart}
            className={className}
            data-add-to-cart
            data-product-id={productId}
        >
            {children || (
                <>
                    <i className="fas fa-shopping-cart"></i>
                    <span>Agregar al carrito</span>
                </>
            )}
        </button>
    );
};
