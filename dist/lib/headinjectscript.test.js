'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _chai = require('chai');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _headinjectscript = require('./headinjectscript.jsx');

var _headinjectscript2 = _interopRequireDefault(_headinjectscript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var srcTest = 'xxx';
// import jsdom from 'mocha-jsdom';


var srcArrayTest = ['xxx', 'yyy'];

describe('<HeadInjectScript/> ', function () {
  beforeEach(function () {
    global.document = _jsdom2.default.jsdom('<!doctype html><html><head><script src="test"></script></head><body></body></html>');
    documentRef = document;
    // console.log('test head :' + documentRef.head.innerHTML);
  });

  afterEach(function () {
    documentRef.close();
    documentRef = undefined;
  });

  it('calls componentWillMount', function () {
    _sinon2.default.spy(_headinjectscript2.default.prototype, 'componentWillMount');
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, null));
    (0, _chai.expect)(_headinjectscript2.default.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  it('calls componentDidMount', function () {
    var mockCallback = function mockCallback() {
      return srcTest;
    };
    _sinon2.default.spy(_headinjectscript2.default.prototype, 'componentDidMount');
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, { injectsource: mockCallback }));

    (0, _chai.expect)(_headinjectscript2.default.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('if not defined injectsource props show error', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_headinjectscript2.default, null));

    // console.log(wrapper.debug());
    (0, _chai.expect)(wrapper.contains(_react2.default.createElement(
      'h3',
      null,
      'No source set'
    ))).to.equal(true);
  });

  it('fail if not call injectsource', function () {
    var mockCallback = _sinon2.default.spy();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, { injectsource: mockCallback }));

    // console.log("test head :" + documentRef.head.innerHTML);
    // console.log(wrapper.debug());
    (0, _chai.expect)(mockCallback.called).to.equal(true);
  });

  it('if injectsource return null value show error', function () {
    var mockCallback = function mockCallback() {
      return '';
    };
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, { injectsource: mockCallback }));

    // console.log(wrapper.debug());
    (0, _chai.expect)(wrapper.contains(_react2.default.createElement(
      'h3',
      null,
      'No source set'
    ))).to.equal(true);
  });

  it('if injectsource return value script output is not null', function () {
    var mockCallback = function mockCallback() {
      return srcTest;
    };

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, { injectsource: mockCallback }));

    // console.log(wrapper.html());
    (0, _chai.expect)(wrapper.children()).to.have.length(0);
  });

  it('if injectsource return value script inject headtag', function () {
    var mockCallback = function mockCallback() {
      return srcTest;
    };

    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, { injectsource: mockCallback }));

    // const scriptTag = document.createElement('script');
    // document.head.appendChild(scriptTag);
    // console.log("test head :" + documentRef.head.innerHTML);
    // console.log(document.innerHTML);
    // console.log(document.body.innerHTML);

    (0, _chai.expect)(documentRef.head.innerHTML).to.equal('<script src="test"></script><script src="xxx"></script>');
  });

  it('if injectsource return value script and src already inject not re-insert', function () {
    var mockCallback = function mockCallback() {
      return srcTest;
    };

    (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, { injectsource: mockCallback }));
    (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, { injectsource: mockCallback }));

    (0, _chai.expect)(documentRef.head.innerHTML).to.equal('<script src="test"></script><script src="xxx"></script>');
  });

  it('call injectBeforeEvent before injectscript', function () {
    var mockCallback = function mockCallback() {
      return srcTest;
    };
    var mockCallbackInjectBeforeEvent = _sinon2.default.spy();

    (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, {
      injectsource: mockCallback,
      injectBeforeEvent: mockCallbackInjectBeforeEvent
    }));

    (0, _chai.expect)(mockCallbackInjectBeforeEvent.called).to.equal(true);
  });

  it('call injectDoneEvent after injectscript', function () {
    var mockCallback = function mockCallback() {
      return srcTest;
    };
    var mockCallbackInjectDoneEvent = _sinon2.default.spy();

    (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, {
      injectsource: mockCallback,
      injectDoneEvent: mockCallbackInjectDoneEvent
    }));

    (0, _chai.expect)(mockCallbackInjectDoneEvent.called).to.equal(true);
  });

  it('if injectsource is array perform multi insert', function () {
    var mockCallback = function mockCallback() {
      return srcArrayTest;
    };

    (0, _enzyme.mount)(_react2.default.createElement(_headinjectscript2.default, {
      injectsource: mockCallback
    }));

    (0, _chai.expect)(documentRef.head.innerHTML).to.equal('<script src="test"></script><script src="xxx"></script><script src="yyy"></script>');
  });
});