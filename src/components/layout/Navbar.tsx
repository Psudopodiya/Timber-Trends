import { CustomAvatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Search01Icon,
  ShoppingBasket02Icon,
} from '@/components/ui/icons/icons';
import { Input } from '@/components/ui/input';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavbarLink: React.FC<{ name: string; link: string }> = ({
  name,
  link,
}) => {
  return (
    <Link to={link} className="group relative">
      <span className="border-b border-transparent transition delay-100 ease-in-out group-hover:border-[#d09524]">
        {name}
      </span>
    </Link>
  );
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node) &&
        searchValue === ''
      ) {
        setIsSearchExpanded(false);
      }
    },
    [searchValue]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
  };

  const expandSearch = () => {
    if (!isSearchExpanded) {
      setIsSearchExpanded(true);
      setTimeout(() => searchRef.current?.querySelector('input')?.focus(), 300);
    }
  };

  return (
    <nav className="mb-20 flex items-center justify-between gap-5 bg-transparent px-32 text-white">
      <div>
        <img src="src/assets/logo_1.png" className="w-24" alt="Logo" />
      </div>
      <div className="flex items-center gap-6">
        <NavbarLink name="Home" link="/" />
        <NavbarLink name="Products" link="/products" />
        <NavbarLink name="Categories" link="/categories" />
        <NavbarLink name="About us" link="/about" />
        <NavbarLink name="Contact us" link="/contact" />
        <NavbarLink name="Blog" link="/blog" />
      </div>

      <div className="relative flex items-center" ref={searchRef}>
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSearchExpanded ? 'w-[200px] md:w-[300px]' : 'w-0'
            }`}
          >
            <Input
              type="search"
              placeholder="Search..."
              className="w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsSearchExpanded(true)}
              aria-label="Search"
            />
          </div>
          <Button
            type="submit"
            variant="link"
            size="icon"
            className="ml-2"
            onClick={expandSearch}
            aria-label="Search"
          >
            <Search01Icon className="h-6 w-6 text-white" />
          </Button>

          <Button
            variant="link"
            size="icon"
            className="ml-2"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBasket02Icon className="h-6 w-6 text-white" />
          </Button>

          <CustomAvatar />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
