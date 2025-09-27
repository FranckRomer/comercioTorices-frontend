import React from 'react';

interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

interface CartSummaryProps {
  totals: CartTotals;
  itemCount: number;
  onCheckout: () => void;
  onClearCart: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
  totals,
  itemCount,
  onCheckout,
  onClearCart
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Resumen del Pedido
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Productos ({itemCount})</span>
          <span>${totals.subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>IVA (16%)</span>
          <span>${totals.tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>Envío</span>
          <span>
            {totals.shipping === 0 ? (
              <span className="text-green-600 font-medium">Gratis</span>
            ) : (
              `$${totals.shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        {totals.shipping > 0 && (
          <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
            <i className="fas fa-info-circle mr-1"></i>
            Envío gratis en compras superiores a $100
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-blue-900">${totals.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mt-4">
          <i className="fas fa-check-circle text-green-500 mr-2"></i>
          <span>Envío e impuestos calculados al finalizar la compra</span>
        </div>

        <div className="space-y-3 mt-6">
          <button 
            onClick={onCheckout}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            disabled={itemCount === 0}
          >
            <i className="fas fa-credit-card mr-2"></i>
            Proceder al Pago
          </button>
          
          <button 
            onClick={onClearCart}
            className="w-full border border-red-300 text-red-600 py-2 px-6 rounded-lg hover:bg-red-50 transition-colors font-medium"
            disabled={itemCount === 0}
          >
            <i className="fas fa-trash mr-2"></i>
            Limpiar Carrito
          </button>
        </div>
      </div>
    </div>
  );
};
