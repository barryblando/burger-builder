import React from 'react';
import { shallow } from 'enzyme';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

describe('BurgerBuilder Container', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
  });

  test('should render <BuildControls /> when receiving ingredients', () => {
    wrapper.setProps({
      ingredients: { salad: 0 }
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});