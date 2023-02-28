import styled from 'styled-components';

const ImageGalleryList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

const GalleryHeader = styled.h1`
  text-align: center;
`;

const ErrorBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const ErrorMessage = styled.h2`
  color: red;
`;

export { ImageGalleryList, GalleryHeader, ErrorBox, ErrorMessage };
