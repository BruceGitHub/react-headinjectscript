'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var HeadInjectScript = (function (_React$Component) {
  _inherits(HeadInjectScript, _React$Component);

  function HeadInjectScript(props) {
    _classCallCheck(this, HeadInjectScript);

    _get(Object.getPrototypeOf(HeadInjectScript.prototype), 'constructor', this).call(this, props);
    this.checkValidSCript = false;
  }

  // module.exports = HeadInjectScript;

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
    key: 'injectScriptSourceSingle',
    value: function injectScriptSourceSingle(paramSrc) {
      if (paramSrc === '') return;
      if (paramSrc === undefined) return;

      var script = document.createElement('script');
      script.setAttribute('src', paramSrc);
      document.head.appendChild(script);

      // console.log('injectScriptSource: ' + paramSrc);
    }
  }, {
    key: 'noSourceSet',
    value: function noSourceSet() {
      var errorMessage = _react2['default'].createElement(
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
        return _react2['default'].createElement(
          'div',
          null,
          output
        );
      }

      return null;
    }
  }], [{
    key: 'propTypes',
    value: {
      injectBeforeEvent: _react2['default'].PropTypes.func,
      injectsource: _react2['default'].PropTypes.func,
      injectDoneEvent: _react2['default'].PropTypes.func
    },
    enumerable: true
  }]);

  return HeadInjectScript;
})(_react2['default'].Component);

exports['default'] = HeadInjectScript;
module.exports = exports['default'];