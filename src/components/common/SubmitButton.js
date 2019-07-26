import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { classes, onSubmit } = this.props;

    return (
      <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
        <Button variant="contained" className={classes.button} onClick={(e) => onSubmit(e)}>
          <div style={{flexGrow: 1}}>OK</div>
        </Button>
      </Box>
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

export default withStyles(styles)(SubmitButton);



