import React, { Component } from 'react';
import './App.css';
// import API from "./utils/API";


class App extends Component {

  state = {
    photos: [],
    hexSearch: "",
    hex: "",
    namedSearch: ""
  }

  componentDidMount() {
    const color = "fb3d71"
    this.loadPhotos(color);
  };

  loadPhotos = color => {
    fetch("api/shutterstock/" + color)
        .then(res => res.json())
        .then(res => this.setState({ photos: res.data }))
        .catch(err => console.log(err));
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
