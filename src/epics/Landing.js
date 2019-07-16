import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'

// Redux
import { store, renderConfetti } from "../redux";

// React-redux
import { connect } from "react-redux";


// Images
import logoImage from "../assets/img/logo.png"
import ukImage from "../assets/img/uk.png"
import nlImage from "../assets/img/nl.png"


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
  },
  flag:{
    width: "40%", 
    cursor: 'pointer'
  },
  button:{
    borderRadius: 25,
    width: "50%",
    backgroundColor: '#117A65',
    '&:hover':{
      backgroundColor: '#055D5B'
    }
  }
});


class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  handleSelectLanguage(e, lan){
    console.log("Launguage")
    console.log(lan)
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    const { classes } = this.props;
    const { sport_list, selected } = this.state;

    console.log("Rerendering")

    return (
      <div> 
        <Container maxWidth="sm" className={classes.root}>

        {this.renderRedirect()}


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

            <Box mt={3} ml={3} mr={3} pl={15} pr={15} borderRadius={16}>
              <Grid container spacing={3}>
                <Grid item xs={6} onClick={(e) => this.handleSelectLanguage(e, 'uk')}>
                  <img src={ukImage} className={classes.flag}></img> 
                </Grid>
                <Grid item xs={6} onClick={(e) => this.handleSelectLanguage(e, 'nl')}>
                  <img src={nlImage} className={classes.flag}></img> 
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <b>Coming back and seeing this screen again?</b>
            </Box>

            <Box mt={2} ml={3} mr={3}>
              <Button variant="contained" color="secondary" className={classes.button}>       
                <b>Enter Email</b>
              </Button>
            </Box>


            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <div>Don't worry</div>
              <div>Enter your email or use the link we sent to continue from last time</div>
            </Box>

          </Container>

        </Container>

      </div>
    );
  }
}
export default withStyles(styles)(Landing);

