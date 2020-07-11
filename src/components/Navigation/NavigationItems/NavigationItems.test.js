import React from 'react'

import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigtionItem from './NavigationItem/NavigationItem'


configure({adapter: new Adapter()})

describe('<NavigtionItem />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />)
  })

  it('should render two <NavigtionItem /> elements if not Authenticated', () => {
    expect(wrapper.find(NavigtionItem)).toHaveLength(2)
  })

  it('should render three <NavigtionItem /> elements if Authenticated', () => {
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.find(NavigtionItem)).toHaveLength(3)
  })

  it('should an exact logout button', () => {
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.contains(<NavigtionItem link="/logout">Logout</NavigtionItem>)).toEqual(true)
  })
})