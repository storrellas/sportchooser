import React from "react";
import ConfettiGenerator from "confetti-js";

// React-redux
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { confetti: state.confetti };
};


class Startup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Confetti holder    
    this.confetti = null
  }

  componentDidMount(){

    // Create confetti object
    const confettiSettings = { target: 'my-canvas2' };
    this.confetti = new ConfettiGenerator(confettiSettings);
  }

  componentDidUpdate(){
    //console.log("Startup: ComponentDidUpdate", this.props.confetti)

    if(this.props.confetti){
      this.confetti.render();
    }else{
      this.confetti.clear();
    }

    //setTimeout(() => { confetti.clear();}, 3000);
  }

  render() {
    //console.log("Startup: Render Startup", this.props)
    return (
      <div>
        <canvas id="my-canvas2" style={{ position:'absolute', backgroundColor: 'transparent' }}></canvas>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Startup);