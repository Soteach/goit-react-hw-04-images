import PropTypes from 'prop-types';

import {
  ImageGalleryItemLI,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, openModal }) => {
  return (
    <ImageGalleryItemLI
      onClick={() => {
        openModal(image.largeImageURL);
      }}
    >
      <ImageGalleryItemImage src={image.webformatURL} alt={image.tags} />
    </ImageGalleryItemLI>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    tags: PropTypes.string,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
