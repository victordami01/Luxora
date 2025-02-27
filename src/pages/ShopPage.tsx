import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Star, Heart, X, 
  Scissors, Sparkles, Package, Shirt,
  Filter, ChevronDown, MapPin,
  Shovel,
  LucideShovel,
  LucideFootprints
} from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import ProductPreview from '../components/ProductPreview';
import PriceTierSection from '../components/PriceTierSection';

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
}

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  
}

interface ExtendedProduct extends Product {
  brand: string;
  description: string;
  stockCount?: number;
  colors: Array<{ name: string; hex: string; }>;
}
// Sample Data
const services: Service[] = [
  {
    id: '1',
    name: 'Dr Martens',
    category: 'Oxford',
    price: 29.99,
    rating: 4.8,
    reviews: 128,
    image: 'https://iili.io/3dcL8tj.webp?auto=format&fit=crop&q=80&w=800',
    description: 'Long-lasting, hydrating formula with rich pigmentation'
  },
  {
    id: '2',  
    name: 'Air Force 1',
    category: 'Skincare',
    price: 49.99,
    rating: 4.9,
    reviews: 256,
    image: 'https://iili.io/3dcLjFS.webp?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced formula with hyaluronic acid and vitamins',
  },
  {
    id: '3',
    name: 'Nike Shox',
    category: 'Hair',
    price: 89.99,
    rating: 4.7,
    reviews: 89,
    image: 'https://iili.io/3dl5veV.jpg?auto=format&fit=crop&q=80&w=800',
    description: 'Complete hair care system for all hair types',
  },
  {
    id: '4',
    name: 'Cloud Slides',
    category: 'Skincare',
    price: 49.99,
    rating: 4.9,
    reviews: 256,
    image: 'https://iili.io/3dcLe9e.jpg?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced formula with hyaluronic acid and vitamins',
  },
  {
    id: '5',
    name: 'Obtaom Ballet flats',
    category: 'Skincare',
    price: 49.99,
    rating: 4.9,
    reviews: 256,
    image: 'https://iili.io/3dcLXP2.jpg?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced formula with hyaluronic acid and vitamins',
  },
  {
    id: '6',
    name: 'New Balance Trail',
    category: 'Skincare',
    price: 49.99,
    rating: 4.9,
    reviews: 256,
    image: 'https://iili.io/3dlAsCg.webp?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced formula with hyaluronic acid and vitamins',
  },
];
const beautyProducts: Product[] = [
  {
    id: '1',
    name: 'Luxury Lipstick Collection',
    category: 'Makeup',
    price: 29.99,
    rating: 4.8,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
    description: 'Long-lasting, hydrating formula with rich pigmentation',
    inStock: true
  },
  {
    id: '2',
    name: 'Hydrating Face Serum',
    category: 'Skincare',
    price: 49.99,
    rating: 4.9,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
    description: 'Advanced formula with hyaluronic acid and vitamins',
    inStock: true
  },
  {
    id: '3',
    name: 'Professional Hair Care Set',
    category: 'Hair',
    price: 89.99,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800',
    description: 'Complete hair care system for all hair types',
    inStock: false
  }
];

const fashionItems: Product[] = [
  {
    id: '1',
    name: 'Elegant Summer Dress',
    category: 'Dresses',
    price: 79.99,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Rose'],
    inStock: true
  },
  {
    id: '2',
    name: 'Classic Blazer',
    category: 'Male',
    price: 129.99,
    rating: 4.9,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Grey'],
    inStock: true
  },
  {
    id: '3',
    name: 'Designer Handbag',
    category: 'Accessories',
    price: 199.99,
    rating: 4.7,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    colors: ['Brown', 'Black', 'Tan'],
    inStock: true
  }
];

const priceTierProducts: Record<string, ExtendedProduct[]> = {
  budget: [
    {
      id: 'b1',
      brand: 'EssentialWear',
      name: 'Classic Cotton T-Shirt',
      category: 'Male',
      price: 24.99,
      rating: 4.5,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
      description: 'Premium cotton basic tee with a comfortable fit and excellent durability. Perfect for everyday wear.',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#000080' }
      ],
      inStock: true,
      stockCount: 50
    }
  ],
  midRange: [
    {
      id: 'm1',
      brand: 'Urban Style',
      name: 'Structured Blazer',
      category: 'Male',
      price: 89.99,
      rating: 4.8,
      reviews: 256,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      description: 'Tailored blazer with modern cut and premium fabric. Perfect for both casual and formal occasions.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Navy', hex: '#000080' },
        { name: 'Grey', hex: '#808080' }
      ],
      inStock: true,
      stockCount: 35
    }
  ],
  luxury: [
    {
      id: 'l1',
      brand: 'Luxe Collection',
      name: 'Italian Leather Jacket',
      category: 'Outerwear',
      price: 299.99,
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
      description: 'Premium Italian leather jacket with silk lining. Handcrafted with attention to every detail.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Black', hex: '#000000' },
        { name: 'Brown', hex: '#8B4513' },
        { name: 'Cognac', hex: '#D27D2D' }
      ],
      inStock: true,
      stockCount: 15
    }
  ]
};

