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
import forgotImage from "../assets/img/tryasport/img_key_orange.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"


// Redux
import { store, userProfile } from "../redux";
import { connect } from "react-redux";

const styles = theme => ({
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

function mapDispatchToProps(dispatch) {
  return {
    userProfile: (data) => dispatch(userProfile(data)),
  };
}

class ForgotDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      email: '',
      error: false,
      helperText: ''
    }
  }

  handleChange(e){
    this.setState({ email: e.target.value})
  };


  async handleSubmit(e){
    e.preventDefault();

    const url = `${config.BASE_API_URL}/api/user/forgot/`
    const body = { email: this.state.email }
    let response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      },
      method: 'post',
      body: JSON.stringify(body)
    })
    let data = await response.json()

    this.props.onClose()
  }

  render() {

    const { classes, onClose, open } = this.props;
    const { error, helperText } = this.state;
    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" open={open}>

        <img height="15%" src={forgotImage} 
            style={{borderRadius: '10px', position: 'absolute', 
                    top: -30, margin: 'auto', left: 0, right: 0}}>
        </img>
        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="email-dialog-title" style={{textAlign: "center", marginTop: 80}}>
          <p>Did you see the language selection again? Don't worry!</p>
          <div>If you entered your email last time you can continue finding sports</div>
          <div>Enter your email:</div>
        </DialogTitle>

        <Box mt={0} ml={3} mr={3} borderRadius={16}>
          <TextField          
            id="email-input"
            label="Enter your email"
            className={classes.textField}
            type="text"
            name="mail"
            autoComplete="email"
            margin="normal"
            variant="outlined"
            style={{width: "100%"}}
            onChange={(e) => this.handleChange(e)}
            value={this.state.email}
          />
        </Box>

        <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
          <Button variant="contained" className={classes.button} onClick={(e) => this.handleSubmit(e)}>
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

//export default withStyles(styles)(EmailDialog);
export default connect(null, mapDispatchToProps)(withStyles(styles)(ForgotDialog));



