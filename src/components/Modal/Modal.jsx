import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  render() {
    const { src, tags } = this.props;
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src={src} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTyoes = {
  src: PropTypes.string,
  tags: PropTypes.string,
};
