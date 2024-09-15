import React, { useState, useCallback, Suspense, lazy } from 'react';
import { Heart, MinusCircle, PlusCircle, ShoppingCart } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import { Contact } from './contact';

const Model = lazy(() => import('./ui/Model')); // Предполагается, что Model теперь в отдельном файле

function Fallback({ error }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-red-500">
      Error loading 3D model: {error.message}
    </div>
  );
}

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('XXL');
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = {
    name: 'Children`s Toy',
    price: '1500',
    description: "This children's toy is a sample product for our startup, where you can see our 3D object. ",
    images: [
      'product1.png',
      '/Liilnes_Toy_Box_4k_3_0915111931.glb'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  };

  const handleQuantityChange = useCallback((change) => {
    setQuantity(prev => Math.max(1, prev + change));
  }, []);

  const handleImageClick = useCallback((index) => {
    setSelectedImageIndex(index);
  }, []);

  return (
    <>
    <h2 className='text-center mt-16'> For example</h2>
    <div className="flex flex-col justify-center  lg:flex-row gap-8 p-6 bg#14293A">
      
      <div className="lg:w-1/3">
        <div className="relative flex justify-start rounded-xl overflow-hidden shadow-lg h-[480px]">
          <ErrorBoundary FallbackComponent={Fallback}>
            {selectedImageIndex === 1 ? (
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading 3D model...</div>}>
                <Canvas camera={{ position: [0, 0, 2] }}>
                  <ambientLight intensity={3} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <Model url={product.images[1]} />
                  <OrbitControls />
                </Canvas>
              </Suspense>
            ) : (
              <img
                src={product.images[selectedImageIndex]}
                alt="3d format"
                className="w-full h-full object-cover"
              />
            )}
          </ErrorBoundary>
        </div>
        <div className="flex gap-4 mt-4 justify-center">
          {product.images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              className={`w-20 h-20 rounded-lg border-2 transition-all overflow-hidden ${
                index === selectedImageIndex ? 'border-red-500 scale-105' : 'border-transparent hover:border-gray-300'
              }`}
            >
              {index === 1 ? (
                <div className="w-full h-full bg-black-200 flex items-center justify-center text-xs">3D View</div>
              ) : (
                <img src={img}  className="w-full h-4/5 object-cover" />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold text-white-800">{product.name}</h1>
        <p className="text-3xl font-semibold text-red-600">{product.price} ₽</p>
        {/* <div>
          <p className="font-semibold text-lg mb-2 text-gray-700">Размер</p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedSize === size
                    ? 'bg-red-500 text-white'
                    : 'bg-white border border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg mb-2 text-gray-700">Праздничная упаковка</p>
          <button
            className={`px-4 py-2 rounded-lg transition-all ${
              isGiftWrapped
                ? 'bg-red-500 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => setIsGiftWrapped(!isGiftWrapped)}
          >
            {isGiftWrapped ? 'Да' : 'Нет'}
          </button>
        </div> */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-lg p-1">
            <button onClick={() => handleQuantityChange(-1)} className="text-gray-500 hover:text-red-500">
              <MinusCircle size={24} />
            </button>
            <span className="w-12 text-center text-xl">{quantity}</span>
            <button onClick={() => handleQuantityChange(1)} className="text-gray-500 hover:text-red-500">
              <PlusCircle size={24} />
            </button>
          </div>
          <button className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart size={24} />
            Купить
          </button>
          <button className="p-3 border rounded-lg hover:bg-gray-100 transition-colors">
            <Heart size={24} className="text-gray-500" />
          </button>
        </div>
        <p className="text-white-700 leading-relaxed">{product.description}</p>
      </div>
    </div>
    <Contact/>
    </>
  );
}

export default ProductDetail;