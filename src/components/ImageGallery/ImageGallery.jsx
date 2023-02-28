import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import {
  ImageGalleryList,
  GalleryHeader,
  ErrorBox,
  ErrorMessage,
} from './ImageGallery.styled';

import errorImg from '../../images/errorImg.jpg';
import ImageAPI from 'components/API_KEY';

const ImageGallery = ({ toSearch }) => {
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [largeImage, setLargeImage] = useState(null);
  const [querry, setQuerry] = useState('');

  const prevPage = useRef(1);
  const prevSearch = useRef('');

  useEffect(() => {
    setQuerry(toSearch);
    setCurrentPage(1);
    setImages([]);
  }, [toSearch]);

  useEffect(() => {
    if (querry === '') {
      return;
    }

    setIsLoadingMore(i => !i);

    ImageAPI(querry, currentPage)
      .then(data => {
        if (data.total === 0) {
          return Promise.reject(new Error(`What is ${querry} ?`));
        }
        setImages(images => [...images, ...data.hits]);
        setError(null);
        setIsLoadingMore(i => !i);

        setTotalPages(Math.ceil(data.totalHits / 12));
        setIsLoadingMore(false);
      })

      .catch(error => {
        setError(error);
        setIsLoadingMore(i => !i);
      });
  }, [currentPage, querry]);

  const loadMoreHandler = () => {
    if (currentPage >= totalPages) {
      return;
    }

    setCurrentPage(p => p + 1);
    setIsLoadingMore(i => !i);
  };

  const onImageClick = image => {
    setLargeImage(image);
    setModalOpened(m => !m);
  };

  const toggleModal = () => {
    setModalOpened(m => !m);
  };

  useEffect(() => {
    prevPage.current = currentPage;
    prevSearch.current = toSearch;
  });

  return (
    <>
      {images.length === 0 && error === null && isLoadingMore === false && (
        <GalleryHeader>Enter what you want to find</GalleryHeader>
      )}

      {isLoadingMore && <Loader />}
      {images.length > 0 && (
        <>
          <ImageGalleryList>
            {images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  image={image}
                  openModal={onImageClick}
                />
              );
            })}
          </ImageGalleryList>

          {isLoadingMore && <Loader />}
          {totalPages > 1 && currentPage < totalPages && !isLoadingMore && (
            <Button clickHandler={loadMoreHandler} />
          )}

          {modalOpened && (
            <Modal bigImage={largeImage} toggleModal={toggleModal} />
          )}
        </>
      )}
      {error !== null && (
        <ErrorBox>
          <ErrorMessage>{error.message}</ErrorMessage>
          <img src={errorImg} alt="" />
        </ErrorBox>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  toSearch: PropTypes.string.isRequired,
};

export default ImageGallery;
