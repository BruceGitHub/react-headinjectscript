import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HeadInjectScript from 'react-headinjectscript'

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = { src: '' };    
    this.callback_get_string_src = this.callback_get_string_src.bind(this);
    this.handleClick = this.handleClick.bind(this); 
    this.callback_done_event = this.callback_done_event.bind(this);
  }

  callback_before_event() {}
  callback_get_string_src()
  {
     
      return this.state.src; 
  }
  /*eslint no-undef: 0*/
  callback_done_event() {

    this.setState({head_post:document.head.children[document.head.children.length-1].src});

  }
  
  /*eslint no-undef: 0*/
  handleClick()
  {
     this.setState({ src: 'https://maps.googleapis.com/maps/api/js?callback=initMap' });
     
  }
 
 
  render() {
    return (
      <div className="App">  
        <HeadInjectScript
<<<<<<< HEAD
          key={this.state.src} //tricks fix future release
=======
          key={this.state.src} //tricls fix future release
>>>>>>> origin/master
          injectBeforeEvent={this.callback_before_event}
          injectsource={this.callback_get_string_src}
          injectDoneEvent={this.callback_done_event}        
        />      
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p>
        </p>
        <p className="App-intro">
          
          <button
          className="btn btn-default"        
          onClick={this.handleClick}>LOAD SCRIPT</button>
          
        </p>

        <p>
        Value state: {this.state.src}
        <br />
        </p>

        <p>
        Head document
        {this.state.head_post}
        </p>          

      </div>
    );
  }
}

export default App;
