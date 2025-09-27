import React, { useEffect, useState } from 'react';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';

interface CartItemType {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  category: string;
  sku: string;
  options?: {
    color?: string;
    length?: string;
    thickness?: string;
  };
}

interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const CART_KEY = 'torices_cart';

export const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (!isClient) return;

    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isClient]);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!isClient || isLoading) return;

    localStorage.setItem(CART_KEY, JSON.stringify(items));
    // Emit custom event to update cart counters
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }, [items, isLoading, isClient]);

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const handleCheckout = () => {
    // Aquí se implementaría la lógica de checkout
    alert('Funcionalidad de checkout en desarrollo');
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar el carrito?')) {
      clearCart();
    }
  };

  const handleContinueShopping = () => {
    window.location.href = '/productos';
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotals = (): CartTotals => {
    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.16; // 16% IVA
    const shipping = subtotal > 100 ? 0 : 50; // Envío gratis sobre $100
    const total = subtotal + tax + shipping;

    return {
      subtotal,
      tax,
      shipping,
      total
    };
  };

  // Show loading state while hydrating
  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Cargando carrito...</span>
      </div>
    );
  }

  // Debug: Log items to console
  console.log('Cart items:', items);

  if (items.length === 0) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  const totals = getTotals();
  const itemCount = getItemCount();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Shopping Cart Items */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-900">
              <div className="col-span-5">Producto</div>
              <div className="col-span-2 text-center">Precio</div>
              <div className="col-span-2 text-center">Cantidad</div>
              <div className="col-span-2 text-center">Total</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {items.filter(item => item && typeof item.price === 'number' && typeof item.quantity === 'number').map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 flex justify-between">
            <button 
              onClick={handleContinueShopping}
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Continuar Comprando
            </button>
            <button 
              onClick={handleClearCart}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
            >
              <i className="fas fa-trash mr-2"></i>
              Limpiar Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <CartSummary
          totals={totals}
          itemCount={itemCount}
          onCheckout={handleCheckout}
          onClearCart={handleClearCart}
        />
      </div>
    </div>
  );
};