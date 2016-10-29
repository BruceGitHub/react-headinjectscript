# HeadInjectScript
a component react that inject script tag on head tag

# Usage 

npm install react-headinjectscript

```javascript
<HeadInjectScript 
    injectBeforeEvent={callback_before_event}
    injectsource={callback_get_string_src}
    injectDoneEvent{callback_done_event}
 />
```

# Test
npm test

# Demo directory not work. To try component

Install create-react-app
```javascript
npm install create-react-app --save-dev
```
Install component
```javascript
npm install react-headinjectscript
```

Copy  and replace thsi code App.js

```javascript
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
          key={this.state.src} //tricls fix future release
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

```

Copy  and replace this code public/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <!--
      Notice the use of %PUBLIC_URL% in the tag above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->

    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>


    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>

    
    <div id="map"></div>
    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
    </script>
    
    
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start`.
      To create a production bundle, use `npm run build`.
    -->
  </body>
</html>
```

Run demo 
```javascript
npm start
```

![Alt Text](https://github.com/BruceGitHub/react-headinjectscript/blob/master/demo.gif)








