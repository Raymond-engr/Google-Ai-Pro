import React from 'react';
import { Google, GoogleImages } from './GoogleLogos';
import Search from './Search';

interface HeaderProps {
  removeChange: boolean;
}

const Header: React.FC<HeaderProps> = ({ removeChange }) => {
  return (
    <header className="text-black dark:text-white pb-0 pt-14">
      <div className="container mx-auto flex justify-center items-center">
        {removeChange ? <Google /> : <GoogleImages />}
      </div>
      <Search removeChange={removeChange} />
    </header>
  );
};

export default Header;