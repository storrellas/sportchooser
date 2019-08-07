import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import UUID from 'uuid/v4'
import queryString from 'query-string'


// Redux
import { store, renderConfetti, userCreated } from "../redux";

// React-redux
import { connect } from "react-redux";

// Project imports
import CookieMgr from "../utils/CookieMgr"
import config from '../config/env'
import ForgotDialog from '../components/ForgotDialog'

// Images
import backgroundTopImage from "../assets/img/img_BackGroundWaves_top.png"
import logoImage from "../assets/img/tryasport/img_logo.png"
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
    backgroundImage: "linear-gradient(90deg, #F76D1D 0%, #FFCC27 100%)",
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
    backgroundColor: '#00CA9D',
    '&:hover':{
      backgroundColor: '#005643'
    }
  }
});


function mapDispatchToProps(dispatch) {
  return {
    userCreated: (data) => dispatch(userCreated(data)),
  };
}

class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  async handleSelectLanguage(e, lan){

    // Create User
    let body = { language: lan }
    let response = await fetch(config.BASE_API_URL + '/api/user/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(body)
    })
    let data = await response.json()

    // Store tokens
    CookieMgr.set(CookieMgr.keys.TOKEN_ACCESS, data.access)
    CookieMgr.set(CookieMgr.keys.TOKEN_REFRESH, data.refresh)
  
    // Move to Home URL
    this.props.history.push('/home')
    this.props.userCreated(data)
  }

  async componentDidMount(){

    // If coming from link
    const parsed = queryString.parse(this.props.location.search);
    if( !('key' in parsed && 'value' in parsed) ){
      return;
    }

    // Get token
    let body = { username: parsed['key'], password: parsed['value'] }    
    let response = await fetch(config.BASE_API_URL + '/api/token/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(body)
    })
    let data = await response.json()
    CookieMgr.set(CookieMgr.keys.TOKEN_ACCESS, data.access)
    CookieMgr.set(CookieMgr.keys.TOKEN_REFRESH, data.refresh)

    // Get whoami
    response = await fetch(config.BASE_API_URL + '/api/user/whoami/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      },    
    })
    data = await response.json()

    // Move to Home URL
    this.props.history.push('/home')
    this.props.userCreated(data)
  }


  handleClose(){
    console.log('The link was closed')
    this.setState({ open: false, })
  };

  handleClick(e){
    console.log('The link was closed')
    this.setState({ open: true, })
  }

  render() {
    const { classes } = this.props;
    
    console.log("-- Landing --")
    console.log(this.props.location.search)
    return (
      <div> 
        <Container maxWidth="sm" className={classes.root}>
          <CssBaseline />
          <Box m={0} p ={0} className={classes.mainTitle} style={{ position:'relative'}}>
              <img src={backgroundTopImage} style={{ width: "100%", height: "100%", position: 'absolute', top:0, left:0 }}/>
              <div style={{ zIndex: 10, position: 'relative' }}>
                <b>Sport - Planner</b>
                <div>
                <img src={logoImage} style={{ width: "25%"}}></img> 
                </div>
                
                <div style={{fontSize: 14}}>Find New Sport</div>
              </div>
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

            <Box mt={3} ml={3} mr={3} borderRadius={16} style={{display: 'flex', justifyContent: 'center'}}>
              <Grid container spacing={3} style={{width: "75%"}}>
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
              <Button variant="contained" color="secondary" className={classes.button} onClick={(e) => this.handleClick(e)}>       
                <b>Enter Email</b>
              </Button>
            </Box>


            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <div>Don't worry</div>
              <div>Enter your email or use the link we sent to continue from last time</div>
            </Box>

            <ForgotDialog open={this.state.open} onClose={(e) => this.handleClose()} />


          </Container>

        </Container>

      </div>
    );
  }
}
//export default withRouter(withStyles(styles)(Landing));
export default connect(null, mapDispatchToProps)(withStyles(styles)(Landing));


