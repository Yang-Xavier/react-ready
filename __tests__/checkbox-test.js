jest.dontMock('../src/checkbox.js')

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

//import CheckBox from '../checkbox.js'
const CheckBox = require('../src/checkbox.js')

describe('CheckBox', () => {

  it('change the text after click', () => {


    var cb = TestUtils.renderIntoDocument(
      <CheckBox labelOn="On" labelOff="Off" />
    )

    var cbnode = ReactDOM.findDOMNode(cb)

    expect(cbnode.textContent).toEqual('Off')

    TestUtils.Simulate.change(
      TestUtils.findRenderedDOMComponentWithTag(cb, 'input')
    )

    expect(cbnode.textContent).toEqual('On')
  })
})
