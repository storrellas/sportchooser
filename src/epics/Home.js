import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withRouter } from "react-router";


// Redux
import { store, userProfile } from "../redux";

// React-redux
import { connect } from "react-redux";

// Project Imports
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"


// AwesomeSlider
import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/styles';

// Components
import BirthyearDialog from '../components/BirthyearDialog';
import EmailDialog from '../components/EmailDialog';
import FriendDialog from '../components/FriendDialog';
import GenderDialog from '../components/GenderDialog';
import LocationDialog from '../components/LocationDialog';
import MomentsDialog from '../components/MomentsDialog';
import SettingsDialog from '../components/SettingsDialog';


// Images
import undoImage from "../assets/img/undo.png"
import noInterestImage from "../assets/img/no_interest.png"
import likeToTryImage from "../assets/img/like_to_try.png"
import alreadyPlayedImage from "../assets/img/already_played.png"
import wikipediaImage from "../assets/img/wikipedia.png"
import gearImage from "../assets/img/tryasport/icn_gear.png"

// Styles
import "../styles/Home.scss";

const styles = theme => ({
  root: {
    backgroundColor:'#E5E7E9', 
    height: '100vh', 
    padding: 0
  },
  loadingContainer:{
    height: '100%', 
    borderRadius: 16, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  mainTitle:{
    position: 'relative',
    backgroundColor: 'orange',
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  },
  content: {
    marginTop: 20,
    padding:0
  },
  title:{
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#3498DB',
    textAlign: 'center',
    fontSize: '1.5em',
  },
  titlePosition: {
    position: 'absolute', 
    width:'55%', 
    top: 15, 
    margin: 'auto', 
    left: 0, 
    right: 0,
    zIndex: 200
  },
  link:{
    backgroundColor: 'grey', 
    borderRadius: 10,
  },
  linkPosition:{
    position: 'absolute', 
    height: "15%",
    width: "45%", 
    bottom: -35,
    margin: 'auto', 
    left: '0', 
    right: '0',
    zIndex: 200
  },
  linkContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width:"100%", 
    height:"100%"
  },
  linkText: {
    marginLeft: 10,
    fontSize: '1em',
    fontWeight: 'bold'
  },
  iconContainer:{
    marginTop: 50
  },
  icon: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconButton: {
    borderRadius:'50%', 
    backgroundColor: 'red', 
    margin: 24
  }
});

class IconMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, image, mt, onClick } = this.props;

    return (
      <div>
        <Box mt={mt} ml={3} mr={3} p={1} style={{backgroundColor:'white'}}  
            borderRadius="50%" onClick={onClick}>
            <img width="100%" height="100%" src={image}></img>  
        </Box>
        <p>{text}</p>
      </div>
    )
  }
}


// import { store, renderConfetti, userAuthenticated } from "../redux";
// const mapStateToProps = state => {
//   return { userAuthenticated: state.userAuthenticated };
// };
// function mapDispatchToProps(dispatch) {
//   return {
//     addArticle: article => dispatch(addArticle(article)),
//     renderConfetti: enabled => dispatch(renderConfetti(enabled))
//   };
// }

const mapStateToProps = state => {
  return { user: state.user };
};
function mapDispatchToProps(dispatch) {
  return {
    userProfile: (data) => dispatch(userProfile(data)),
  };
}

class Home extends React.Component {

