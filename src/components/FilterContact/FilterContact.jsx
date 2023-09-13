import { PropTypes } from 'prop-types';
import css from './FilterContact.module.css';

export const FilterContact = ({ filter, inputChange }) => {
  return (
    <label className={css.label}>
      Find contact by name
      <input
        className={css.input}
        type="text"
        name="filter"
        value={filter}
        onChange={inputChange}
      />
    </label>
  );
};

FilterContact.propTypes = {
  filter: PropTypes.string,
  inputChange: PropTypes.func,
};
