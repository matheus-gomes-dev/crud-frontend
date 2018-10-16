/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { productRegistered } from './modalActions';
import config from '../../config/config';
const { API_URL } = config;

function getModalStyle() {
  return {
    top: '35%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ProductModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }
  state = {
    open: false,
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategory: '',
  };

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  changeName(e) {
    if (e.target.value.split('').length > 50) {
      return;
    }
    this.setState({ ...this.state, productName: e.target.value });
  }

  changeDescription(e) {
    if (e.target.value.split('').length > 50) {
      return;
    }
    this.setState({ ...this.state, productDescription: e.target.value });
  }

  changePrice(e) {
    if (e.target.value.split('').length > 50) {
      return;
    }
    this.setState({ ...this.state, productPrice: e.target.value });
  }

  changeCategory(e) {
    if (e.target.value.split('').length > 50) {
      return;
    }
    this.setState({ ...this.state, productCategory: e.target.value });
  }

  saveProduct(event) {
    event.preventDefault();
    const {
      productName: name,
      productDescription: description,
      productPrice: price,
      productCategory: category,
    } = this.state;
    const product = {
      name,
      description,
      price,
      category,
    };
    axios.post(API_URL, product).then(response => {
      this.props.productRegistered(response.data.data);
      this.handleClose();
    });
  }

  render() {
    const { classes, title } = this.props;
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
    } = this.state;

    return (
      <div>
        <button className="btn btn-info" onClick={this.handleOpen}>
          Register new product
        </button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div
            style={getModalStyle()}
            className={`${classes.paper}
            text-center`}
          >
            <h1>{title}</h1>
            {/* React Material's modal component break with styled-components */}
            <div style={{ marginTop: '40px' }}>
              <form>
                <input
                  value={productName}
                  onChange={this.changeName}
                  required
                  type="text"
                  className="form-control"
                  placeholder="name"
                  style={{ margin: '10px' }}
                />
                <input
                  value={productDescription}
                  onChange={this.changeDescription}
                  required
                  type="text"
                  className="form-control"
                  placeholder="description"
                  style={{ margin: '10px' }}
                />
                <input
                  value={productPrice}
                  min="0"
                  onChange={this.changePrice}
                  required
                  type="number"
                  className="form-control"
                  placeholder="price"
                  style={{ margin: '10px' }}
                />
                <input
                  value={productCategory}
                  onChange={this.changeCategory}
                  required
                  type="text"
                  className="form-control"
                  placeholder="category"
                  style={{ margin: '10px' }}
                />
                <div style={{ marginTop: '30px' }}>
                  <button
                    style={{ margin: '5px', width: '100px' }}
                    className="btn btn-default"
                    onClick={() => this.handleClose()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ margin: '5px', width: '100px' }}
                    className="btn btn-success"
                    onClick={this.saveProduct}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

ProductModal.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  productRegistered: PropTypes.func,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ProductModal);
const mapDispatchToProps = dispatch =>
  bindActionCreators({ productRegistered }, dispatch);
export default connect(
  null,
  mapDispatchToProps,
)(SimpleModalWrapped);
