import React, { Component } from 'react';
import { Searchbar } from './Searchabr/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';
import axios from 'axios';

export class App extends Component {
  state = {
    images: [],
    keyword: '',
    page: 1,
    perPage: 12,
    loaderOn: false,
  };

  BASE_URL = 'https://pixabay.com/api/';
  API_KEY = '37377775-c77698ffc3675e3ed26b97c68';

  fetchImages = async url => {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  };

  findImages = () => {
    this.setState({ loaderOn: true });
    const url = `${this.BASE_URL}?q=${this.state.keyword}&page=${this.state.page}&key=${this.API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.perPage}`;
    this.fetchImages(url).then(data => {
      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
        totalHits: data.totalHits,
        hits: prevState.hits + data.hits.length,
        loaderOn: false,
      }));
    });
  };

  handleSearch = query => {
    this.setState({
      keyword: query,
      page: 1,
      images: [],
      totalHits: 0,
      hits: 0,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidMount() {
    this.handleSearch('');
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.keyword !== this.state.keyword ||
      prevState.page !== this.state.page
    ) {
      this.findImages();
    }
  }

  render() {
    const { images, loaderOn, totalHits } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSearch={this.handleSearch} />
        <ImageGallery images={images} />
        {loaderOn && <Loader />}
        {totalHits > 12 && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}
