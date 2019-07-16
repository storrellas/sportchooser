import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';


// Redux
import { store, renderConfetti } from "../redux";

// React-redux
import { connect } from "react-redux";



// AwesomeSlider
import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/styles';

// Components
import FriendDialog from '../components/FriendDialog';
import SettingsDialog from '../components/SettingsDialog';

// Images
import undoImage from "../assets/img/tryasport/undo.png"
import noInterestImage from "../assets/img/tryasport/no_interest.png"
import likeToTryImage from "../assets/img/tryasport/like_to_try.png"
import alreadyPlayedImage from "../assets/img/tryasport/already_played.png"
import wikipediaImage from "../assets/img/tryasport/wikipedia.png"
import gearImage from "../assets/img/tryasport/gear.png"

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


//import { store, renderConfetti } from "../redux";
//import store from "../redux";
// const mapStateToProps = state => {
//   return { articles: state.articles };
// };
// function mapDispatchToProps(dispatch) {
//   return {
//     addArticle: article => dispatch(addArticle(article)),
//     renderConfetti: enabled => dispatch(renderConfetti(enabled))
//   };
// }



class Home extends React.Component {
  // status_enum = {
  //   SPORT_0: 0,
  //   SPORT_1: 1,
  //   SPORT_2: 2,
  //   ACCOUNT_INFO: 3,
  //   SPORT_3: 4
  // }


  constructor(props) {
    super(props);

    this.state = {
      selected: 1,
      user_prompt: {
        space: 3,
        counter: 0,
        open: false
      },
      settings_prompt: false,
      sport_list: []
    };
 
  }

  async componentDidMount(){

    const response = await fetch('https://3.121.215.237/api/sport/?lan=en', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }        
    })
    const data = await response.json()
    console.log(data)
    this.setState({ sport_list: data, selected: 0 })
    //this.forceUpdate();
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
    let {user_prompt, selected} = this.state
    user_prompt.counter = user_prompt.counter + 1
    if( user_prompt.counter >= user_prompt.space){
      user_prompt.open = true
    }else{
      selected = selected + 1
      user_prompt.open = false
    }
    


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
    this.setState({ user_prompt : user_prompt, settings_prompt: false })
  };

  render() {
    const { classes } = this.props;
    const { sport_list, selected } = this.state;


    console.log("Rendering: ", selected)

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

            <FriendDialog open={this.state.user_prompt.open} onClose={(e) => this.handleClose()} />

        </Container>

      </div>
    );
  }
}
export default withStyles(styles)(Home);
//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home));

