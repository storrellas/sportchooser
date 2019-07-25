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
import MenuItem from '@material-ui/core/MenuItem';



// Project import
import cakeImage from "../assets/img/tryasport/img_cake_orange.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

// Redux
import { store, userProfile } from "../redux";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    userProfile: (data) => dispatch(userProfile(data)),
  };
}

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

class BirthyearDialog extends React.Component {
  constructor(props) {
    super(props);
    this.year_choice = 
      Array(new Date().getFullYear() - 1900 + 1).fill().map((_, idx) => ({value:(1900 + idx), label:(1900+idx)})  )
    this.state = {
      zIndex: 1000,
      birthyear: this.year_choice[0].value
    }
  }


  async handleSubmit(){
    const url = `${config.BASE_API_URL}/api/user/${this.props.userId}/`
    const body = { birthyear: parseInt(this.state.birthyear) }
    let response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      },
      method: 'put',
      body: JSON.stringify(body)
    })
    let data = await response.json()

    // Notify watchers
    this.props.userProfile(data)
    this.props.onClose()
  }

  handleChange(e){
    this.setState({ birthyear: e.target.value })
  }

  render() {
    const { classes, onClose, open } = this.props;

    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" open={open}>

        <img height="15%" src={cakeImage} 
            style={{borderRadius: '10px', position: 'absolute', 
                    top: -30, margin: 'auto', left: 0, right: 0}}>
        </img>
        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
          What's your birthday year?
        </DialogTitle>

        <Box mt={2} ml={3} mr={3} borderRadius={16}  style={{display:'flex', justifyContent: 'center'}}>
          <TextField
            id="birthyear"
            select
            label="Select"
            className={classes.textField}
            style={{width: "50%"}}
            value={this.state.birthyear}
            onChange={(e) => this.handleChange(e)}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your birthyear"
            margin="normal"
            inputProps={{
              style: { textAlign: "right" }
            }}
          >
            {this.year_choice.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </Box>

        <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
          <Button variant="contained" className={classes.button} onClick={(e) => this.handleSubmit(e)}>
            <div style={{flexGrow: 1}}>OK</div>
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

//export default withStyles(styles)(BirthyearDialog);
export default connect(null, mapDispatchToProps)(withStyles(styles)(BirthyearDialog));


