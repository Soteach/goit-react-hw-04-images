import { MagnifyingGlass } from 'react-loader-spinner';
import { SpinnerWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <SpinnerWrapper>
      <MagnifyingGlass
        visible={true}
        height="180"
        width="180"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
    </SpinnerWrapper>
  );
};

export default Loader;
