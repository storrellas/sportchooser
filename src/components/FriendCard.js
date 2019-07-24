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
import Grid from '@material-ui/core/Grid';



// Project imports
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

const styles = theme => ({
  card: {
    maxWidth: 345,
    width: "100%",
    padding: 10
  },
  media: {
    height: 140,
  },
  content: {
    padding: 0,
    width: "100%"
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

  render() {
    const { sportList, friend, handleAddFriend, classes } = this.props;
    console.log("-- FriendCard --")
    console.log(sportList, friend)
    const picture = `${config.BASE_API_URL}${friend.picture}`
    return (
      <Card className={classes.card} onClick={(e) => this.handleClick(e)}>
        <CardActionArea>
          <Box style={{ display:'flex', width:"100%", height: "5em"}}>
            <img height="100%" src={picture} />
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              {friend.first_name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              {friend.last_name}
            </Typography>
          </Box>
          <CardContent classes={{ root: classes.content }}>

            <Box pt={2} pl={1} pr={1} mt={0} mb={2} style={{ width:"100%"}}>
              <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div style={{ height: "20%" }}>Wants to Try</div>

                    <Grid container style={{ height: "80%"}}>
                      <Grid item xs={6}>
                        <img width="100%" src="http://3.121.215.237/media/fixture/icon_judo.png" />
                      </Grid>
                      <Grid item xs={6}>
                        <img width="100%" src="http://3.121.215.237/media/fixture/icon_rugby.png" />
                      </Grid>
                    </Grid>

                  </Grid>
                  <Grid item xs={6} style={{ borderLeft : "1px solid grey"}}>
                    <div>AlreadyPlayed</div>

                    <Grid container style={{ height: "80%"}}>
                      <Grid item xs={6}>
                        <img width="100%" src="http://3.121.215.237/media/fixture/icon_running.png" />
                      </Grid>
                      <Grid item xs={6}>
                        <img width="100%" src="http://3.121.215.237/media/fixture/icon_swimming.png" />
                      </Grid>
                    </Grid>

                  </Grid>
                </Grid>
              </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }


}
export default withStyles(styles)(MediaCard);
