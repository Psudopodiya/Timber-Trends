// components/TrendingProducts.tsx
import { Button } from '@/components/ui/button';
import {
  ArrowRight04Icon,
  FavouriteIcon,
  ShoppingBasket02Icon,
} from '@/components/ui/icons/icons';
import { gsap } from 'gsap';
import React, { useCallback, useRef, useState } from 'react';

const sections = [
  'Bed room',
  'Living room',
  'Dining room',
  'Outdoor',
  'Indoor',
];

interface ProductProps {
  title: string;
  price: number;
  discount?: number;
  imageSrc: string;
}

const Product: React.FC<ProductProps> = React.memo(
  ({ title, price, discount, imageSrc }) => {
    const [isFavourite, setIsFavourite] = useState(false);

    return (
      <div className="bg-gray-300 flex p-4 rounded-lg flex-col gap-3">
        <div className="flex justify-between w-full">
          {discount && (
            <span className="bg-[#499da3] text-white px-4 py-1 rounded-full">
              {discount}%
            </span>
          )}
          <button onClick={() => setIsFavourite(!isFavourite)}>
            <FavouriteIcon
              className={isFavourite ? 'text-red-500' : 'text-white'}
            />
          </button>
        </div>
        <div
          className="size-52 self-center"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="flex bg-[#2d5356] text-white justify-between p-4 rounded-xl">
          <div className="flex flex-col">
            <span className="text-xl">{title}</span>
            <span>$ {price.toFixed(2)}</span>
          </div>
          <button className="bg-white rounded-full p-3">
            <ShoppingBasket02Icon className="text-yellow-500" />
          </button>
        </div>
      </div>
    );
  }
);

const TrendingProducts: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Bed room');
  const productGridRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = useCallback((section: string) => {
    setActiveSection(section);
    if (productGridRef.current) {
      gsap.fromTo(
        productGridRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }
      );
    }
  }, []);

  // Mock data for products
  const products: ProductProps[] = [
    {
      title: 'Luxurious Sofa',
      price: 235.99,
      discount: 20,
      imageSrc: '/assets/home_page/chair.png',
    },
    {
      title: 'Modern Armchair',
      price: 189.99,
      imageSrc: '/assets/home_page/chair.png',
    },
    {
      title: 'Elegant Coffee Table',
      price: 129.99,
      discount: 15,
      imageSrc: '/assets/home_page/chair.png',
    },
    {
      title: 'Stylish Lamp',
      price: 79.99,
      imageSrc: '/assets/home_page/chair.png',
    },
    {
      title: 'Cozy Rug',
      price: 159.99,
      discount: 10,
      imageSrc: '/assets/home_page/chair.png',
    },
    {
      title: 'Minimalist Bookshelf',
      price: 199.99,
      imageSrc: '/assets/home_page/chair.png',
    },
  ];

  return (
    <div className="w-full bg-white px-4 py-10 text-gray-700 md:px-32 md:py-20 flex flex-col gap-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl">Trending Products For You !</h2>
        <Button className="flex px-6 py-2 rounded-full bg-yellow-600 text-white text-xl gap-2 items-center transition ease-in-out hover:bg-slate-100 hover:text-yellow-600">
          View All Products
          <ArrowRight04Icon className="size-6 text-white hover:text-yellow-600 transition ease-in-out" />
        </Button>
      </div>
      <div className="flex gap-4">
        {sections.map((section) => (
          <button
            key={section}
            className={`border-b-2 pb-2 transition ease-in-out delay-100 ${
              activeSection === section
                ? 'border-yellow-600'
                : 'border-transparent hover:border-yellow-600'
            }`}
            onClick={() => handleSectionClick(section)}
          >
            {section}
          </button>
        ))}
      </div>
      <div
        ref={productGridRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {products.map((product, index) => (
          <Product key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(TrendingProducts);
