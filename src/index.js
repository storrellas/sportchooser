import React from "react";
import ReactDOM from "react-dom";
import Home from "./epics/Home.js";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Startup from "./epics/Startup.js"

// Redux
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.render((
  <Provider store={store}>
    <Startup>
      <BrowserRouter>
        <div>      
          <Route path="/" exact component={Home} />
        </div>
      </BrowserRouter>
    </Startup>
  </Provider>
), document.getElementById('root'))