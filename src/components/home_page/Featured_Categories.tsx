import { ArrowLeft04Icon, ArrowRight04Icon } from '@/components/ui/icons/icons';
import { gsap } from 'gsap';
import React, { useRef, useState } from 'react';

const items = [
  { title: 'Chairs', src: '/assets/home_page/featured_categories/chair.png' },
  {
    title: 'Wall Clock',
    src: '/assets/home_page/featured_categories/clock.png',
  },
  { title: 'Pillow', src: '/assets/home_page/featured_categories/pillow.png' },
  { title: 'Desks', src: '/assets/home_page/featured_categories/desk.png' },
  { title: 'Mirror', src: '/assets/home_page/featured_categories/mirror.png' },
  { title: 'Rugs', src: '/assets/home_page/featured_categories/rugs.jpg' },
  {
    title: 'Wall Decore',
    src: '/assets/home_page/featured_categories/wall_decore.jpg',
  },
];

const FeaturedCategories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 2;

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const newIndex =
        direction === 'left'
          ? Math.max(0, currentIndex - itemsPerPage)
          : Math.min(items.length - itemsPerPage, currentIndex + itemsPerPage);

      setCurrentIndex(newIndex);

      gsap.to(scrollRef.current, {
        scrollTo: {
          x: (newIndex * scrollRef.current.clientWidth) / itemsPerPage,
        },
        duration: 0.5,
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl">Featured Categories</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleScroll('left')}
            className="px-6 py-2 rounded-full border border-slate-300"
            aria-label="Scroll left"
            disabled={currentIndex === 0}
          >
            <ArrowLeft04Icon className="size-6 text-yellow-600" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="px-6 py-2 rounded-full bg-yellow-600"
            aria-label="Scroll right"
            disabled={currentIndex >= items.length - itemsPerPage}
          >
            <ArrowRight04Icon className="size-6 text-white" />
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex space-x-10 overflow-x-hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col w-1/3 items-center justify-center gap-4"
          >
            <div
              className="w-52 h-52 rounded-full border"
              style={{
                backgroundImage: `url(${item.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            <h3 className="text-xl font-semibold text-center">{item.title}</h3>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center space-x-2">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
              index >= currentIndex && index < currentIndex + itemsPerPage
                ? 'bg-green-800'
                : 'bg-slate-200'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
