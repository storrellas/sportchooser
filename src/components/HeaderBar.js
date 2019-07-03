import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import logo from "../assets/img/logo.png"


const styles = theme => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none'
  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
    color: 'grey'
  },
  homeButton: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
    justifyContent: 'flex-start'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
    justifyContent: 'flex-end'
  },
});

class HeaderBar extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <AppBar elevation={0} position="static">
        <Toolbar className={classes.menuContainer}>
          <IconButton className={classes.homeButton} edge="start" color="inherit" aria-label="Menu">
            <img  src={logo}></img>
          </IconButton>
          <Button color="inherit">Courses</Button>
          <Button color="inherit">Teachers</Button>
          <Button color="inherit">Blog</Button>
          <Button color="inherit">Explore</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}


export default withStyles(styles)(HeaderBar);