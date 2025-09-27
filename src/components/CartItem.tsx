import React from 'react';

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

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove
}) => {
  // Validar que el item tenga la estructura correcta
  if (!item || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
    console.error('CartItem: Invalid item structure', item);
    return null;
  }

  const handleQuantityChange = (newQuantity: number) => {
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const itemTotal = (item.price || 0) * (item.quantity || 0);

  return (
    <div className="p-6 border-b border-gray-200 last:border-b-0">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Product Image and Info */}
        <div className="col-span-5 flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <button 
              onClick={handleRemove}
              className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600 transition-colors"
              title="Eliminar producto"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">SKU: {item.sku}</p>
            <div className="text-sm text-gray-600 space-y-1">
              {item.options?.color && (
                <p>Color: {item.options.color}</p>
              )}
              {item.options?.length && (
                <p>Largo: {item.options.length}</p>
              )}
              {item.options?.thickness && (
                <p>Espesor: {item.options.thickness}</p>
              )}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-2 text-center">
          <div className="space-y-1">
            {item.originalPrice && item.originalPrice > item.price && (
              <span className="text-sm text-gray-500 line-through block">
                ${(item.originalPrice || 0).toFixed(2)}
              </span>
            )}
            <span className="text-lg font-semibold text-gray-900">
              ${(item.price || 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Quantity */}
        <div className="col-span-2 flex justify-center">
          <div className="flex items-center border border-gray-300 rounded">
            <button 
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
              disabled={item.quantity <= 1}
            >
              <i className="fas fa-minus text-gray-600"></i>
            </button>
            <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
              {item.quantity}
            </span>
            <button 
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="px-3 py-1 hover:bg-gray-100 transition-colors"
            >
              <i className="fas fa-plus text-gray-600"></i>
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="col-span-2 text-center">
          <span className="text-lg font-bold text-blue-900">
            ${(itemTotal || 0).toFixed(2)}
          </span>
        </div>

        {/* Remove Button */}
        <div className="col-span-1 text-center">
          <button 
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Eliminar del carrito"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
