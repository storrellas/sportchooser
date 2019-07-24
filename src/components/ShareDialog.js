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
import shareImage from "../assets/img/share.png"

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

class ShareDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      friend: ''
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
    // Closing modal
    this.props.onClose()
  }

  render() {
    const { classes, onClose, open, user } = this.props;
    const userJson = (user === undefined)?"":JSON.parse(user);
    const username = (userJson==="")?"":userJson.username;
    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" open={open}>
        <canvas id="my-canvas" width={200} height={200} style={{ position:'absolute', backgroundColor: 'transparent', zIndex: this.state.zIndex }}></canvas>


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

        <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
          <Button variant="contained" className={classes.button} onClick={(e) => this.handleSubmit(e)}>
            <div style={{flexGrow: 1}}>{username}</div>
          </Button>
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
