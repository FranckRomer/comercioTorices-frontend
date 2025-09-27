import React from 'react';

interface EmptyCartProps {
  onContinueShopping: () => void;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  return (
    <div className="text-center py-16">
      <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="fas fa-shopping-cart text-gray-400 text-4xl"></i>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Tu carrito está vacío
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Parece que no has agregado ningún producto a tu carrito todavía. 
        ¡Explora nuestros productos y encuentra lo que necesitas!
      </p>
      
      <div className="space-y-4">
        <button 
          onClick={onContinueShopping}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          <i className="fas fa-shopping-bag mr-2"></i>
          Continuar Comprando
        </button>
        
        <div className="flex justify-center space-x-4 text-sm">
          <a 
            href="/productos" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver Productos
          </a>
          <span className="text-gray-300">|</span>
          <a 
            href="/tienda" 
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Ir a la Tienda
          </a>
        </div>
      </div>
    </div>
  );
};
