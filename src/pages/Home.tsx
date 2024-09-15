'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowLeft04Icon,
  ArrowRight04Icon,
  CustomerService01Icon,
  DeliveryTruck02Icon,
  ReturnRequestIcon,
  ShoppingBag02Icon,
} from '@/components/ui/icons/icons';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

interface CardProps {
  title: string;
  src: string;
}

const Card: React.FC<CardProps> = ({ title, src }) => (
  <div className="group relative flex-1 cursor-pointer overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:flex-grow-[20]">
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-100"
      style={{ backgroundImage: `url(${src})` }}
    />
    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black to-transparent p-2 text-white opacity-70">
      <h3 className="mb-2 text-lg font-semibold transition-all duration-300 group-hover:mb-4 group-hover:text-5xl">
        {title}
      </h3>
      <p className="text-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        1200+ items
      </p>
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  </div>
);

interface FeatureIconProps {
  Icon: React.ElementType;
  text: string;
}

const FeatureIcon: React.FC<FeatureIconProps> = ({ Icon, text }) => (
  <div className="flex flex-col items-center">
    <div className="relative mb-2 h-16 w-16">
      <div className="absolute inset-0 -translate-x-4 rounded-full bg-gray-300" />
      <div className="absolute inset-0 rounded-full bg-yellow-400" />
      <Icon className="absolute inset-3 flex h-10 w-10 items-center justify-center text-white" />
    </div>
    <span className="text-center">{text}</span>
  </div>
);

