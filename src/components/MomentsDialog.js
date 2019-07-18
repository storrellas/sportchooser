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
      backgroundColor: 'orange',
      border: '1px solid black'
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
      backgroundColor: 'grey',
      border: '1px solid black'
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
          slot: 'before_6',
          weekday: 'tuesday'
        },
        {
          slot: 'between_14_16',
          weekday: 'friday'
        }
      ]
    }

    this.weekday2idx = {
      monday:0, tuesday:1, wednesday:2, 
      thursday:3, friday: 4, saturday:5, sunday:6
    }
  }

  handleClick(e, slot, weekday, enabled){
    let { moment_list } = this.state;
    if( enabled ){
      moment_list.push({slot: slot, weekday: weekday})
      this.setState({moment_list: moment_list})
    }else{
      const idx = moment_list.findIndex( item => (item.slot === slot && item.weekday === weekday) )
      moment_list.splice(idx, 1)
      this.setState({moment_list: moment_list})
    }
  }

  handleSubmit(e){
    console.log("Contacting Backend", this.state.moment_list)
    // Closing modal
    this.props.onClose()
  }

  generate_row = (array, title, slot) =>  <tr>
                                            <td>{title}</td>
                                            {array.map((item, index) =>
                                              <td key={index} className={item.active?this.props.classes.cellEnable:this.props.classes.cell} 
                                                onClick={(e) => this.handleClick(e, slot, item.weekday, (item.active?false:true) )} />)}
                                          </tr>

  generated_weekday_selected_list(pattern){
    // Generate plain array in form [true, false, true, false, false ...]
    let weekday_selected_list = Array(7).fill(false)
    for (const moment of this.state.moment_list) {
      if( moment.slot == pattern ){
        weekday_selected_list[this.weekday2idx[moment.weekday]] = true
      }
    }

    // Generate slot array
    const weekday_array = [{weekday:'monday', active: false}, {weekday:'tuesday', active: false}, 
                            {weekday:'wednesday', active: false}, {weekday:'thursday', active: false}, 
                            {weekday:'friday', active: false}, {weekday:'saturday', active: false}, {weekday:'sunday', active: false}]  
    let weekday_slot_array = weekday_array.map(a => Object.assign({}, a));
    for (const [idx,value] of weekday_selected_list.entries()) {
      weekday_slot_array[idx].active = value      
    }                            
    return weekday_slot_array;
  }

  render() {
    const { classes, onClose, ...other } = this.props;
    const header_array = Array.from(' MTWTFSS')


    let weekday_selected_list = this.generated_weekday_selected_list('before_6')
    const row_before_0_6 = this.generate_row(weekday_selected_list, '00-06', 'before_6')

    weekday_selected_list = this.generated_weekday_selected_list('between_6_8')
    const row_between_6_8 = this.generate_row(weekday_selected_list, '06-08', 'between_6_8')

    weekday_selected_list = this.generated_weekday_selected_list('between_8_10')
    const row_between_8_10 = this.generate_row(weekday_selected_list, '08-10', 'between_8_10')

    weekday_selected_list = this.generated_weekday_selected_list('between_10_12')
    const row_between_10_12 = this.generate_row(weekday_selected_list, '10-12', 'between_10_12')

    weekday_selected_list = this.generated_weekday_selected_list('between_12_14')
    const row_between_12_14 = this.generate_row(weekday_selected_list, '12-14', 'between_12_14')

    weekday_selected_list = this.generated_weekday_selected_list('between_14_16')
    const row_between_14_16 = this.generate_row(weekday_selected_list, '14-16', 'between_14_16')

    weekday_selected_list = this.generated_weekday_selected_list('between_16_18')
    const row_between_16_18 = this.generate_row(weekday_selected_list, '16-18', 'between_16_18')

    weekday_selected_list = this.generated_weekday_selected_list('between_18_20')
    const row_between_18_20 = this.generate_row(weekday_selected_list, '18-20', 'between_18_20')

    weekday_selected_list = this.generated_weekday_selected_list('between_20_22')
    const row_between_20_22 = this.generate_row(weekday_selected_list, '20-22', 'between_20_22')

    weekday_selected_list = this.generated_weekday_selected_list('after_22')
    const row_between_22_00 = this.generate_row(weekday_selected_list, '22-00', 'after_22')
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

