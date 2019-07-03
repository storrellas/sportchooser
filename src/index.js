import React from "react";
import ReactDOM from "react-dom";
// import Login from "./js/Login.js";
// import Map from "./js/Map.js";
// import Chart from "./js/Chart.js";
import Landing from "./js/Landing.js";
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
      <Route path="/" exact component={Landing} />
    </div>
  </BrowserRouter>
), document.getElementById('root'))