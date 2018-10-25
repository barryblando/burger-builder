import React from 'react';
import { shallow } from 'enzyme';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  })

  test('should render two <NavigationItems /> elements if not authenticated', () => {
    // expect to have 2 NavigationItem (BurgerBuilder, Authenticate)
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  test('should render three <NavigationItems /> elements if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    // expect to have 3 NavigationItem (BurgerBuilder, Orders, Authenticate)
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

});