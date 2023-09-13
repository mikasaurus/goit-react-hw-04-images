import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ src, tags }) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={src} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTyoes = {
  src: PropTypes.string,
  tags: PropTypes.string,
};
