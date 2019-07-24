import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

import RowingIcon from '@material-ui/icons/Rowing';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import WCIcon from '@material-ui/icons/Wc';
import ShareIcon from '@material-ui/icons/Share';
import PersonIcon from '@material-ui/icons/Person';

import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


// Project import
import settingsImage from "../assets/img/tryasport/img_settings.png"

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
    width: '100%', 
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: 'orange',
    '&:hover':{
      backgroundColor: '#E67E22'
    }
  }
});

class SettingsItem extends React.Component {
  constructor(props) {super(props);}

  render() {
    const { classes, text, onClick } = this.props;
    return (
      <Box mt={2} >
        <Button variant="contained" className={classes.button}>
          {this.props.children}          
          <div style={{flexGrow: 1}}>{text}</div>              
        </Button>
      </Box>
    )
  }
}
const SettingsItemStyled = withStyles(styles)(SettingsItem)

class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000
    }
  }

  handleClose() {
    //onClose(selectedValue);
  }

  handleListItemClick(value) {
    onClose(value);
  }

  handleKeyPress(){
    console.log('The link was closed')  
    if(event.key === 'Enter'){
      console.log('enter press here! ')

      // Launch confetti
      store.dispatch( renderConfetti(true) )
      setTimeout(() => { store.dispatch( renderConfetti(false) ) }, 3000);
    }  
  };

  

  render() {
    const { classes, onClose, user, ...other } = this.props;
    const userJson = (user === undefined)?"":JSON.parse(user);
    //console.log(userJson)
    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" {...other}>
        <canvas id="my-canvas" width={200} height={200} style={{ position:'absolute', backgroundColor: 'transparent', zIndex: this.state.zIndex }}></canvas>


        <img height="15%" src={settingsImage} 
            style={{borderRadius: '10px', position: 'absolute', 
                    top: -30, margin: 'auto', left: 0, right: 0}}>
        </img>
        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
          Menu
        </DialogTitle>

        <Box mt={2} ml={3} mr={3} borderRadius={16}>
          {/* <Button variant="contained" color="secondary" className={classes.button}>
            <DeleteIcon />
            <div style={{flexGrow: 1}}>Delete</div>              
          </Button> */}
          <SettingsItemStyled text="Login">
            <VpnKeyIcon style={{backgroundColor: '#117A65'}}/>
          </SettingsItemStyled>
          <SettingsItemStyled text="Sports">
            <RowingIcon style={{backgroundColor: '#117A65'}}/>
          </SettingsItemStyled>
          <SettingsItemStyled text="Friends">
            <WCIcon  style={{backgroundColor: '#117A65'}}/>
          </SettingsItemStyled>
          <SettingsItemStyled text="Share">
            <ShareIcon  style={{backgroundColor: '#117A65'}}/>
          </SettingsItemStyled>
          <SettingsItemStyled text="Profile">
            <PersonIcon  style={{backgroundColor: '#117A65'}}/>
          </SettingsItemStyled>
          
          <h3>User Profile</h3>
          <div>Username:{userJson.username}</div>
          <div>Email:{userJson.email}</div>
          <div>Gender:{userJson.gender}</div>
          <div>Location:{userJson.work_location}</div>
          <div>Birthyear:{userJson.birthday_year}</div>

          <div>{user}</div>

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

export default withStyles(styles)(SettingsDialog);

