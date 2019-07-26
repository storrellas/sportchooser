import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import InputAdornment from '@material-ui/core/InputAdornment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

// Project import
import shareImage from "../assets/img/share.png"
import config from '../config/env'

// Redux
import { store, renderConfetti } from "../redux";

const styles = theme => ({
  avatar: {
    backgroundColor: 'red',
    color: 'blue',
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    position: 'relative',
    overflowY: 'initial'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  button:{
    width: '75%', 
    display: 'flex',
    borderRadius:'100px', 
    justifyContent: 'center',
    backgroundColor: '#00CA9D',
    color: 'white',
    '&:hover':{
      backgroundColor: '#005643'
    }
  },
  code:{
    width: '75%', 
    color: '#00CA9D',  
    backgroundColor: '#D3FFF5', 
    padding: '0.5em', 
    border: '2px solid #00CA9D', 
    borderStyle: 'dashed', 
    fontSize: '24px'
  },
  error:{
    width: '75%', 
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FF6D6D',
    border: '2px solid #FF2424', 
    borderStyle: 'dashed', 
    color: 'white',
    '&:hover':{
      backgroundColor: '#FF6D6D',
    }
  }
});

class ShareDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      friend: '',
      webSharing: true
    }
  }

  handleKeyPress(){
    if(event.key === 'Enter'){
      this.handleSubmit()

      // // Launch confetti
      // store.dispatch( renderConfetti(true) )
      // setTimeout(() => { store.dispatch( renderConfetti(false) ) }, 3000);
    }  
  };

  handleChange(e){
    this.setState({ friend: e.target.value})
  }

  handleSubmit(e){
    console.log("Contacting Backend", this.state.friend)

    if (navigator.share) {
      const userJson = (user === undefined)?"":JSON.parse(user);
      const title = `Do you like to find new sports to play?` + 
                    `Find me on TryASport by introducing this code${userJson.username}`
      navigator.share({
        title: title,
        url: config.BASE_API_URL
      }).then(() => {
        console.log('Thanks for sharing!');
      })
      .catch(console.error);
    } else {
      console.log("Web Share not supported")
      this.setState({webSharing: false})
    }
    // Closing modal
    //this.props.onClose()

    //this.setState({webSharing: false})
  }

  render() {
    const { classes, onClose, open, user } = this.props;
    const userJson = (user === undefined)?"":JSON.parse(user);
    const username = (userJson==="")?"":userJson.username;

    const error = <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
                    <Button variant="contained" className={classes.error} onClick={(e) => this.setState({webSharing: true})}>
                      <div style={{flexGrow: 1}}>WebSharing not allowed</div>
                    </Button>
                  </Box>
    const errorRender = (this.state.webSharing==true)?"":error;

    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" open={open}>

        <img height="15%" src={shareImage} 
            style={{borderRadius: '10px', position: 'absolute', 
                    top: -30, margin: 'auto', left: 0, right: 0}}>
        </img>
        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
            <b>Share!</b>
            <div>Share your code with friends, so they can see 
              if you want to try the same new sports</div>
        </DialogTitle>

        <Box mt={2} ml={3} mr={3} borderRadius={16}>
        <TextField
            id="outlined-friend-input"
            label="Enter your friend code"
            className={classes.textField}
            type="text"
            name="code"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            style={{width: "100%"}}
            onKeyPress={(e) => this.handleKeyPress(e)}
            onChange={(e) => this.handleChange(e)}
            value={this.state.friend}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="Toggle password visibility"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    <PlayArrowIcon style={{color:'green'}}></PlayArrowIcon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {errorRender}

        <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
          <Button variant="contained" className={classes.button} onClick={(e) => this.handleSubmit(e)}>
            <div style={{flexGrow: 1}}>Share</div>
          </Button>
        </Box>

        <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
          <Box mt={2} className={classes.code}>
            <div style={{flexGrow: 1, textAlign: 'center'}}>{username}</div>
          </Box>
        </Box>
 


      </Dialog>
    );
  }
}

/*
FriendDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};
/**/

export default withStyles(styles)(ShareDialog);

