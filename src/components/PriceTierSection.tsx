import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PriceTierProps {
  title: string;
  products: Array<{
    id: string;
    brand: string;
    name: string;
    price: number;
    image: string;
  }>;
  onProductClick: (productId: string) => void;
}

const PriceTierSection: React.FC<PriceTierProps> = ({
  title,
  products,
  onProductClick
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <button
            key={product.id}
            onClick={() => onProductClick(product.id)}
            className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-500">{product.brand}</p>
              <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
              <p className="text-rose-500 font-semibold mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceTierSection;