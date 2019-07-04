import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { shadows } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Box from '@material-ui/core/Box';


import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';



// Project imports
import sportImage from "../assets/img/tryasport/basket.jpg"
import undoImage from "../assets/img/tryasport/undo.png"
import noInterestImage from "../assets/img/tryasport/no_interest.png"
import likeToTryImage from "../assets/img/tryasport/like_to_try.png"
import alreadyPlayedImage from "../assets/img/tryasport/already_played.png"
import wikipediaImage from "../assets/img/tryasport/wikipedia.png"


const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    backgroundColor: 'yellow',
    margin: 0,
    padding:0
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
    width:'200px', 
    top: 30, 
    margin: 'auto', 
    left: 0, 
    right: 0
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
    right: '0'
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
  }  
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth={false} style={{backgroundColor:'#E5E7E9', height: '100vh'}}>
        <CssBaseline />

        <Box mt={2} ml={3} mr={3} borderRadius={16} style={{backgroundColor: 'red', position: 'relative'}}>
          <Box borderRadius={16} className={classNames(classes.title, classes.titlePosition)}>
            Basketball
          </Box>
          <img width="100%" src={sportImage} style={{borderRadius: '10px'}} ></img>
          <Box ml={20} mr={20} mt={0} mb={0} className={classNames(classes.link, classes.linkPosition)}>
            <img height="100%" src={wikipediaImage} style={{borderRadius: '10px'}}></img>
            <p className={classes.linkText}>More Info</p>
          </Box>
        </Box>

        <Grid container spacing={3} className={classNames(classes.iconContainer)}>
          <Grid item xs className={classNames(classes.icon)}>
            <Box mt={2} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  borderRadius="50%">
              <img width="100%" height="100%" src={undoImage}></img>
            </Box>
            <p>Undo</p>
          </Grid>
          <Grid item xs className={classNames(classes.icon)}>
            <Box mt={6} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  borderRadius="50%">
              <img width="100%" height="100%" src={noInterestImage}></img>
            </Box>
            <p>No interest</p>
          </Grid>
          <Grid item xs className={classNames(classes.icon)}>
            <Box mt={6} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  borderRadius="50%">
              <img width="100%" height="100%" src={likeToTryImage}></img>
            </Box>
            <p>Like to try</p>
          </Grid>
          <Grid item xs className={classNames(classes.icon)}>
            <Box mt={2} ml={3} mr={3} p={1} style={{backgroundColor:'white'}} borderRadius="50%">
              <img width="100%" height="100%" src={alreadyPlayedImage} style={{borderRadius: '50%'}}></img>
            </Box>
            <p>Play Already</p>

          </Grid>
        </Grid>            
        <Box mt={5} ml={3} mr={3}>
        </Box>
      </Container>
    );
  }
}
export default withStyles(styles)(Home);
