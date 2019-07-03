import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import logo_min from '../assets/img/logo_min.png'

const styles = theme => ({
  content: {
    marginTop: 20,
  },
  submenu: {
    marginTop: 0,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

class FooterSubmenu extends React.Component{
  render(){
    return (
      <List>
        <ListItem button>
            <ListItemText
              disableTypography
              primary={<strong>{this.props.title}</strong>}/>              
        </ListItem>
        {this.props.list.map((item) => 
          <ListItem button key={item} >
            <ListItemText primary={item} />
          </ListItem>
        )}
      </List>  
    )
  }
}


class FooterMenu extends React.Component {
  state = {};


  render() {
    const { classes } = this.props;
    const courses_list = ['biology', 'chemistry', 'physics', 'maths']
    const resources_list = ['blog', 'student-faq', 'teacher-faq']
    const social_list = ['twitter', 'instagram', 'facebook']
    const company_list = ['about', 'community']

    return (
      <Grid container className={classNames(classes.submenu, classes.footer)} padding={2} spacing={3}>
        <Grid item xs={3}>
          <FooterSubmenu title="courses" list={courses_list} />
        </Grid>
        <Grid item xs={3}>
          <FooterSubmenu title="resources" list={resources_list} />
        </Grid>
        <Grid item xs={3}>
          <FooterSubmenu title="social" list={social_list} />
        </Grid>
        <Grid item xs={3}>
          <FooterSubmenu title="company" list={company_list} />
        </Grid>

      </Grid>
    );
  }
}


class Footer extends React.Component {
  state = {};


  render() {
    const { classes } = this.props;


    return (
      <Grid container className={classNames(classes.content, classes.footer)} padding={2} spacing={3}>
        <Grid item xs={2} >
        

          <Grid container className={classNames(classes.submenu, classes.footer)} padding={2} spacing={3}>
            <Grid item xs={12} margin={2}>
              <img  src={logo_min}></img>
              <p>2019 Studeo</p>
              <p>Terms & Privacy</p>
            </Grid>
          </Grid>


 
        </Grid>
        <Grid item xs={10} >
          <FooterMenu classes={classes}/>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Footer);