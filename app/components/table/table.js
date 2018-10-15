/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteProduct } from './tableActions';
import config from '../../config/config';
const { API_URL } = config;

class Table extends React.PureComponent {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct(id) {
    axios.delete(`${API_URL}?id=${id}`).then(response => {
      console.log(response);
    });
  }
  render() {
    const { products } = this.props;
    return (
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
    );
  }
}

/* --- props validation --- */
Table.propTypes = {
  products: PropTypes.array,
};
Table.defaultProps = {
  products: [],
};
/* --- end of props validation --- */

const mapDispatchToProps = dispatch =>
  bindActionCreators({ deleteProduct }, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(Table);
