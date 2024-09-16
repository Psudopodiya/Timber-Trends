import {
  CollectionGrid,
  FeatureList,
  FeaturedCategories,
  Header,
  TrendingProducts,
} from '@/components/home_page';
import React from 'react';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-700">
        <FeatureList />
        <CollectionGrid />
        <FeaturedCategories />
        <TrendingProducts />
      </main>
    </>
  );
};

export default React.memo(Home);
