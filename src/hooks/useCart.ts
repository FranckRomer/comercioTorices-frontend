import { useState, useEffect } from 'react';

export interface CartItem {
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

export interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const CART_KEY = 'torices_cart';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
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
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      // Emit custom event to update cart counters
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
  }, [items, isLoading]);

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeItem = (productId: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

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

  const clearCart = () => {
    setItems([]);
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

  return {
    items,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemCount,
    getTotals
  };
};
