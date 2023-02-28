import { Component } from 'react';

import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { ImageGalleryList } from './ImageGallery.styled';

import errorImg from '../../images/errorImg.jpg';
import ImageAPI from 'components/API_KEY';

class ImageGallery extends Component {
  state = {
    error: null,
    images: [],
    currentPage: 1,
    totalPages: null,
    modalOpened: false,
    isLoadingMore: false,
    largeImage: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const { toSearch } = this.props;
    const { currentPage } = this.state;

    if (toSearch !== prevProps.toSearch) {
      this.setState({ images: [], currentPage: 1 });
    }
    if (toSearch !== prevProps.toSearch && currentPage !== 1) {
      return;
    }

    if (
      prevProps.toSearch !== toSearch ||
      prevState.currentPage !== currentPage
    ) {
      this.setState({ status: 'pending' });

      ImageAPI(toSearch, currentPage)
        .then(data => {
          if (data.total === 0) {
            return Promise.reject(new Error(`What is the ${toSearch}?`));
          }

          this.setState(({ images }) => {
            return {
              images: [...images, ...data.hits],
              status: 'ready',
              totalPages: Math.ceil(data.totalHits / 12),
              isLoadingMore: false,
            };
          });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  loadMoreHandler = () => {
    const { currentPage, totalPages } = this.state;

    if (currentPage >= totalPages) {
      return;
    }
    this.setState(({ currentPage, isLoadingMore }) => {
      return { currentPage: currentPage + 1, isLoadingMore: !isLoadingMore };
    });
  };

  onImageClick = Image => {
    this.setState(({ modalOpened }) => {
      return {
        modalOpened: !modalOpened,
        largeImage: Image,
      };
    });
  };

  toggleModal = () => {
    this.setState(({ modalOpened }) => {
      return {
        modalOpened: !modalOpened,
      };
    });
  };

  render() {
    const { images, status } = this.state;
    if (status === 'idle') {
      return (
        <h1 style={{ textAlign: 'center' }}>Enter what you are looking for</h1>
      );
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'ready') {
      return (
        <>
          <ImageGalleryList>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  openModal={this.onImageClick}
                />
              );
            })}
          </ImageGalleryList>
          {this.state.isLoadingMore && <Loader />}
          {this.state.totalPages > 1 &&
            !this.state.isLoadingMore &&
            this.state.totalPages !== this.state.currentPage && (
              <Button clickHandler={this.loadMoreHandler} />
            )}
          {this.state.modalOpened && (
            <Modal
              bigImage={this.state.largeImage}
              toggleModal={this.toggleModal}
            />
          )}
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ textAlign: 'center', color: 'red' }}>
            {this.state.error.message}
          </h1>
          <img src={errorImg} alt="" />
        </div>
      );
    }
  }
}

export default ImageGallery;
