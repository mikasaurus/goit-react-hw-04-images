import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = eve => {
    this.setState({ query: eve.target.value });
  };

  handleSubmit = eve => {
    eve.preventDefault();
    const { query } = this.state;
    this.props.onSearch(query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmit} className={css.SearchForm}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormLabel}>Search</span>
          </button>

          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            value={this.state.query}
            onChange={this.handleChange}
            className={css.SearchFormInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  onChange: PropTypes.func,
};
