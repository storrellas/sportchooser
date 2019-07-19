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
  //return false
}

class AuthenticatedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      redirected: false
    }


    console.log("-- AuthenticatedRoute: Constructor --")
    store.subscribe(() => {
      console.log(store.getState())
      const state = store.getState()
      console.log("-- State --")
      console.log(state)
      if( state.userAuthenticated ){
        console.log("Auth")
        this.setState({authenticated: true})
      }else{
        console.log("NOTAuth")
      }
        
    })

  }

  componentDidMount(){
    console.log("-- AuthenticatedRoute:componentDidMount -- ",isAnonymous(), this.state)
    if( isAnonymous() && (this.state.redirected == false) ) 
      this.setState({ authenticated: false, redirected: true })
  }

  componentDidUpdate(){
    console.log("-- AuthenticatedRoute:componentDidUpdate -- ",isAnonymous(), this.state)
    if( isAnonymous() && (this.state.redirected == false) ) 
      this.setState({ authenticated: false, redirected: true })
  }

  render() {
    console.log("-- AuthenticatedRoute:render -- ",isAnonymous() )
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
    console.log("-- AnonymousRoute:componentDidMount -- ",isAnonymous() )
    if( isAnonymous() ) this.setState({ anonymous: true })
  }

  render() {
    console.log("-- AnonymousRoute:render -- ",isAnonymous() )
    return (this.state.anonymous?<Route {...this.props} />:<Redirect to='/home' />)
  }
}
/**/


ReactDOM.render((
  <Provider store={store}>
    <Startup>
      <BrowserRouter>
        <div>      
          <AuthenticatedRoute exact path="/home" component={Home} />
          <AnonymousRoute path="/" exact component={Landing} />
        </div>
      </BrowserRouter>
    </Startup>
  </Provider>
), document.getElementById('root'))