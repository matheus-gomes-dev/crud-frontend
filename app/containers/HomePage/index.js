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

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {
  componentWillMount() {
    axios.get('http://localhost:5000/').then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <Pagination pages={3} />
      </div>
    );
  }
}
