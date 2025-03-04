import React from 'react';
import { X, Star, Truck, ArrowRight, Ruler } from 'lucide-react';

interface ColorSwatch {
  name: string;
  hex: string;
}

interface ProductPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    brand: string;
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    sizes: string[];
    colors: ColorSwatch[];
    inStock: boolean;
    stockCount?: number;
  };
  priceCategory: 'budget' | 'mid-range' | 'luxury';
}

const ProductPreview: React.FC<ProductPreviewProps> = ({
  isOpen,
  onClose,
  product,
  priceCategory
}) => {
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [selectedColor, setSelectedColor] = React.useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = React.useState(false);

  if (!isOpen) return null;

  const isFreeShipping = product.price >= 50;
  const categoryLabel = {
    budget: 'Budget-Friendly Finds',
    'mid-range': 'Mid-Range Classics',
    luxury: 'Luxury Picks'
  }[priceCategory];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none min-h-[300px] max-h-[500px]"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-rose-500 text-white text-sm rounded-full">
              {categoryLabel}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 pr-8 lg:p-8">
            <div className="mb-4">
              <h3 className="text-sm text-gray-500 font-medium">{product.brand}</h3>
              <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{renderStars(product.rating)}</div>
                <span className="text-sm text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
              {isFreeShipping && (
                <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                  <Truck className="w-4 h-4" />
                  <span>Free Shipping</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 mb-6 max-w-prose">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">Size</label>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="text-sm text-rose-500 flex items-center gap-1 hover:text-rose-600"
                >
                  <Ruler className="w-4 h-4" />
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'bg-rose-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group relative rounded-full p-1.5 ${
                      selectedColor === color.name ? 'ring-2 ring-rose-500' : ''
                    }`}
                    aria-label={`Select ${color.name} color`}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <p className="text-green-600 text-sm">
                  In Stock
                  {product.stockCount && ` (${product.stockCount} available)`}
                </p>
              ) : (
                <p className="text-red-500 text-sm">Out of Stock</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                disabled={!product.inStock || !selectedSize || !selectedColor}
                className="flex-1 bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors disabled:bg-gray-200 disabled:text-gray-500"
              >
                Add to Cart
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Save for Later
              </button>
            </div>
          </div>
        </div>

        {/* Size Guide Modal */}
        {showSizeGuide && (
          <div className="absolute inset-0 bg-white rounded-xl p-6 overflow-auto z-20">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-xl font-bold mb-6">Size Guide</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Size</th>
                    <th className="py-3 px-4 text-left">Bust</th>
                    <th className="py-3 px-4 text-left">Waist</th>
                    <th className="py-3 px-4 text-left">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">XS</td>
                    <td className="py-3 px-4">31-32"</td>
                    <td className="py-3 px-4">24-25"</td>
                    <td className="py-3 px-4">34-35"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">S</td>
                    <td className="py-3 px-4">33-34"</td>
                    <td className="py-3 px-4">26-27"</td>
                    <td className="py-3 px-4">36-37"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">M</td>
                    <td className="py-3 px-4">35-36"</td>
                    <td className="py-3 px-4">28-29"</td>
                    <td className="py-3 px-4">38-39"</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">L</td>
                    <td className="py-3 px-4">37-38"</td>
                    <td className="py-3 px-4">30-31"</td>
                    <td className="py-3 px-4">40-41"</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">XL</td>
                    <td className="py-3 px-4">39-40"</td>
                    <td className="py-3 px-4">32-33"</td>
                    <td className="py-3 px-4">42-43"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPreview; 