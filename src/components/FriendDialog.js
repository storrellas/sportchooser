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


// Project import
import friendsImage from "../assets/img/friends.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"
import FriendCard from "./FriendCard"

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
  }
});

class FriendDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      friend: '',
      friendJson: undefined,
      defaultFriendJson: {
        first_name : 'Not Found',
        last_name : '',
        picture: "/media/default/placeholder_user.jpg",
        sports: []
      }
    }
  }

  handleKeyPress(){
    if(event.key === 'Enter'){
      this.handleSearch()

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
    // Closing modal
    this.props.onClose()
  }

  async handleSearch(e){
    console.log("Contacting Backend for search", this.state.friend)
    // Closing modal
    //this.props.onClose()

    try{

      const username = this.state.friend
      const response = await fetch( `${config.BASE_API_URL}/api/user/lookup/?username=${username}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
        }        
      })
      if (!response.ok) throw Error(response.statusText);    
      const data = await response.json()

      console.log("SetState", data)
      this.setState({ friendJson: data })
    }catch(e){
      console.log("Second")
      console.log("SetStateDefault", e)
      this.setState({ friendJson: this.state.defaultFriendJson })
    }
  }

  async handleAddFriend(e){
    console.log("Adding friend", this)

    
    const body = { user: this.props.userId, friend: this.state.friendJson.id }
    const response = await fetch( `${config.BASE_API_URL}/api/friend/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()

    // Close dialog
    this.props.onClose()
  }

  render() {
    const { classes, onClose, sportDict, open } = this.props;
    // console.log("-- FriendDialog --")
    // console.log(this.state.friendJson)
    let friendSearch = <div></div>
    if( this.state.friendJson !== undefined )
      friendSearch = <FriendCard sportDict={sportDict}
                                 friend={this.state.friendJson} 
                                 handleAddFriend={(e) => this.handleAddFriend(e)}/>

    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" open={open}>
        <canvas id="my-canvas" width={200} height={200} style={{ position:'absolute', backgroundColor: 'transparent', zIndex: this.state.zIndex }}></canvas>


        <img height="15%" src={friendsImage} 
            style={{borderRadius: '10px', position: 'absolute', 
                    top: -30, margin: 'auto', left: 0, right: 0}}>
        </img>
        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
            Enter your friends codes to find out if your 
            friends want to try the same new sports
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
                    onClick={(e) => this.handleSearch(e)}
                  >
                    <PlayArrowIcon style={{color:'green'}}></PlayArrowIcon>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
          {friendSearch}
        </Box>


        {/* <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
          <Button variant="contained" className={classes.button} onClick={(e) => this.handleSubmit(e)}>
            <div style={{flexGrow: 1}}>OK</div>
          </Button>
        </Box> */}

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

export default withStyles(styles)(FriendDialog);

