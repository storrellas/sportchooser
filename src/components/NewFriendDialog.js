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
import Typography from '@material-ui/core/Typography';


// Project import
import friendsImage from "../assets/img/friends.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"
import FriendCard from "./FriendCard"

// Redux
import { store, renderConfetti } from "../redux";
import { connect } from "react-redux";


const styles = theme => ({
  avatar: {
    backgroundColor: 'red',
    color: 'blue',
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    position: 'relative',
    overflowY: 'initial',
    backgroundImage: "linear-gradient(203deg, #BEBEBE 0%, #FFFFFF 100%)",
    border: "5px solid #F76D1D"
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

function mapDispatchToProps(dispatch) {
  return {
    renderConfetti: enabled => dispatch(renderConfetti(enabled))
  };
}

class NewFriendDialog extends React.Component {
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

  componentDidMount(){
    if(this.props.open){
      this.props.renderConfetti(true)
      setTimeout(() => { this.props.renderConfetti(false) }, 3000);
    }
  }

  componentDidUpdate(){
    if(this.props.open){
      this.props.renderConfetti(true)
      setTimeout(() => { this.props.renderConfetti(false) }, 3000);
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

      // NOTE: This causes to display friend list
      //this.setState({ friendJson: data })      
      this.props.onCloseAddFriend(data)
    }catch(e){
      // NOTE: This causes to display friend list
      //this.setState({ friendJson: this.state.defaultFriendJson })
      this.props.onCloseAddFriend()
    }
  }

  async handleAddFriend(e){
    
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
    // console.log("-- NewFriendDialog --")


    const picture = `${config.BASE_API_URL}/media/default/girl.jpg`
    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" open={open}>

        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
          <b>New Friend</b>
        </DialogTitle>

        <Box style={{ display:'flex', width:"100%", height: "5em"}}>
            <img height="100%" src={picture} />
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              Carla
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              Mitja
            </Typography>
          </Box>

        <Box mt={2} ml={3} mr={3} borderRadius={16}>

          <Box mt={2} ml={3} mr={3} borderRadius={16}>
            Picture - Marti Valencia
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

//export default withStyles(styles)(NewFriendDialog);
export default connect(null, mapDispatchToProps)(withStyles(styles)(NewFriendDialog));