const CollectionCard: React.FC<{
  title: string;
  items: string[];
  backgroundImage: string;
  className?: string;
}> = ({ title, items, backgroundImage, className }) => (
  <div
    className={`flex flex-col justify-start gap-5 rounded-lg bg-gray-100 p-10 ${className}`}
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'contain',
      backgroundPosition: 'right',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div className="mb-5 w-fit rounded-full border border-gray-400 bg-gray-200 px-2 py-1">
      NEW COLLECTION
    </div>
    <span className="text-lg">{title}</span>
    {items.map((item, index) => (
      <span key={index} className="text-gray-400">
        {item}
      </span>
    ))}
  </div>
);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const collectionContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;

  useEffect(() => {
    const container = containerRef.current;
    const collectionContainer = collectionContainerRef.current;
    if (!container || !collectionContainer) return;

    const features = container.children;
    const collections = collectionContainer.children;

    const animateElements = (elements: HTMLCollection) => {
      gsap.set(elements, { autoAlpha: 0, y: 50 });

      ScrollTrigger.batch(elements, {
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            overwrite: true,
          }),
        onLeave: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            y: -50,
            stagger: 0.15,
            overwrite: true,
          }),
        onEnterBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.15,
            overwrite: true,
          }),
        onLeaveBack: (batch) =>
          gsap.to(batch, {
            autoAlpha: 0,
            y: 50,
            stagger: 0.15,
            overwrite: true,
          }),
        start: 'top bottom-=100',
        end: 'bottom top+=100',
        scrub: true,
      });
    };

    animateElements(features);
    animateElements(collections);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    updateDots();
  }, [currentIndex]);

  const updateDots = () => {
    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
      if (index >= currentIndex && index < currentIndex + itemsPerPage) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

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

  const cards = [
    { id: 1, title: 'Living Room', src: 'src/assets/living_room.avif' },
    { id: 2, title: 'Bed Room', src: 'src/assets/bed_room.avif' },
    { id: 3, title: 'Waiting Room', src: 'src/assets/waiting_room.avif' },
  ];

  const items = [
    {
      title: 'Chairs',
      description: 'Description for Item 1',
      src: 'src/assets/home_page/featured_categories/chair.png',
    },
    {
      title: 'Wall Clock',
      description: 'Description for Item 2',
      src: 'src/assets/home_page/featured_categories/clock.png',
    },
    {
      title: 'Pillow',
      description: 'Description for Item 3',
      src: 'src/assets/home_page/featured_categories/pillow.png',
    },
    {
      title: 'Desks',
      description: 'Description for Item 4',
      src: 'src/assets/home_page/featured_categories/desk.png',
    },
    {
      title: 'Mirror',
      description: 'Description for Item 5',
      src: 'src/assets/home_page/featured_categories/mirror.png',
    },
    {
      title: 'Rugs',
      description: 'Description for Item 6',
      src: 'src/assets/home_page/featured_categories/rugs.jpg',
    },
    {
      title: 'Wall Decore',
      description: 'Description for Item 7',
      src: 'src/assets/home_page/featured_categories/wall_decore.jpg',
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="px-4 py-10 text-white md:px-32 md:py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div className="flex w-full flex-col gap-10 md:w-3/5">
            <div className="w-fit rounded-full border border-slate-400 px-4 py-1 backdrop-brightness-150">
              FURNITURE DESIGN IDEAS
            </div>
            <h1 className="text-4xl md:text-8xl">
              Modern Interior Design Studio
            </h1>
            <p className="w-full text-lg md:w-3/4">
              Choosing the right furniture for your home online will add
              elegance and functionality to your interior while also being cost
              effective and long lasting.
            </p>
            <div className="flex gap-10">
              <Button className="rounded-full bg-yellow-500 px-4 py-4 text-xl">
                Shop Now →
              </Button>
              <Button className="w-fit rounded-none border-b border-transparent bg-transparent p-0 text-xl shadow-none hover:border-b-white hover:bg-transparent">
                Follow Instagram
              </Button>
            </div>
          </div>
          <div className="flex h-auto w-full gap-4 md:-mr-28 md:w-3/5">
            {cards.map((card) => (
              <Card key={card.id} title={card.title} src={card.src} />
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-10 md:gap-20">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">2500+</span> Unique Styles
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">5000+</span> Happy Customer
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl">300+</span> Certified Outlets
          </div>
        </div>
      </div>

      {/* Collections and Offers */}
      <div className="w-full bg-white px-4 py-10 text-gray-700 md:px-32 md:py-20">
        {/* 4 Features Icons List */}
        <div
          ref={containerRef}
          className="container mx-auto flex flex-wrap justify-around gap-8 text-xl md:text-2xl"
        >
          <FeatureIcon Icon={DeliveryTruck02Icon} text="Fast & Free Shipping" />
          <FeatureIcon Icon={ShoppingBag02Icon} text="Easy to Shop" />
          <FeatureIcon Icon={CustomerService01Icon} text="24/7 Support" />
          <FeatureIcon Icon={ReturnRequestIcon} text="Hassle Free Returns" />
        </div>

        {/* Collections and offers Cards */}
        <div
          className="mt-10 flex flex-col gap-5 md:flex-row"
          ref={collectionContainerRef}
        >
          <div className="flex w-full flex-col gap-5 md:w-3/5">
            <CollectionCard
              title="Accent Chairs"
              items={['Arm chair', 'wheel chair', 'wing chair', 'cafe chair']}
              backgroundImage="src/assets/home_page/chair.png"
            />
            <div className="flex flex-col gap-5 md:flex-row">
              <CollectionCard
                title="Lighting Lamps"
                items={[
                  'Floor Lamps',
                  'Table Lamps',
                  'Study Lamps',
                  'Lighting Lamps',
                ]}
                backgroundImage="src/assets/home_page/lamp.png"
                className="w-full md:w-1/2"
              />
              <div
                className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-4 py-6 text-white md:w-1/2"
                style={{
                  backgroundImage: 'url(src/assets/header_bg.png)',
                  backgroundSize: 'contain',
                }}
              >
                <div className="mb-5 w-fit rounded-full bg-yellow-500 px-2 py-1">
                  GET DISCOUNT
                </div>
                <span className="text-4xl">20% Offer</span>
              </div>
            </div>
          </div>
          <CollectionCard
            title="Accent Chairs"
            items={['Arm chair', 'wheel chair', 'wing chair', 'cafe chair']}
            backgroundImage="src/assets/home_page/chair.png"
            className="w-full md:w-2/5"
          />
        </div>
      </div>

      {/* Featured Categories */}
      <div className="w-full bg-white px-4 py-10 text-gray-700 md:px-32 md:py-20">
        <div className="flex justify-between items-center mb-6">
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
              <h3 className="text-xl font-semibold text-center">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.description}</p>
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

      {/* Trending Products */}
      <div className="w-full bg-white px-4 py-10 text-gray-700 md:px-32 md:py-20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl">Trending Products For You</h2>
          <button className="flex px-6 py-2 rounded-full bg-yellow-600 text-white text-xl gap-2 items-center transition ease-in-out hover:bg-slate-100 hover:text-yellow-600">
            View All Products
            <ArrowRight04Icon className="size-6 text-white hover:text-yellow-600 transition ease-in-out" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
