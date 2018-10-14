/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.PureComponent {
  render() {
    const { pages } = this.props;
    const pagesArray = pages > 5 ? Array(5).fill(1) : Array(pages).fill(1);
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {pagesArray.map((element, index) => (
            <li key={`pagination-${Math.random().toString()}`}>
              <span className="page">{index + 1}</span>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

/* --- props validation --- */
Pagination.propTypes = {
  pages: PropTypes.number,
};
Pagination.defaultProps = {
  pages: 1,
};
/* --- end of props validation --- */

export default Pagination;
