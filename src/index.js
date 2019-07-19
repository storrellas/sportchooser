import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

// Project imports
import Startup from "./epics/Startup.js"
import Home from "./epics/Home.js";
import Landing from "./epics/Landing.js";

// Redux
import { Provider } from "react-redux";
import store from "./redux";

// Project imports
import CookieMgr from "./utils/CookieMgr"


const isAnonymous = () => {
  return (CookieMgr.get(CookieMgr.keys.LAN) === undefined && 
          CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS) === undefined &&
          CookieMgr.get(CookieMgr.keys.TOKEN_REFRESH) === undefined)
}

class AuthenticatedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true
    }
  }

  componentDidMount(){
    if( isAnonymous() ) this.setState({ authenticated: false})
  }

  render() {
    return (this.state.authenticated?<Route {...this.props} />:<Redirect to='/' />)
  }
}

class AnonymousRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anonymous: false
    }
  }

  componentDidMount(){
    if( isAnonymous() ) this.setState({ anonymous: true})
  }

  render() {
    return (this.state.anonymous?<Route {...this.props} />:<Redirect to='/home/' />)
  }
}


ReactDOM.render((
  <Provider store={store}>
    <Startup>
      <BrowserRouter>
        <div>      
          <AuthenticatedRoute path="/home" exact component={Home} />
          <AnonymousRoute path="/" exact component={Landing} />
        </div>
      </BrowserRouter>
    </Startup>
  </Provider>
), document.getElementById('root'))