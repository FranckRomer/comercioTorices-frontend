import React, { useState, useEffect } from 'react';

interface AddToFavoritesButtonProps {
  productId: number;
  className?: string;
  children?: React.ReactNode;
}

const FAVORITES_KEY = 'torices_favorites';

export const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({
  productId,
  className = '',
  children
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if product is in favorites
    try {
      const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      setIsFavorite(favorites.includes(productId));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }, [productId]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = favorites.filter((id: number) => id !== productId);
      } else {
        newFavorites = [...favorites, productId];
      }
      
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      
      // Emit event to update counters
      window.dispatchEvent(new CustomEvent('favoritesUpdated'));
      
      // Show notification
      const message = isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos';
      showNotification(message, isFavorite ? 'info' : 'success');
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 transform translate-x-full`;
    
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove('translate-x-full');
    }, 100);

    setTimeout(() => {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`${className} ${isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
      data-add-to-favorites
      data-product-id={productId}
      title={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
    >
      {children || (
        <i className={`fas fa-heart ${isFavorite ? 'text-red-500' : ''}`}></i>
      )}
    </button>
  );
};
