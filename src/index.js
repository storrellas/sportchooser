import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

// Project imports
import Startup from "./epics/Startup.js"
import Home from "./epics/Home.js";
import Landing from "./epics/Landing.js";

// Redux
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.render((
  <Provider store={store}>
    <Startup>
      <BrowserRouter>
        <div>      
          <Route path="/home" exact component={Home} />
          <Route path="/" exact component={Landing} />
        </div>
      </BrowserRouter>
    </Startup>
  </Provider>
), document.getElementById('root'))