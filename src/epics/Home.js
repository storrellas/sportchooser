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
    fontSize: '20px'
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
      <div style={{backgroundColor:'#E5E7E9'}}>
        <CssBaseline />

        <Box mt={2} ml={3} mr={3} borderRadius={16}>
          <Box ml={6} mr={6} borderRadius={16} className={classNames(classes.title)}>Basketball</Box>
          <img width="100%" src={sportImage} style={{borderRadius: '10px'}}></img>
          <Box ml={20} mr={20} mt={0} mb={0} style={{backgroundColor: 'yellow', borderRadius: '10px'}}>
            <img height="50px" src={wikipediaImage} style={{borderRadius: '10px'}}></img>
            <span>More Info</span>
          </Box>
        </Box>

        <Box mt={5} ml={3} mr={3} borderRadius={16}>
          <Grid container spacing={3}  >
            <Grid item xs>
              <Box mt={2} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  borderRadius="50%">
                <img width="100%" height="100%" src={undoImage}></img>
                <p>Undo</p>
              </Box>
            </Grid>
            <Grid item xs>
              <Box mt={2} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  borderRadius="50%">
                <img width="100%" height="100%" src={noInterestImage}></img>
                <p>No interest</p>
              </Box>
            </Grid>
            <Grid item xs>
              <Box mt={2} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  borderRadius="50%">
                <img width="100%" height="100%" src={likeToTryImage}></img>
                <p>Like to try</p>
              </Box>
            </Grid>
            <Grid item xs>
              <Box mt={2} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  borderRadius="50%">
                <img width="100%" height="100%" src={alreadyPlayedImage} style={{borderRadius: '50%'}}></img>
                <p>Play<br></br>Already</p>
              </Box>
            </Grid>
          </Grid>            
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
