/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import PropTypes from 'prop-types';

class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleKeyDown(event) {
    const { origin } = window.location;
    const { pages, currentPage } = this.props;
    if (event.key === 'n' && currentPage < pages) {
      window.location.href = `${origin}?page=${currentPage + 1}`;
    }
    if (event.key === 'b' && currentPage > 1) {
      window.location.href = `${origin}?page=${currentPage - 1}`;
    }
  }

  handleClick(targetPage) {
    const { currentPage } = this.props;
    if (currentPage === targetPage) {
      return;
    }
    const { origin } = window.location;
    window.location.href = `${origin}?page=${targetPage}`;
  }

  render() {
    const { pages, currentPage } = this.props;
    const pagesArray = Array(pages).fill(1);
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {pagesArray.map((element, index) => (
            <li
              className={index + 1 === currentPage ? 'active' : ''}
              key={`pagination-${Math.random().toString()}`}
            >
              <span
                className="page"
                role="button"
                tabIndex="0"
                onClick={() => this.handleClick(index + 1)}
                onKeyDown={this.handleKeyDown}
              >
                {index + 1}
              </span>
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
  currentPage: PropTypes.number,
};
Pagination.defaultProps = {
  pages: 1,
  currentPage: 1,
};
/* --- end of props validation --- */

export default Pagination;
