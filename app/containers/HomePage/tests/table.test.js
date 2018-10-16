import React from 'react';
import { shallow } from 'enzyme';
import Table from '../../../components/table/table';

describe('<Table />', () => {
  it('should render the table component', () => {
    const products = {
      data: {
        data: {
          docs: [
            {
              _id: 11,
              name: 'Headphone',
              description: 'Listen to music',
              price: 23.5,
              category: 'Music',
            },
          ],
          pages: 1,
        },
      },
    };

    const mockedCallback = () => Promise.resolve(products);
    let promise;
    const getProductsInfo = () => {
      promise = Promise.resolve().then(mockedCallback);
      return promise;
    };
    const wrapper = shallow(<Table getProductsInfo={getProductsInfo} />);
    promise.then(() => {
      wrapper.update();
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
});
