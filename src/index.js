import React from "react";
import ReactDOM from "react-dom";
//import Landing from "./epics/Landing.js";
import Home from "./epics/Home.js";
import { BrowserRouter, Route, Link } from "react-router-dom";


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
  <BrowserRouter>
    <div>      
      <Route path="/" exact component={Home} />
    </div>
  </BrowserRouter>
), document.getElementById('root'))