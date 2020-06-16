import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkFrom';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';
import tachyons from 'tachyons';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';


const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}

const initialState = {
  input: '',
  imgageUrl: '',
  box: [],
  route: 'signIn',
  isSigned: false,
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

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

      }
    })
  }



  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imgageUrl: this.state.input })
    fetch('https://safe-atoll-94150.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    }).then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://safe-atoll-94150.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        } this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log('unable to load...', err));
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({initialState })
    } else if (route === 'home') {
      this.setState({ isSigned: true })
    }
    this.setState({ route: route })
  }

  render() {

    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSigned} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={this.state.box} imageUrl={this.state.imgageUrl} />
          </div>
          : (
            this.state.route === 'signIn' ?
              <div><SignIn
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}

              />
                <Logo /></div> :
              <div>
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                <Logo />
              </div>
          )
        }
      </div>
    );
  }
}

export default App;
