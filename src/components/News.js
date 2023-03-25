import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import {
  FETCH_NEWS_URL,
  API_KEY,
  PAGE,
  PAGE_SIZE,
  CATEGORY,
} from '../constant';
import Spinner from './Spinner';

const News = (props) => {
  const [fetchArticles, setFetchArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  let handlePreviosClick = () => {
    setIsLoading(true);
    fetch(
      `${FETCH_NEWS_URL}${props.country}${CATEGORY}${
        props.category
      }${API_KEY}&page=${page - 1}&${PAGE}=${PAGE_SIZE}`
    )
      .then((news) => news.json())
      .then((news) => {
        setPage(page - 1);
        setIsLoading(false);
        setFetchArticles(news.articles);
      });
  };

  let handleNextClick = async () => {
    await setIsLoading(true);
    fetch(
      `${FETCH_NEWS_URL}${props.country}${CATEGORY}${
        props.category
      }${API_KEY}&page=${page + 1}&${PAGE}=${PAGE_SIZE}`
    )
      .then((news) => news.json())
      .then((news) => {
        setPage(page + 1);
        setIsLoading(false);
        setFetchArticles(news.articles);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${FETCH_NEWS_URL}${props.country}${CATEGORY}${props.category}${API_KEY}&page=1&${PAGE}=${PAGE_SIZE}`
    )
      .then((news) => news.json())
      .then((news) => {
        setIsLoading(false);
        setPage(1);
        setTotalResults(news.totalResults);
        setFetchArticles(news.articles);
      });
    document.title = `${props.category} - News App`;
  }, [props.country, props.category]);

  return (
    <div className="container my-3">
      {isLoading && <Spinner />}
      <h2 className="text-center"> Today's - Top Headlines </h2>
      <div className="row">
        {!isLoading &&
          fetchArticles.map((news) => {
            return (
              <div className="col-md-4 my-2" key={news.url}>
                <NewsItem
                  imageUrl={news.urlToImage}
                  title={news.title ? news.title.slice(0, 40) + '...' : ''}
                  description={
                    news.content ? news.content.slice(0, 80) + '...' : ''
                  }
                  newsUrl={news.url}
                />
              </div>
            );
          })}
      </div>
      <div className="d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePreviosClick}
        >
          {' '}
          &larr; Previous
        </button>
        <button
          disabled={Math.ceil(totalResults / PAGE_SIZE) < page + 1}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          {' '}
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default News;

News.defaultProp = {
  country: 'in',
  category: 'general',
};
