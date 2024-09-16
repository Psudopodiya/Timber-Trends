'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface CollectionCardProps {
  title: string;
  items: string[];
  backgroundImage: string;
  className?: string;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  items,
  backgroundImage,
  className,
}) => (
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

const CollectionGrid: React.FC = () => {
  const collectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const animateElement = (element: HTMLDivElement, index: number) => {
      const directions = [
        { x: 0, y: -50 }, // from top
        { x: 50, y: 0 }, // from right
        { x: 0, y: 50 }, // from bottom
        { x: -50, y: 0 }, // from left
      ];
      const direction = directions[index % directions.length];

      gsap.set(element, { autoAlpha: 0, ...direction });

      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          gsap.to(element, {
            duration: 0.8,
            autoAlpha: 1,
            x: 0,
            y: 0,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
        onLeave: () => {
          gsap.to(element, {
            duration: 0.8,
            autoAlpha: 0,
            ...direction,
            ease: 'power3.in',
            overwrite: 'auto',
          });
        },
        onEnterBack: () => {
          gsap.to(element, {
            duration: 0.8,
            autoAlpha: 1,
            x: 0,
            y: 0,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        },
        onLeaveBack: () => {
          gsap.to(element, {
            duration: 0.8,
            autoAlpha: 0,
            ...direction,
            ease: 'power3.in',
            overwrite: 'auto',
          });
        },
      });
    };

    collectionRefs.current.forEach((ref, index) => {
      if (ref) {
        animateElement(ref, index);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="flex w-full flex-col gap-5 md:w-3/5">
          <div ref={(el) => (collectionRefs.current[0] = el)}>
            <CollectionCard
              title="Center Table"
              items={[
                'Square Table',
                'Round Table',
                'Wooden Table',
                'Glass Table',
              ]}
              backgroundImage="/assets/home_page/chair.png"
            />
          </div>
          <div className="flex flex-col gap-5 md:flex-row">
            <div
              ref={(el) => (collectionRefs.current[1] = el)}
              className="w-full md:w-1/2"
            >
              <CollectionCard
                title="Lighting Lamps"
                items={[
                  'Floor Lamps',
                  'Table Lamps',
                  'Study Lamps',
                  'Lighting Lamps',
                ]}
                backgroundImage="/assets/home_page/lamp.png"
              />
            </div>
            <div
              ref={(el) => (collectionRefs.current[2] = el)}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-lg px-4 py-6 text-white md:w-1/2"
              style={{
                backgroundImage: 'url(/placeholder.svg?height=200&width=200)',
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
        <div
          ref={(el) => (collectionRefs.current[3] = el)}
          className="w-full md:w-2/5"
        >
          <CollectionCard
            title="Accent Chairs"
            items={['Arm chair', 'wheel chair', 'wing chair', 'cafe chair']}
            backgroundImage="/assets/home_page/chair.png"
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionGrid;