  constructor(props) {
    super(props);

    // Indicates all user_prompts available
    this.user_prompt_enum = {
      FRIENDS: 'friends',
      SHARE: 'share',
      EMAIL: 'email',
      LOCATION: 'location',
      MOMENTS: 'moments',
      GENDER: 'gender',
      BIRTHYEAR: 'birthyear'
    }

    // Selected order
    // this.user_prompt_order = [
    //   this.user_prompt_enum.FRIENDS,
    //   this.user_prompt_enum.LOCATION,
    // ]
    this.user_prompt_order = [
      this.user_prompt_enum.FRIENDS,
      this.user_prompt_enum.EMAIL,
      this.user_prompt_enum.LOCATION,
      this.user_prompt_enum.MOMENTS,
      this.user_prompt_enum.GENDER,
      this.user_prompt_enum.BIRTHYEAR
    ]


    this.state = {
      selected: 1,
      user_prompt: {
        space: 3,
        counter: 0,
        open: false,
        current: null,
        display:{
          friends: false,
          share: false,
          location: false,
          email: false,
          moments: false,
          gender: false,
          birthyear: false
        }
      },
      settings_prompt: false,
      sport_list: [],
    };
    this.mounted = false;

    /*
    this.user_prompt_order = [
      user_prompt_enum.FRIENDS,
      user_prompt_enum.SHARE,
      user_prompt_enum.EMAIL,
      user_prompt_enum.LOCATION,
      user_prompt_enum.MOMENTS,
      user_prompt_enum.GENDER,
      user_prompt_enum.BIRTHYEAR
    ]
    /**/
  }

