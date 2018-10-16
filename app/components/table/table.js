/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pagination from '../pagination/pagination';

class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = { currentPage: null, totalPages: null, products: [] };
    this.updateProductsList = this.updateProductsList.bind(this);
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const currentPage = Number(url.searchParams.get('page')) || 1;
    this.props.getProductsInfo(currentPage).then(response => {
      const totalPages = response.data.data.pages;
      const products = response.data.data.docs;
      this.setState({ ...this.state, currentPage, totalPages, products });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newProduct._id !== this.props.newProduct._id) {
      const { products } = this.state;
      const updatedProductsList = [...products, this.props.newProduct];
      this.updateProductsList(updatedProductsList);
    }
  }

  deleteProduct(id) {
    this.props.deleteProduct(id).then(() => {
      let { products } = this.state;
      products = products.filter(product => product._id !== id);
      this.setState({ ...this.state, products });
    });
  }

  updateProductsList(updatedProductsList) {
    const { products, currentPage, totalPages } = this.state;
    if (products.length === 5 && currentPage === totalPages) {
      // update pagination
      this.setState({ ...this.state, totalPages: totalPages + 1 });
      return;
    } else if (products.length === 5) {
      return;
    }
    this.setState({ ...this.state, products: updatedProductsList });
  }

  render() {
    const { currentPage, totalPages, products } = this.state;
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Description</b>
              </td>
              <td>
                <b>Price</b>
              </td>
              <td>
                <b>Category</b>
              </td>
              <td>
                <b>Actions</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {products.map(item => (
              <tr key={`table-product-${item._id}`}>
                <td className="product-name">{item.name}</td>
                <td className="product-description">{item.description}</td>
                <td className="product-price">{item.price.toFixed(2)}</td>
                <td className="product-category">{item.category}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deleteProduct(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} pages={totalPages} />
      </div>
    );
  }
}

/* --- props validation --- */
Table.propTypes = {
  getProductsInfo: PropTypes.func,
  deleteProduct: PropTypes.func,
  newProduct: PropTypes.object,
};
Table.defaultProps = {
  getProductsInfo: null,
  deleteProduct: null,
  newProduct: {},
};
/* --- end of props validation --- */

const mapStateToProps = state => ({
  newProduct: state.get('tableUpdated').newProduct,
  editedProduct: state.get('tableUpdated').editedProduct,
});
export default connect(
  mapStateToProps,
  null,
)(Table);
