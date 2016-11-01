# HeadInjectScript
a component react that inject script tag on head tag

[![Build Status](https://travis-ci.org/BruceGitHub/react-headinjectscript.svg?branch=master)](https://travis-ci.org/BruceGitHub/react-headinjectscript)

# Usage 

npm install react-headinjectscript

```javascript
<HeadInjectScript 
    injectBeforeEvent={callback_before_event} //first event with no parameter
    injectsource={callback_get_string_src} // when retrieve source script whith no parameter
    injectDoneEvent={callback_done_event}  // when append to head tag no parameter
    injectOnLoadScriptEvent={callback_load_event} // when load after injectDoneEvent whith url parameter
 />
```

# Test
npm test

# Run Demo 

cd demo 

```javascript
npm install
```

Run demo 
```javascript
npm start
```

![Alt Text](https://github.com/BruceGitHub/react-headinjectscript/blob/master/demo.gif)








