import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


// Project import
import mailboxImage from "../assets/img/tryasport/img_mailbox_orange.png"

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

class EmailDialog extends React.Component {
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
    const { classes, onClose, ...other } = this.props;
    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" {...other}>
        <canvas id="my-canvas" width={200} height={200} style={{ position:'absolute', backgroundColor: 'transparent', zIndex: this.state.zIndex }}></canvas>


        <img height="15%" src={mailboxImage} 
            style={{borderRadius: '10px', position: 'absolute', 
                    top: -30, margin: 'auto', left: 0, right: 0}}>
        </img>
        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="email-dialog-title" style={{textAlign: "center", marginTop: 80}}>
          <p>By adding your mail to your profile, we can inform you 
          of options to try out your selected sports.</p>
          <p>Enter your email:</p>
        </DialogTitle>

        <Box mt={0} ml={3} mr={3} borderRadius={16}>
          <TextField
            id="outlined-email-input"
            label="Enter your email"
            className={classes.textField}
            type="text"
            name="mail"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            style={{width: "100%"}}
            onKeyPress={(e) => this.handleKeyPress(e)}
          />
            <TextField
            id="outlined-email-confirm-input"
            label="Confirm your email"
            className={classes.textField}
            type="text"
            name="confirm"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            style={{width: "100%"}}
            onKeyPress={(e) => this.handleKeyPress(e)}
          />
        </Box>

        <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
          <Button variant="contained" className={classes.button}>
            <div style={{flexGrow: 1}}>OK</div>
          </Button>
        </Box>

        <DialogTitle id="bottom-dialog-title" style={{textAlign: "center"}}>
          <p>and use the link in your inbox to continue from last time.</p>
        </DialogTitle>

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

export default withStyles(styles)(EmailDialog);
