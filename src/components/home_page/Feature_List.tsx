import {
  CustomerService01Icon,
  DeliveryTruck02Icon,
  ReturnRequestIcon,
  ShoppingBag02Icon,
} from '@/components/ui/icons/icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

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

const FeatureList: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const features = container.children;

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
      } as ScrollTrigger.BatchVars);
    };

    animateElements(features);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <div
      className="container mx-auto flex flex-wrap justify-around gap-8 py-10 text-xl md:text-2xl gsap-container"
      ref={containerRef}
    >
      <FeatureIcon Icon={DeliveryTruck02Icon} text="Fast & Free Shipping" />
      <FeatureIcon Icon={ShoppingBag02Icon} text="Easy to Shop" />
      <FeatureIcon Icon={CustomerService01Icon} text="24/7 Support" />
      <FeatureIcon Icon={ReturnRequestIcon} text="Hassle Free Returns" />
    </div>
  );
};

export default FeatureList;
