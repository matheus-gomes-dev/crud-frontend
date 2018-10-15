/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import axios from 'axios';
import messages from './messages';
import Pagination from './pagination';
import Table from './table';
import MarginDiv from './index.style';
import config from '../../config/config';
const { API_URL } = config;

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: null, totalPages: null, products: [] };
  }
  componentWillMount() {
    const url = new URL(window.location.href);
    const currentPage = Number(url.searchParams.get('page')) || 1;
    axios.get(`${API_URL}?page=${currentPage}`).then(response => {
      const totalPages = response.data.data.pages;
      const products = response.data.data.docs;
      this.setState({ ...this.state, currentPage, totalPages, products });
    });
  }

  render() {
    const { currentPage, totalPages, products } = this.state;
    return (
      <div className="container">
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <MarginDiv>
          <button className="btn btn-success">
            <span>Register new product</span>
          </button>
        </MarginDiv>
        <MarginDiv>
          <Table products={products} />
        </MarginDiv>
        <Pagination pages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}
