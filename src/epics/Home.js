import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { shadows } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';



import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// AwesomeSlider
import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/styles';

// Components
import FriendDialog from '../components/FriendDialog';

// Images
import undoImage from "../assets/img/tryasport/undo.png"
import noInterestImage from "../assets/img/tryasport/no_interest.png"
import likeToTryImage from "../assets/img/tryasport/like_to_try.png"
import alreadyPlayedImage from "../assets/img/tryasport/already_played.png"
import wikipediaImage from "../assets/img/tryasport/wikipedia.png"

// Styles
import "../styles/Home.scss";

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: 'yellow',
    margin: 0,
    padding:0
  },
  mainTitle:{
    backgroundColor: 'orange',
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  content: {
    marginTop: 20,
    padding:0
  },
  title:{
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#3498DB',
    textAlign: 'center',
    fontSize: '20px',
  },
  titlePosition: {
    position: 'absolute', 
    width:'45%', 
    top: 30, 
    margin: 'auto', 
    left: 0, 
    right: 0,
    zIndex: 200
  },
  link:{
    backgroundColor: 'grey', 
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkPosition:{
    position: 'absolute', 
    height: "15%",
    width: "35%", 
    bottom: -20,
    margin: 'auto', 
    left: '0', 
    right: '0',
    zIndex: 200
  },
  linkText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold'
  },
  iconContainer:{
    marginTop: 50
  },
  icon: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconButton: {
    borderRadius:'50%', 
    backgroundColor: 'red', 
    margin: 24
  }
});

class IconMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, image, mt, onClick } = this.props;

    return (
      <div>
        <Box mt={mt} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  
            borderRadius="50%" onClick={onClick}>
            <img width="100%" height="100%" src={image}></img>  
        </Box>
        <p>{text}</p>
      </div>
    )
  }
}


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selected: 0
    };
  }

  handleClick(e){
    e.preventDefault();
    console.log('The link was clicked.');
    /*
    let selected = this.state.selected + 1;
    let open = false;
    if( selected % 4 == 0){
      selected = 1;
      open = true;
    }
    this.setState({selected: selected, open: open})
    /**/
    this.setState({open: true})
  }

  handleClose(){
    console.log('The link was closed')
    this.setState({open: false})
  };

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="sm" style={{backgroundColor:'#E5E7E9', height: '100vh', padding: 0}}>
        <CssBaseline />
        <Box m={0} p ={0} className={classes.mainTitle}>
            <b>Sport - Planner</b>
            <div style={{fontSize: 14}}>Find New Sport</div>
        </Box>

        <Container maxWidth={false} style={{paddingTop: 20}}>

          <Box mt={2} ml={3} mr={3} borderRadius={16} style={{position: 'relative'}}>
            <Box borderRadius={16} className={classNames(classes.title, classes.titlePosition)}>
              Basketball
            </Box>

            <AwesomeSlider cssModule={AwsSliderStyles} bullets={false} 
                        organicArrows={false} 
                        selected={this.state.selected}
                        className={"aws-btn"}>
              <div data-src="https://3.121.215.237/media/fixture/picture_salsa.jpg" />
              <div data-src="https://3.121.215.237/media/fixture/picture_hurdles.jpg" />
              <div data-src="https://3.121.215.237/media/fixture/picture_finswimming.jpg" />
            </AwesomeSlider>

            <Box ml={20} mr={20} mt={0} mb={0} className={classNames(classes.link, classes.linkPosition)}>
              <img height="100%" src={wikipediaImage} style={{borderRadius: '10px'}}></img>
              <p className={classes.linkText}>More Info</p>
            </Box>
          </Box>


          <Grid container spacing={3} className={classNames(classes.iconContainer)}>
            <Grid item xs className={classNames(classes.icon)}>
              <IconMenu mt={2} text="Undo" image={undoImage} onClick={(e) => this.handleClick(e)}></IconMenu>
            </Grid>
            <Grid item xs className={classNames(classes.icon)}>
              <IconMenu mt={6} text="No Interest" image={noInterestImage} onClick={(e) => this.handleClick(e)}></IconMenu>
            </Grid>
            <Grid item xs className={classNames(classes.icon)}>
              <IconMenu mt={6} text="Like To Try" image={likeToTryImage} onClick={(e) => this.handleClick(e)}></IconMenu>
            </Grid>
            <Grid item xs className={classNames(classes.icon)}>
              <IconMenu mt={2} text="Play Already" image={alreadyPlayedImage} onClick={(e) => this.handleClick(e)}></IconMenu>
            </Grid>
          </Grid>            


          <FriendDialog open={this.state.open} onClose={(e) => this.handleClose()} />
        </Container>
      </Container>
    );
  }
}
export default withStyles(styles)(Home);
