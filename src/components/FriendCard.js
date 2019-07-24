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
          <Box style={{ display:'flex', width:"100%", height: "5em"}}>
            <img height="100%" src="https://3.121.215.237/media/default/girl.jpg" />
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              Clara Valenti
            </Typography>
          </Box>
          <CardContent classes={{ root: classes.content }} style={{ width: "100%"}}>
            {/* <Box pt={2} pl={1} pr={1} m={0} style={{ display: 'flex', width:"100%", height: "5em" }}>
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
            </Box> */}

            <Box pt={2} pl={1} pr={1} m={0} style={{ display: 'flex', width:"100%"}}>
              <Grid container spacing={3} style={{ backgroundColor: 'blue'}}>
                  <Grid item xs={6} style={{ backgroundColor: 'green'}}>
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
                  <Grid item xs={6} style={{ backgroundColor: 'yellow'}}>
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
