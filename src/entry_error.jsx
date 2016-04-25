/* the  error 
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Redirect, hashHistory} from 'react-router'
 
import Colors from 'material-ui/lib/styles/colors'
import PageCard from './component/card/PageCard.jsx'
import PlaneString from  './component/units/PlaneString.jsx'

import {GeekCardFoot} from './component/AuthorAbout.jsx'

let headImage = require('./img/Head.jpg')

// a glue fucntion to glue django template and React.
window.ReactInit = function glue(params) {

  let __PageCard = (props) => (<PageCard {...props}
                          title={'Error'}
                          subtitle={ params.status !== 200 ? params.status.toString() : '' }
                          img={headImage}
                          foot={<GeekCardFoot />}/>)
  let __PlaneString = (props) => (<PlaneString {...props}
                          strings={[params.message]}
                          textStyle={{
                            color: Colors.pink500,
                            textShadow: '1px 1px 0 #eee'
                          }}
                          scale={2.5}/>)

  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/"  component={__PageCard} >
        <IndexRoute component={__PlaneString} />
      </Route>
    </Router>,
    document.getElementById('root'))
}
