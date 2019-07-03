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

import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';


import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// Project imports
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';

import titleSide from "../img/title_side.png"
import titleImage from "../img/title_image.png"

import learnIcon from "../img/learn_icon.png"
import learnImage from "../img/learn_image.png"

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    backgroundColor: 'white',
    padding:0
  },
  content: {
    marginTop: 20,
    padding:0
  },
  title: {
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: '#5065FF'
  },
  learn: {
    display: 'flex',
    flexDirection: 'row'
  },
  landingText : {
    fontWeight: 'bold',
    color: '#3F424D'
  },
  landingTextColor: {
    color: '#5065FF'
  },
  learnImage: {
    display: 'flex',
    flexDirection: 'column',
    alignElements: 'flex-end',
    justifyContent: 'flex-end'
  }
});

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Container className={classes.container} maxWidthSm>

          <CssBaseline />
          <HeaderBar/>
  
          {/* Title Section */}
          <Container maxWidth={false} width="100%" className={classNames(classes.content, classes.title)}>
            <img src={titleSide}></img>
            <div style={{ flexGrow: 1, padding: 40 }}>
              <Typography className={classNames(classes.landingText)} variant="h3" gutterBottom>
                The smart way to
              </Typography>
              <Typography className={classNames(classes.landingText, classes.landingTextColor)} variant="h3" gutterBottom>
                learn Science
              </Typography>
              <Typography className={classNames(classes.landingText)} variant="h6" gutterBottom>
                Lorem ipsum dolor sit amet, concect <br></br>
                adispicing elit lorem ipsum
              </Typography>
              <Button variant="contained" color="primary" className={classes.button}>
                Sign Up
              </Button>
            </div>
            <div>
              <img src={titleImage}></img>
            </div>
          </Container>

          {/* Title Section */}
          <Container maxWidth={false} width="100%" className={classNames(classes.content, classes.learn)}>
          <div style={{ flexGrow: 1, padding: 40 }}>
              <Typography className={classNames(classes.landingText, classes.landingTextColor)} variant="h6" gutterBottom>
              <img src={learnIcon}></img> Learn
              </Typography>
              <Typography className={classNames(classes.landingText)} variant="h3" gutterBottom>
                What you can get with
              </Typography>
              <Typography className={classNames(classes.landingText)} variant="h3" gutterBottom>
                the Studeo platform
              </Typography>
              <Typography className={classNames(classes.landingText)} variant="h6" gutterBottom>
                Lorem ipsum dolor sit amet, concect <br></br>
                adispicing elit lorem ipsum
              </Typography>
              <Typography className={classNames(classes.landingText, classes.landingTextColor)} variant="h6" gutterBottom>
                Try it now ->
              </Typography>
            </div>
            <div className={classNames(classes.learnImage)} >
              <img src={learnImage}></img>
            </div>
          </Container>

          <Footer className={classNames(classes.content)}/>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Landing);
