/* eslint linebreak-style: ["error", "windows"] */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

export const setProducts = products => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const deleteProduct = (id, products) => ({
  type: 'DELETE_PRODUCT',
  payload: products.filter(product => product._id !== id),
});
