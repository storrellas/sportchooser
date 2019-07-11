import React from "react";
import ReactDOM from "react-dom";
//import Landing from "./epics/Landing.js";
import Home from "./epics/Home.js";
import { BrowserRouter, Route, Link } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

/*
ReactDOM.render((
  <BrowserRouter>
    <div>      
      <Route path="/" exact component={Login} />
      <Route path="/map/" component={Map} />
      <Route path="/chart/" component={Chart} />
    </div>
  </BrowserRouter>
), document.getElementById('root'))
/**/

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <div>      
        <Route path="/" exact component={Home} />
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))