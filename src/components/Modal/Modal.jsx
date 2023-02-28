import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#root-modal');

class Modal extends Component {
  handleEscapeDown = e => {
    // console.log(e);
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget !== e.target) {
      return;
    }

    this.props.toggleModal();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeDown);
  }

  componentWillUnmount() {
    window.addEventListener('keydown', this.handleEscapeDown);
  }

  render() {
    const { bigImage } = this.props;
    return createPortal(
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWindow>
          <img src={bigImage} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}

export default Modal;
