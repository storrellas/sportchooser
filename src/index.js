import React from "react";
import ReactDOM from "react-dom";
//import Landing from "./epics/Landing.js";
import Home from "./epics/Home.js";
import { BrowserRouter, Route, Link } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./redux";

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

import ConfettiGenerator from "confetti-js";

class Startup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    const confettiSettings = { target: 'my-canvas2' };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    setTimeout(() => { confetti.clear();}, 3000);
  }

  render() {
    console.log("Rendering Confetti")
    return (
      <div>
        <canvas id="my-canvas2" style={{ position:'absolute', backgroundColor: 'transparent' }}></canvas>
        {this.props.children}
      </div>
    );
  }
}



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