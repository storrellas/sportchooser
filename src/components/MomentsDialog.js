import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


// Project import
import calendarImage from "../assets/img/tryasport/img_calendar_orange.png"

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
  cell:{
    margin: 10,
    backgroundColor: 'grey',
    width: "12%",
    transition: "0.3s",
    borderRadius: 3,
    '&:hover': {
      backgroundColor: 'orange'
    }
  }
});

class MomentsDialog extends React.Component {
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


        <img height="15%" src={calendarImage} 
            style={{borderRadius: '10px', position: 'absolute', 
                    top: -30, margin: 'auto', left: 0, right: 0}}>
        </img>
        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
          <div>By adding your regular moments to do sports to your profile,
          we can inform your options to try out your selected sports at a time that
          is most likely to fit your schedule</div>
          <i>Click on a time to select/cancel</i>
        </DialogTitle>

        <Box mt={2} ml={3} mr={3} borderRadius={16}>

          <table style={{width:"100%"}}>
            <thead>
              <tr>
                {['', 'M', 'T', 'W', 'T', 'F', 'S', 'S'].map((item,index) => 
                  <th key={index}>{item}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00-06</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>06-08</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>00-06</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>08-10</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>10-12</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>12-14</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>14-16</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>16-18</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>18-20</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>20-22</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>
              <tr>
                <td>22-00</td>
                {Array.from('1234567').map((item, index) => <td key={index} className={classes.cell}></td>)}
              </tr>

            </tbody>
          </table>

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

export default withStyles(styles)(MomentsDialog);

