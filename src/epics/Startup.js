import React from "react";
//import ConfettiGenerator from "confetti-js";
import ConfettiGenerator from "../components/Confetti";

// React-redux
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { confetti: state.confetti };
};


class Startup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1500
    }

    // Confetti holder    
    this.confetti = null
    this.confettiSettings = { target: 'my-canvas' }
  }

  componentDidMount(){}

  componentDidUpdate(){   
    if(this.props.confetti){
      // Create confetti object
      this.confetti = new ConfettiGenerator(this.confettiSettings);
      this.state.zIndex = 1500
      this.confetti.render();
    }else{
      this.confettiSettings.width = 0
      this.confettiSettings.height = 0
      this.confetti.clear();
    }
  }

  render() {
    return (
      <div>
        <canvas id="my-canvas" width={200} height={200} style={{ position:'absolute', backgroundColor: 'transparent', zIndex: this.state.zIndex }}></canvas>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Startup);