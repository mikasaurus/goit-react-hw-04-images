import { useEffect, useState } from 'react';
import { Searchbar } from './Searchabr/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';
import axios from 'axios';

export const App = () => {
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [hits, setHits] = useState(0);
  const [totalHits, setTotalHits] = useState(0);

  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '37377775-c77698ffc3675e3ed26b97c68';

  const fetchImages = async url => {
    const response = await axios.get(url);
    const data = await response.data;
    return data;
  };

  const handleSearch = query => {
    setKeyword(query);
    resetSearch();
  };

  const resetSearch = () => {
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => resetSearch(), []);

  useEffect(() => {
    setLoader(true);
    const url = `${BASE_URL}?q=${keyword}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    fetchImages(url).then(data => {
      setImages(prevState => [...prevState, ...data.hits]);
      setTotalHits(data.totalHits);
      setHits(prevState => prevState + data.hits.length);
      setLoader(false);
    });
  }, [keyword, page]);

  return (
    <div className={css.App}>
      <Searchbar onSearch={handleSearch} />
      <ImageGallery images={images} />
      {loader && <Loader />}
      {totalHits > 12 && <Button onClick={loadMore} />}
    </div>
  );
};
