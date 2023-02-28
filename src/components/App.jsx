import { useState } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Application } from './App.styled';

const App = () => {
  const [searchInput, setsearchInput] = useState('');

  const searchInputHandler = input => {
    setsearchInput(input);
  };

  return (
    <Application>
      <SearchBar onSubmit={searchInputHandler} />
      <ImageGallery toSearch={searchInput} />
    </Application>
  );
};

export { App };
