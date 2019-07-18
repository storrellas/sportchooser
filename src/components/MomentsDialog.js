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
    },
    cursor: 'pointer'
  },
  cellEnable:{
    margin: 10,
    backgroundColor: 'orange',
    width: "12%",
    transition: "0.3s",
    borderRadius: 3,
    '&:hover': {
      backgroundColor: 'grey'
    },
    cursor: 'pointer'
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

class MomentsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      moment_list: [
        {
          slot: 'between_10_12',
          weekday: 'tuesday'
        },
        {
          slot: 'before_6_am',
          weekday: 'tuesday'
        },
        {
          slot: 'between_14_16',
          weekday: 'friday'
        }
      ]
    }
  }

  handleClick(e, weekday, moment){
    console.log("HandleClick", weekday, moment)
  }

  handleSubmit(e){
    console.log("Contacting Backend", this.state.friend)
    // Closing modal
    this.props.onClose()
  }

  generate_row = (classes, weekday_array, title, slot) =>  <tr>
                                                              <td>{title}</td>
                                                              {weekday_array.map((item, index) =>
                                                                <td key={index} className={item.active?this.props.classes.cellEnable:this.props.classes.cell} 
                                                                  onClick={(e) => this.handleClick(e, item.day, slot)} />)}
                                                            </tr>
  

  render() {
    const { classes, onClose, ...other } = this.props;
    const { moments } = this.state
    const header_array = Array.from(' MTWTFSS')
    const weekday_array = [{day:'monday', active: false}, {day:'tuesday', active: false}, 
                            {day:'wednesday', active: false}, {day:'thursday', active: false}, 
                            {day:'friday', active: false}, {day:'saturday', active: false}, {day:'sunday', active: false}]


    const weekday_before_0_6_array = [...weekday_array]
    weekday_before_0_6_array[0].active = true
    weekday_before_0_6_array[2].active = true


    const row_before_0_6 = this.generate_row(classes, weekday_before_0_6_array, '00-06', 'before_6_am')
    const row_between_6_8 = this.generate_row(classes, weekday_array, '06-08', 'between_6_8')
    const row_between_8_10 = this.generate_row(classes, weekday_array, '08-10', 'between_8_10')
    const row_between_10_12 = this.generate_row(classes, weekday_array, '10-12', 'between_10_12')
    const row_between_12_14 = this.generate_row(classes, weekday_array, '12-14', 'between_12_14')
    const row_between_14_16 = this.generate_row(classes, weekday_array, '14-16', 'between_14_16')
    const row_between_16_18 = this.generate_row(classes, weekday_array, '16-18', 'between_16_18')
    const row_between_18_20 = this.generate_row(classes, weekday_array, '18-20', 'between_18_20')
    const row_between_20_22 = this.generate_row(classes, weekday_array, '20-22', 'between_20_22')
    const row_between_22_00 = this.generate_row(classes, weekday_array, '22-00', 'between_22_00')
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
                {header_array.map((item,index) => 
                  <th key={index}>{item}</th>)}
              </tr>
            </thead>
            <tbody>
            {row_before_0_6}
            {row_between_6_8}
            {row_between_8_10}
            {row_between_10_12}
            {row_between_12_14}
            {row_between_14_16}
            {row_between_16_18}
            {row_between_18_20}
            {row_between_20_22}
            {row_between_22_00}
            </tbody>
          </table>

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

export default withStyles(styles)(MomentsDialog);

