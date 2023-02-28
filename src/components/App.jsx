import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchInput: '',
  };

  searchInputHandler = input => {
    this.setState({ searchInput: input });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchInputHandler} />
        <ImageGallery toSearch={this.state.searchInput} />
      </>
    );
  }
}

export { App };
