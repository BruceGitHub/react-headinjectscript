'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeadInjectScript = function (_React$Component) {
  _inherits(HeadInjectScript, _React$Component);

  function HeadInjectScript(props) {
    _classCallCheck(this, HeadInjectScript);

    var _this = _possibleConstructorReturn(this, (HeadInjectScript.__proto__ || Object.getPrototypeOf(HeadInjectScript)).call(this, props));

    _this.checkValidSCript = false;
    _this.callOnLoadScriptEvent = _this.callOnLoadScriptEvent.bind(_this);
    _this.injectScriptSourceSingle = _this.injectScriptSourceSingle.bind(_this);
    return _this;
  }

  _createClass(HeadInjectScript, [{
    key: 'componentWillMount',


    /*
    Framework method
    */

    value: function componentWillMount() {
      // console.log('call componentWillMount: ');
      // console.log("call componentWillMount: " + this.props.injectsource);
      // console.log("call componentWillMount: " + this.props);
      // console.log("call componentWillMount head: " + document.head.innerHTML);

      if (this.props.injectsource) {
        // console.log("call componentWillMount call injectsource ");
        var sourceCode = this.props.injectsource();

        if (sourceCode) {
          // console.log('call componentWillMount sourceCode: ' + sourceCode);
          this.checkValidSCript = sourceCode.length > 0 || false;
          // console.log('call componentWillMount checkValidSCript: ' + this.checkValidSCript);
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // console.log('call componentDidMount: ');
      // console.log("call componentDidMount: " + this.props.injectsource);
      // console.log("call componentDidMount head: " + document.head.innerHTML);
      // console.log("call componentDidMount: " + this.props);

      if (this.checkValidSCript) {
        // console.log("call componentDidMount checkValidSCript src: " + this.props.injectsource());
        // console.log("call componentDidMount checkValidSCript: " + document.head.innerHTML);

        var src = this.props.injectsource();

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
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'injectScriptSource',
    value: function injectScriptSource(paramSrcInput) {
      // console.log(typeof paramSrcInput);
      if (typeof paramSrcInput === 'string') this.injectScriptSourceSingle(paramSrcInput);else if (Array.isArray(paramSrcInput)) this.injectScriptSourceArray(paramSrcInput);
    }
  }, {
    key: 'injectScriptSourceArray',
    value: function injectScriptSourceArray(paramSrcInput) {
      paramSrcInput.map(this.injectScriptSourceSingle);
    }
  }, {
    key: 'callOnLoadScriptEvent',
    value: function callOnLoadScriptEvent(paramUrl) {

      // console.dir('call injectOnLoadScriptEvent:' + arguments[0]);
      this.props.injectOnLoadScriptEvent(paramUrl);
    }
  }, {
    key: 'injectScriptSourceSingle',
    value: function injectScriptSourceSingle(paramSrc) {
      if (paramSrc === '') return;
      if (paramSrc === undefined) return;

      var script = document.createElement('script');

      if (this.props.injectOnLoadScriptEvent) {
        script.onload = this.callOnLoadScriptEvent(paramSrc);
      }

      script.setAttribute('src', paramSrc);
      document.head.appendChild(script);

      // console.log('injectScriptSource: ' + paramSrc);
    }
  }, {
    key: 'noSourceSet',
    value: function noSourceSet() {
      var errorMessage = _react2.default.createElement(
        'h3',
        null,
        'No source set'
      );
      return errorMessage;
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log('call render checkValidSCript: ' + this.checkValidSCript);
      if (this.checkValidSCript === false) {
        var output = this.noSourceSet();
        return _react2.default.createElement(
          'div',
          null,
          output
        );
      }

      return null;
    }
  }]);

  return HeadInjectScript;
}(_react2.default.Component);

// module.exports = HeadInjectScript;


HeadInjectScript.propTypes = {
  injectBeforeEvent: _react2.default.PropTypes.func,
  injectsource: _react2.default.PropTypes.func,
  injectDoneEvent: _react2.default.PropTypes.func,
  injectOnLoadScriptEvent: _react2.default.PropTypes.func
};
exports.default = HeadInjectScript;