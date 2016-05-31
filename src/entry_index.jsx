/* the page manager 
 *
 *
 * Author: Mephis Pheies
 * Email: mephistommm@gmail.com
 * Update: 09.03.2016
 */
import React from "react"
import ReactDOM from "react-dom"
import { Router, Route, IndexRoute, Redirect, hashHistory} from "react-router"
import injectTapEventPlugin from "react-tap-event-plugin"
 
import PageCard from "./component/card/PageCard.jsx"
import SignPage from "./component/SignPage.jsx"
import PlaneString from  "./component/units/PlaneString.jsx"
import {GeekCardFoot} from "./component/AuthorAbout.jsx"

injectTapEventPlugin()

let headImage = require("./img/Head.jpg")

// a glue fucntion to glue django template and React.
window.ReactInit = function glue() {

  let __PageCard = (props) => (<PageCard {...props}
                          title={"Sign Up!"}
                          subtitle={"2016“龙驰杯”浙江·高校·Hackathon !"}
                          img={headImage}
                          foot={<GeekCardFoot />}/>)
  let __SignPage = (props) => <SignPage {...props} />
  let __PlaneString = (props) => <PlaneString {...props} strings={["Congratulation,","Sign Up Success!"]} scale={2.5}/>

  ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/"  component={__PageCard} >
        <IndexRoute component={__SignPage} />
        <Route path="success" component={__PlaneString} />
      </Route>
    </Router>,
    document.getElementById("root"))
}
