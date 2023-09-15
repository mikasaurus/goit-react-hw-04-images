import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ pic, largePic, tags }) => {
  const [isModalOn, setIsModalOn] = useState(false);

  const escFunction = useCallback(event => {
    if (event.key === 'Escape') {
      setIsModalOn(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

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
};

ImageGalleryItem.propTypes = {
  pic: PropTypes.string,
  largePic: PropTypes.string,
  tags: PropTypes.string,
};
