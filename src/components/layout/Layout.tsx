import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  console.log(childrenArray.length);
  return (
    <div className="font-suse">
      <div
        className="py-20"
        style={{
          backgroundImage: 'url(/assets/header_bg.png)',
          backgroundSize: '40%',
        }}
      >
        <Navbar />
        <main className="content">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
