import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


// Project import
import locationImage from "../assets/img/tryasport/img_map_orange.png"

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
});

class LocationDialog extends React.Component {
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


        <img height="15%" src={locationImage} 
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
            id="outlined-email-input"
            label="Friend Code"
            className={classes.textField}
            type="text"
            name="code"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            style={{width: "100%"}}

            onKeyPress={(e) => this.handleKeyPress(e)}
          />
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

export default withStyles(styles)(LocationDialog);

