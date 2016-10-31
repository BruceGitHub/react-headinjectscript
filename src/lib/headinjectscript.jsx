import React from 'react';


export default class HeadInjectScript extends React.Component {

  constructor(props) {
    super(props);
    this.checkValidSCript = false;
    this.callOnLoadScriptEvent = this.callOnLoadScriptEvent.bind(this);
    this.injectScriptSourceSingle = this.injectScriptSourceSingle.bind(this);
  }

  static propTypes = {
    injectBeforeEvent: React.PropTypes.func,
    injectsource: React.PropTypes.func, 
    injectDoneEvent: React.PropTypes.func,
    injectOnLoadScriptEvent: React.PropTypes.func,
  }

  /*
  Framework method
  */

  componentWillMount() {
    // console.log('call componentWillMount: ');
    // console.log("call componentWillMount: " + this.props.injectsource);
    // console.log("call componentWillMount: " + this.props);
    // console.log("call componentWillMount head: " + document.head.innerHTML);

    if (this.props.injectsource) {
     // console.log("call componentWillMount call injectsource ");
      const sourceCode = this.props.injectsource();

      if (sourceCode) {
        // console.log('call componentWillMount sourceCode: ' + sourceCode);
        this.checkValidSCript = (sourceCode.length > 0) || false;
        // console.log('call componentWillMount checkValidSCript: ' + this.checkValidSCript);
      }
    }
  }

  componentDidMount() {
    // console.log('call componentDidMount: ');
    // console.log("call componentDidMount: " + this.props.injectsource);
    // console.log("call componentDidMount head: " + document.head.innerHTML);
    // console.log("call componentDidMount: " + this.props);

    if (this.checkValidSCript) {
    // console.log("call componentDidMount checkValidSCript src: " + this.props.injectsource());
    // console.log("call componentDidMount checkValidSCript: " + document.head.innerHTML);

      const src = this.props.injectsource();

      // pre-req
      if (document.head.innerHTML.indexOf(src) >= 0) {
        return;
      }

      if (this.props.injectBeforeEvent) this.props.injectBeforeEvent();
      this.injectScriptSource(src);
      if (this.props.injectDoneEvent) this.props.injectDoneEvent();

    // console.log("call componentDidMount checkValidSCript: " + document.head.innerHTML);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  injectScriptSource(paramSrcInput) {
      // console.log(typeof paramSrcInput);
      if (typeof paramSrcInput === 'string') this.injectScriptSourceSingle(paramSrcInput);
      else
      if (Array.isArray(paramSrcInput)) this.injectScriptSourceArray(paramSrcInput);
  }

  injectScriptSourceArray(paramSrcInput) {
      paramSrcInput.map(this.injectScriptSourceSingle);
  }

  callOnLoadScriptEvent() {
    // console.log('call injectOnLoadScriptEvent');
    this.props.injectOnLoadScriptEvent();
  }
  
  injectScriptSourceSingle(paramSrc) {
    if (paramSrc === '') return;
    if (paramSrc === undefined) return;

    let script = document.createElement('script');

    if (this.props.injectOnLoadScriptEvent) {
     script.onload = this.callOnLoadScriptEvent; 
    }

    script.setAttribute('src', paramSrc);
    document.head.appendChild(script);

    // console.log('injectScriptSource: ' + paramSrc);
  }

  noSourceSet() {
    const errorMessage = <h3>No source set</h3>;
    return errorMessage;
  }

  render() {
    // console.log('call render checkValidSCript: ' + this.checkValidSCript);
    if (this.checkValidSCript === false) {
      const output = this.noSourceSet();
      return (
        <div>
          {output}
        </div>
        );
    }

    return (
      null
    );
  }

}

// module.exports = HeadInjectScript;
