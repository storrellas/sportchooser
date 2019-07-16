import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';


// Redux
import { store, renderConfetti } from "../redux";

// React-redux
import { connect } from "react-redux";


// Images
import logoImage from "../assets/img/logo.png"


// Styles
import "../styles/Home.scss";

const styles = theme => ({
  root: {
    backgroundColor:'white', 
    height: '100vh', 
    padding: 0
  },
  loadingContainer:{
    height: '100%', 
    borderRadius: 16, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  mainTitle:{
    position: 'relative',
    backgroundColor: 'orange',
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});


class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSettings(e){
    console.log("Opening Settings")
    this.setState({ settings_prompt: true })
  }

  render() {
    const { classes } = this.props;
    const { sport_list, selected } = this.state;


    console.log("Rendering: ", selected)


    return (
      <div> 
        <Container maxWidth="sm" className={classes.root}>

          <CssBaseline />
          <Box m={0} p ={0} className={classes.mainTitle}>
              <b>Sport - Planner</b>
              <div>
              <img src={logoImage} style={{ width: "25%"}}></img> 
              </div>
              
              <div style={{fontSize: 14}}>Find New Sport</div>
          </Box>

          <Container maxWidth={false} style={{paddingTop: 20, textAlign: 'center', color: 'grey'}}>

            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <b>First time here?</b>
            </Box>

            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <Divider variant="middle" />
            </Box>

            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <div>Choose your language to start:</div>
            </Box>

          </Container>

        </Container>

      </div>
    );
  }
}
export default withStyles(styles)(Landing);

