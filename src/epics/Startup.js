import React from "react";

// Project imports
import StorageMgr from "../utils/StorageMgr"
import ConfettiGenerator from "../lib/Confetti";
import config from '../config/env'

// React-redux
import { connect } from "react-redux";
import { translations } from "../redux";


const mapStateToProps = state => {
  return { confetti: state.confetti };
};
function mapDispatchToProps(dispatch) {
  return {
    translations: (data) => dispatch(translations(data)),
  };
}

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

  async fetch_translations(lan){
    const response = await fetch(config.BASE_API_URL + `/api/config/translations/?lan=${lan}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },    
    })
    const data = await response.json()
    //console.log("translations" + JSON.stringify(data))
    // Store translations
    StorageMgr.set(StorageMgr.keys.TRANSLATIONS, JSON.stringify(data));

    // Dispatch
    this.props.translations(JSON.stringify(data))
  }

  componentDidMount(){
    this.fetch_translations('en')
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(Startup);