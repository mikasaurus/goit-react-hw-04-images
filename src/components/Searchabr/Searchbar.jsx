import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export const Searchbar = ({ onChange }) => {
  const [query, setQuery] = useState('');

  const submitHandler = eve => {
    eve.preventDefault();
    onChange(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={submitHandler} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormLabel}>Search</span>
        </button>

        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={css.SearchFormInput}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onChange: PropTypes.func,
};
