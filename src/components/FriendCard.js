import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


// Project imports
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  content: {
    padding: 0
  }
});

class MediaCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }
  handleClick(e){
    console.log("HandleClick")
  }

  async componentDidMount(){
    const username = "carla"
    const response = await fetch( `${config.BASE_API_URL}/api/user/lookup/?username=${username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      }        
    })
    const data = await response.json()
    console.log(data)
    this.setState({
      user: data
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card} onClick={(e) => this.handleClick(e)}>
        <CardActionArea>
          {/* <CardMedia
            className={classes.media}
            image="https://3.121.215.237/media/default/girl.jpg"
            title="Contemplative asdfadfReptile"
          /> */}
          <Box style={{ display:'flex', width:"100%", height: "5em", backgroundColor: 'blue'}}>
            <img height="100%" src="https://3.121.215.237/media/default/girl.jpg" />
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center'}}>
              Clara Valenti
            </Typography>
          </Box>
          <CardContent classes={{ root: classes.content }}>
          <Box pt={2} pl={1} pr={1} m={0} style={{ display: 'flex', width:"100%", height: "5em", backgroundColor: 'red'}}>
            <div style={{ height: "100%", borderRight: "1px solid black", paddingRight: 10}}>
              <div>Wants to Try</div>
              <div style={{ display: 'flex', height: "80%"}}>
                <img height="100%" src="http://3.121.215.237/media/fixture/icon_judo.png" />
                <img height="100%" src="http://3.121.215.237/media/fixture/icon_rugby.png" />
              </div>
            </div>
            <div style={{ height: "100%", borderRight: "1px solid black", paddingRight: 10, paddingLeft: 10}}>
              <div>AlreadyPlayed</div>
              <div style={{ display: 'flex', height: "80%"}}>
                <img height="100%" src="http://3.121.215.237/media/fixture/icon_running.png" />
                <img height="100%" src="http://3.121.215.237/media/fixture/icon_swimming.png" />
              </div>
            </div>
          </Box>

  
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* <CardActions style={{display:'flex', justifyContent: 'flex-end'}}>
          <Button size="small" color="primary">
            Add To Friends
          </Button>
        </CardActions> */}
      </Card>
    );
  }


}
export default withStyles(styles)(MediaCard);
