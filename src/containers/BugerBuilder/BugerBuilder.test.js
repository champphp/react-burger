import React from 'react'

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { BurgerBuilder } from './BugerBuilder'
import BuildControls from '../../components/Burger/BulidControls/BulidControls';

configure({adapter: new Adapter()})

describe('<BurgerBuilder />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} />)
  })

  it('should render two <BurgerBuilder /> when receiving ingredients', () => {
    wrapper.setProps({ ings: { salad: 0 } })
    expect(wrapper.find(BuildControls)).toHaveLength(1)
  })
})