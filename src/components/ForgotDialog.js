import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

// Project import
import SubmitButton from "./common/SubmitButton"
import TryASportDialog from "./common/TryASportDialog"
import forgotImage from "../assets/img/tryasport/img_key_orange.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"


// Redux
import { store, userProfile } from "../redux";
import { connect } from "react-redux";

const styles = theme => ({
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
      <TryASportDialog image={forgotImage} open={open} onClose={onClose}>

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

          <SubmitButton onSubmit={(e) => this.handleSubmit(e)}/>

          <DialogTitle id="bottom-dialog-title" style={{textAlign: "center"}}>
            <p>and use the link in your inbox to continue from last time.</p>
          </DialogTitle>
      </TryASportDialog>
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



