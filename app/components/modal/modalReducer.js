const INITIAL_STATE = {
  newProduct: {},
  editedProduct: {},
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'PRODUCT_REGISTERED':
      return { ...state, newProduct: action.payload };
    case 'PRODUCT_EDITED':
      return { ...state, editedProduct: action.payload };
    default:
      return state;
  }
}
