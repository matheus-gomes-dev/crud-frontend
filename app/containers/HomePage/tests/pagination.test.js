/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import { mount } from 'enzyme';

import Pagination from '../../../components/pagination/pagination';

describe('<Pagination />', () => {
  it('should render the pagination component', () => {
    const wrapper = mount(<Pagination page={1} />);
    const page = wrapper.find('.page');
    expect(page.text()).toBe('1');
  });
});
