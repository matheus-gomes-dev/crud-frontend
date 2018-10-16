export const productRegistered = product => ({
  type: 'PRODUCT_REGISTERED',
  payload: product,
});

export const productEdited = product => ({
  type: 'PRODUCT_EDITED',
  payload: product,
});
