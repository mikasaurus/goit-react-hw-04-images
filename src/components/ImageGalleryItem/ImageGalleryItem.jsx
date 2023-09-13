import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  closeOnEsc = eve => {
    if (eve.key === 'Escape') {
      this.closeModal();
    }
  };

  render() {
    const { pic, largePic, tags } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img src={pic} alt={tags} onClick={this.openModal} />
        {this.state.isModalOpen && (
          <div onClick={this.closeModal}>
            <Modal src={largePic} tags={tags} />
          </div>
        )}
      </li>
    );
  }

  componentDidMount() {
    document.addEventListener('keydown', this.closeOnEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeOnEsc);
  }
}

ImageGalleryItem.propTypes = {
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  pic: PropTypes.string,
  largePic: PropTypes.string,
  tags: PropTypes.string,
};
