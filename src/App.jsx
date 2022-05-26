import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';



const particleParameters ={
  particles: {
    number : {
      value : 125,
      density : {
        enabled : true,
        value_area : 800
      }
    },
    move : {
      direction: 'none',
      speed: 7,
      attract : {
        enable : true
      }
    }
  },
  size: {
    value: 3,
    random: true,
    anim: {
      enable: true,
      speed: 40,
      size_min: 0.1,
      sync: false
    }
  },
  line_linked: {
    enable: true,
    distance: 150,
    color: 	"#bbbbb",
    opacity: 0.4,
    width: 1
  },
  interactivity: {
    detect_on: "canvas",
    events : {
      onhover:{
        enable : true,
        mode : 'grab'
      },
      onclick : {
        enable : true,
        mode : 'push'
      }
    }
  }
}

// const app = new Clarifai.App({
//     apiKey: '773cbdff1bb64f79999f263c8fb400ee'
// });

const initialState = {
  input: '',
  imageURL: '',
  box :{},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  /* This Block is to check the connection between the app and the API */
  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //   .then(response => response.json())
  //   .then(console.log);
  // }
  
  // when ever there is a change, we need to update the user data
  
  loadUser = (data) => {
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (event) => {
    const bounds = event.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol: bounds.left_col * width,
      topRow: bounds.top_row * height,
      rightCol: width - (bounds.right_col * width),
      bottomRow: height - (bounds.bottom_row * height)
    }
  }

  displayBox = (response) => {
    this.setState({box: response});
    console.log(this.state.box);
  }

  log = (d) =>  {
    try {
      // .outputs[0].data.regions[0].region_info.bounding_box
      console.log(d);
    } catch (e) {
      console.log(e, d);
    }
  }
  
  onImageSubmit = (event) => {
    this.setState({imageURL: this.state.input});
    // clarif ai login: free4stuffsmoney@gmail.com
    //  password: raghava1
    
    // https://samples.clarifai.com/3o6gb3kkXfLvdKEZs4.gif
    fetch('https://cryptic-temple-74555.herokuapp.com/imageurl', {
      method: 'POST',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      // if we get a valid response, we call the server and update the rank
      if (response){
        fetch('https://cryptic-temple-74555.herokuapp.com/image', {
          method: 'PUT',
          headers: {'content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          }) 
        })
        .then(response => response.json())
        .then(count => {
          // only set a specific value in the state
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)
      }
      this.displayBox(this.calculateFaceLocation(response))
    })
    .catch(d=> this.log(d));
  }

  onRouteChange = (page) => {
    if(page === 'Home') {
      this.setState({isSignedIn: true});
    }
    else if(page === 'signout') {
      this.setState(initialState);
    }
    this.setState({route: page});
    
  }

  render() {
    const {isSignedIn, box, route, imageURL} = this.state;
    return (
      <div className="App">
        <Particles className="particles" 
                  params={particleParameters} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn = {isSignedIn}/>
        <Logo />
        {route === 'Home' ?
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
            <FaceRecognition box = {box} imageURL = {imageURL}/>
          </div>
          : (
            (route === 'signin') || (route === 'signout')?
            // sending the updating function and route change function
              <SignIn loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/>
            :
            <Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>
          )
          
        }
      </div>
    );
  }
}

export default App;
