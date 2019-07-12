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
      zIndex: 1000
    }

    // Confetti holder    
    this.confetti = null
    this.confettiSettings = { target: 'my-canvas' }
  }

  componentDidMount(){

    // Create confetti object
    this.confetti = new ConfettiGenerator(this.confettiSettings);
  }

  componentDidUpdate(){
    console.log("Startup: ComponentDidUpdate", this.props.confetti)
    console.log("Startup: ComponentDidUpdate", this.confetti)

    
    if(this.props.confetti){
      this.state.zIndex = 1000
      this.confetti.render();
    }else{
      this.confettiSettings.width = 0
      this.confettiSettings.height = 0
      this.confetti.clear();
    }

    //setTimeout(() => { confetti.clear();}, 3000);
  }

  render() {
    console.log("Startup: Render Startup", this.props)
    return (
      <div>
        <canvas id="my-canvas" width={200} height={200} style={{ position:'absolute', backgroundColor: 'transparent', zIndex: this.state.zIndex }}></canvas>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Startup);