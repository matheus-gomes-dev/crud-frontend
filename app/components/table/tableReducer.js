/* eslint linebreak-style: ["error", "windows"] */

const INITIAL_STATE = { products: [] };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'DELETE_PRODUCT':
      return { ...state, products: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
}
