import React, { useEffect, useState } from 'react';

export const CartCounter: React.FC = () => {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    // Load cart count from localStorage on client side
    const loadCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('torices_cart') || '[]');
        const count = cart.reduce((total: number, item: any) => total + (item.quantity || 0), 0);
        setItemCount(count);
      } catch (error) {
        console.error('Error loading cart count:', error);
        setItemCount(0);
      }
    };

    // Load initial count
    loadCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  return (
    <a href="/carrito" className="hover:text-blue-200 transition-colors relative">
      <i className="fas fa-shopping-cart"></i>
      {itemCount > 0 && (
        <span className="cart-counter absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </a>
  );
};