  componentDidMount(){
    this.mounted = true

    fetch(config.BASE_API_URL + '/api/sport/?lan=en', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }        
    })
    .then(response => response.json())
    .then( (data) =>{
      console.log(data)
      if(this.mounted == true){
        this.setState({ sport_list: data, selected: 0 })
      }
    })

    if(this.props.user === undefined){
      console.log("User is undefined")

      fetch(config.BASE_API_URL + '/api/user/whoami/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
        },    
      })
      .then(response => response.json())
      .then( (data) =>{
        console.log(data)
        this.props.userProfile(data)

      })

        // // WhoAmI
        // body = { username: username, password: password }
        // response = await fetch(config.BASE_API_URL + '/api/user/whoami/', {
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //     'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
        //   },
        //   method: 'get'
        // })
        // data = await response.json()
        // console.log(data)
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  handleEnableConfetti(e){
    // const confettiSettings = { target: 'my-canvas' };
    // const confetti = new ConfettiGenerator(confettiSettings);
    // confetti.render();
    console.log("Dispatch renderConfetti -->")
    //this.props.renderConfetti( true );
    //setTimeout(() => { this.props.renderConfetti( false ); }, 3000);

    // store.dispatch( renderConfetti(true) )
    // setTimeout(() => { store.dispatch( renderConfetti(false) ) }, 3000);

  }

  handleSettings(e){
    console.log("Opening Settings")
    this.setState({ settings_prompt: true })
  }

  handleUndo(e){
    e.preventDefault();
    console.log('Undo clicked');

    // Decide selected action
    let selected = this.state.selected - 1
    if( selected < 0 )
      selected = this.state.sport_list.length - 1

    //console.log(selected)
    this.setState({ selected: selected })    
  }

  handleSportClick(e){
    e.preventDefault();
    //console.log('The link was clicked.');
    let {user_prompt, selected, sport_list} = this.state
    user_prompt.counter = user_prompt.counter + 1
    if( user_prompt.counter >= user_prompt.space){
      // Determine next modal show
      if(user_prompt.current == undefined){
        user_prompt.current = 0
      } else {
        user_prompt.current = user_prompt.current + 1
        if(user_prompt.current >= this.user_prompt_order.length) user_prompt.current = 0        
      } 
      const user_prompt_next = this.user_prompt_order[user_prompt.current]
      user_prompt.display[user_prompt_next] = true
      user_prompt.open = true
    }else{
      selected = selected + 1
      if( selected >= sport_list.length )
        selected = 0
      user_prompt.open = false
    }
    

    console.log("user_prompt")
    console.log(user_prompt)
    const state = {
      selected: selected, 
      user_prompt: user_prompt
    }
    this.setState(state)    
  }

  handleClose(){
    console.log('The link was closed')
    let {user_prompt} = this.state;
    user_prompt.open = false;
    user_prompt.counter = 0

    // Reset all modals
    for (var key in user_prompt.display) {
      // check if the property/key is defined in the object itself, not in parent
      if (user_prompt.display.hasOwnProperty(key)) {           
        user_prompt.display[key] = false
      }
    }

    this.setState({ user_prompt : user_prompt, settings_prompt: false })
  };

  render() {
    const { classes } = this.props;
    const { sport_list, selected } = this.state;
    console.log("-- Home:Rendering --", selected)
    console.log(this.props.user)
    // Determine whether loading or spinner
    let sport_box = <div className={classNames(classes.loadingContainer)}>
                      <CircularProgress/>
                    </div>;                                        
    if(sport_list.length > 0){
      sport_box = <div>
                    <Box borderRadius={16} className={classNames(classes.title, classes.titlePosition)}>
                      {sport_list[selected].name}
                    </Box>
                    <AwesomeSlider cssModule={AwsSliderStyles} bullets={false} 
                                organicArrows={false} 
                                selected={this.state.selected}
                                className={"aws-btn"}>
                      {sport_list.map((item) => <div key={item.name} data-src={item.images[0].picture}></div>)}
                    </AwesomeSlider>
                    <Box ml={20} mr={20} mt={0} mb={0} className={classNames(classes.link, classes.linkPosition)}>
                      <a href={sport_list[selected].url} className={classNames(classes.linkContainer)}>
                        <img height="100%" src={wikipediaImage} style={{borderRadius: '10px'}}></img>
                        <div className={classes.linkText}>More Info</div>
                      </a>
                    </Box>
                </div>;
    }

    const user_str = JSON.stringify(this.props.user, null, 2)
    return (
      <div> 
        <Container maxWidth="sm" className={classes.root}>

          <CssBaseline />
          <Box m={0} p ={0} className={classes.mainTitle}>
              <b>Sport - Planner</b>
              <div style={{fontSize: 14}}>Find New Sport</div>
              <div  onClick={(e) => this.handleSettings(e)}>
                <img src={gearImage} style={{position: 'absolute', right: 10, top: "12%", height: "75%", cursor: 'pointer'}}></img>
              </div>


          </Box>

          <Container maxWidth={false} style={{paddingTop: 20}}>

            <Box mt={2} ml={3} mr={3} borderRadius={16} style={{color:'grey'}}>
              <b>Try new Sport</b>
            </Box>

            <Box mt={2} ml={3} mr={3} borderRadius={16} style={{position: 'relative', backgroundColor: '#D5DBDB', height: '30vh'}}>
              {sport_box}
            </Box>
          </Container>

          <Grid container spacing={0} className={classNames(classes.iconContainer)}>
              <Grid item xs className={classNames(classes.icon)}>
                <IconMenu mt={2} text="Undo" image={undoImage} onClick={(e) => this.handleUndo(e)}></IconMenu>
              </Grid>
              <Grid item xs className={classNames(classes.icon)}>
                <IconMenu mt={6} text="No Interest" image={noInterestImage} onClick={(e) => this.handleSportClick(e)}></IconMenu>
              </Grid>
              <Grid item xs className={classNames(classes.icon)}>
                <IconMenu mt={6} text="Like To Try" image={likeToTryImage} onClick={(e) => this.handleSportClick(e)}></IconMenu>
              </Grid>
              <Grid item xs className={classNames(classes.icon)}>
                <IconMenu mt={2} text="Play Already" image={alreadyPlayedImage} onClick={(e) => this.handleEnableConfetti(e)}></IconMenu>
              </Grid>
            </Grid>            


            <SettingsDialog open={this.state.settings_prompt} onClose={(e) => this.handleClose()} />

            <BirthyearDialog open={this.state.user_prompt.display.birthyear} onClose={(e) => this.handleClose()} />
            <EmailDialog open={this.state.user_prompt.display.email} onClose={(e) => this.handleClose()} />
            <FriendDialog open={this.state.user_prompt.display.friends} onClose={(e) => this.handleClose()} />
            <GenderDialog open={this.state.user_prompt.display.gender} onClose={(e) => this.handleClose()} />
            <LocationDialog open={this.state.user_prompt.display.location} onClose={(e) => this.handleClose()} />
            <MomentsDialog open={this.state.user_prompt.display.moments} onClose={(e) => this.handleClose()} />

            <h1>User</h1>
            <div>{user_str}</div>

        </Container>

      </div>
    );
  }
}


//export default withRouter(withStyles(styles)(Home));
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

