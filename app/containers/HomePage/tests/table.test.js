/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import { mount } from 'enzyme';

import Table from '../../../components/table/table';

describe('<Table />', () => {
  it('should render the table component', () => {
    const products = [
      {
        _id: 11,
        name: 'Headphone',
        description: 'Listen to music',
        price: 23.5,
        category: 'Music',
      },
    ];
    const wrapper = mount(<Table products={products} />);
    const productName = wrapper.find('.product-name');
    const productDescription = wrapper.find('.product-description');
    const productPrice = wrapper.find('.product-price');
    const productCategory = wrapper.find('.product-category');
    expect(productName.text()).toBe('Headphone');
    expect(productDescription.text()).toBe('Listen to music');
    expect(productPrice.text()).toBe('23.5');
    expect(productCategory.text()).toBe('Music');
  });
});
