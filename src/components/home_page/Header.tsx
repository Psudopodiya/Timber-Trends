import { Button } from '@/components/ui/button';
import React from 'react';

interface CardProps {
  title: string;
  src: string;
}

const Card: React.FC<CardProps> = React.memo(({ title, src }) => (
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
));

const cards = [
  {
    id: 1,
    title: 'Living Room',
    src: '/assets/home_page/header_sections/living_room.avif',
  },
  {
    id: 2,
    title: 'Bed Room',
    src: '/assets/home_page/header_sections/bed_room.avif',
  },
  {
    id: 3,
    title: 'Waiting Room',
    src: '/assets/home_page/header_sections/waiting_room.avif',
  },
];

const CardGallery: React.FC = () => (
  <div className="flex h-auto w-full gap-4 md:-mr-28 md:w-3/5">
    {cards.map((card) => (
      <Card key={card.id} title={card.title} src={card.src} />
    ))}
  </div>
);

const StatItem: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-2xl">{value}</span> {label}
  </div>
);

const Stats: React.FC = () => (
  <div className="mt-10 flex flex-wrap justify-center gap-10 md:gap-20">
    <StatItem value="2500+" label="Unique Styles" />
    <StatItem value="5000+" label="Happy Customer" />
    <StatItem value="300+" label="Certified Outlets" />
  </div>
);

const Header: React.FC = () => (
  <header className="px-4 py-10 text-white md:px-32 md:py-20">
    <div className="flex flex-col justify-between gap-5 md:flex-row">
      <div className="flex w-full flex-col gap-10 md:w-3/5">
        <span className="w-fit rounded-full border border-slate-400 px-4 py-1 backdrop-brightness-150">
          FURNITURE DESIGN IDEAS
        </span>
        <h1 className="text-4xl md:text-8xl">Modern Interior Design Studio</h1>
        <p className="w-full text-lg md:w-3/4">
          Choosing the right furniture for your home online will add elegance
          and functionality to your interior while also being cost effective and
          long lasting.
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
      <CardGallery />
    </div>
    <Stats />
  </header>
);

export default Header;