const ShopPage = () => {
  const [activeTab, setActiveTab] = useState<'services' | 'products' | 'fashion'>('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ExtendedProduct | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleProductClick = (productId: string) => {
    const product = [...priceTierProducts.budget, ...priceTierProducts.midRange, ...priceTierProducts.luxury]
      .find(p => p.id === productId);
    
    if (product) {
      setSelectedProduct(product);
      setPreviewOpen(true);
    }
  };

  const getPriceCategory = (price: number): 'budget' | 'mid-range' | 'luxury' => {
    if (price <= 50) return 'budget';
    if (price <= 150) return 'mid-range';
    return 'luxury';
  };

  const getCategories = () => {
    switch (activeTab) {
      case 'services':
        return ['Sneakers', 'Flats', 'Slides', 'Stilettos', 'Oxford'];
      case 'products':
        return ['Skincare', 'Makeup', 'Hair', 'Fragrance'];
      case 'fashion':
        return ['Male', 'Female'];
      default:
        return [];
    }
  };

  const addToCart = (item: Product | Service, size?: string, color?: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.selectedSize === size && 
        cartItem.selectedColor === color
      );

      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id &&
          cartItem.selectedSize === size &&
          cartItem.selectedColor === color
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prevCart, { 
        ...item, 
        quantity: 1,
        selectedSize: size,
        selectedColor: color
      }];
    });
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.id === productId && 
        item.selectedSize === size && 
        item.selectedColor === color)
    ));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-video">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm">
                    {service.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{service.provider}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{service.location} ({service.distance} km)</span>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">
                      {service.rating} ({service.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-800">
                      ${service.price}
                    </span>
                    <Link
                      to="/book"
                      className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'products':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {beautyProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFavorite(product.id)
                          ? 'text-rose-500 fill-rose-500'
                          : 'text-gray-600 hover:text-rose-500'
                      }`}
                    />
                  </button>
                  {!product.inStock && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-gray-900/80 text-white text-xs rounded-full">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-semibold text-gray-800">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`px-3 py-1.5 rounded-lg text-sm ${
                        product.inStock
                          ? 'bg-rose-500 text-white hover:bg-rose-600'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      } transition-colors`}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'fashion':
        return (
          <>
            <PriceTierSection
              title="Budget-Friendly Finds ($0-$50)"
              products={priceTierProducts.budget}
              onProductClick={handleProductClick}
            />
            <PriceTierSection
              title="Mid-Range Classics ($51-$150)"
              products={priceTierProducts.midRange}
              onProductClick={handleProductClick}
            />
            <PriceTierSection
              title="Luxury Picks ($151+)"
              products={priceTierProducts.luxury}
              onProductClick={handleProductClick}
            />
            
            {selectedProduct && (
              <ProductPreview
                isOpen={previewOpen}
                onClose={() => setPreviewOpen(false)}
                product={selectedProduct}
                priceCategory={getPriceCategory(selectedProduct.price)}
              />
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8"> 
            <button
                onClick={() => setActiveTab('fashion')}
                className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'fashion'
                    ? 'border-rose-500 text-rose-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Shirt className="w-5 h-5" />
                Fashion Cloths
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-rose-500 text-rose-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                Fashion Products
              </button> 
              <button
                onClick={() => setActiveTab('services')}
                className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'services'
                    ? 'border-rose-500 text-rose-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <LucideFootprints className="w-5 h-5" />
                Footwear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white shadow-sm mt-1">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                !selectedCategory
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {getCategories().map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderTabContent()}
      </div>

      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-20 right-4 z-50 bg-rose-500 text-white p-3 rounded-full shadow-lg hover:bg-rose-600 transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">
                          ${item.price.toFixed(2)} x {item.quantity}
                        </p>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="text-gray-500 hover:text-rose-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-xl">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;