import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ pic, largePic, tags }) => {
  const [isModalOn, setIsModalOn] = useState(false);

  // closeOnEsc = eve => {
  //   if (eve.key === 'Escape') {
  //     this.closeModal();
  //   }
  // };

  return (
    <li className={css.ImageGalleryItem}>
      <img src={pic} alt={tags} onClick={() => setIsModalOn(true)} />
      {isModalOn && (
        <div onClick={() => setIsModalOn(false)}>
          <Modal src={largePic} tags={tags} />
        </div>
      )}
    </li>
  );

  // componentDidMount() {
  //   document.addEventListener('keydown', this.closeOnEsc);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.closeOnEsc);
  // }
};

ImageGalleryItem.propTypes = {
  pic: PropTypes.string,
  largePic: PropTypes.string,
  tags: PropTypes.string,
};
