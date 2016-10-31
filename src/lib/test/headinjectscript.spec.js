
import React from 'react';
import { mount, shallow, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import jsdom from 'jsdom';


import HeadInjectScript from './../headinjectscript';

const srcTest = 'xxx';
const srcArrayTest = [
  'xxx', 
  'yyy',
];
const srcMap = 'https://maps.googleapis.com/maps/api/js?callback=initMap';


describe('<HeadInjectScript/> ', () => {
  beforeEach(() => {
    global.document = jsdom.jsdom('<!doctype html><html><head><script src="test"></script></head><body></body></html>');
    documentRef = document;
    // console.log('test head :' + documentRef.head.innerHTML);
  });

  afterEach(() => {
    documentRef.close();
    documentRef = undefined;
  });

  it('calls componentWillMount', () => {
    sinon.spy(HeadInjectScript.prototype, 'componentWillMount');
    const wrapper = mount(<HeadInjectScript />);
    expect(HeadInjectScript.prototype.componentWillMount.calledOnce).to.equal(true);
    HeadInjectScript.prototype.componentWillMount.restore(); // Unwraps the spy
  });

  it('calls componentDidMount', () => {
    const mockCallback = () => srcTest;
    sinon.spy(HeadInjectScript.prototype, 'componentDidMount');
    const wrapper = mount(<HeadInjectScript injectsource={mockCallback} />);

    expect(HeadInjectScript.prototype.componentDidMount.calledOnce).to.equal(true);

    HeadInjectScript.prototype.componentDidMount.restore(); // Unwraps the spy
  });

  it('if not defined injectsource props show error', () => {
    const wrapper = shallow(<HeadInjectScript />);

    // console.log(wrapper.debug());
    expect(wrapper.contains(<h3>No source set</h3>)).to.equal(true);
  });

  it('fail if not call injectsource', () => {
    const mockCallback = sinon.spy();
    const wrapper = mount(<HeadInjectScript injectsource={mockCallback} />);


    // console.log("test head :" + documentRef.head.innerHTML);
    // console.log(wrapper.debug());
    expect(mockCallback.called).to.equal(true);
  });

  it('if injectsource return null value show error', () => {
    const mockCallback = () => '';
    const wrapper = mount(<HeadInjectScript injectsource={mockCallback} />);

    // console.log(wrapper.debug());
    expect(wrapper.contains(<h3>No source set</h3>)).to.equal(true);
  });

  it('if injectsource return value script output is not null', () => {
    const mockCallback = () => srcTest;

    const wrapper = mount(<HeadInjectScript injectsource={mockCallback} />);

    // console.log(wrapper.html());
    expect(wrapper.children()).to.have.length(0);
  });


  it('if injectsource return value script inject headtag', () => {
    const mockCallback = () => srcTest;

    const wrapper = mount(<HeadInjectScript injectsource={mockCallback} />);

    // const scriptTag = document.createElement('script');
    // document.head.appendChild(scriptTag);
    // console.log("test head :" + documentRef.head.innerHTML);
    // console.log(document.innerHTML);
    // console.log(document.body.innerHTML);

    const expectVal = '<script src="test"></script><script src="xxx"></script>';
    const actualVal = documentRef.head.innerHTML;
    expect(expectVal).to.equal(actualVal);
  });

  it('if injectsource return value script and src already inject not re-insert', () => {
    const mockCallback = () => srcTest;

    mount(<HeadInjectScript injectsource={mockCallback} />);
    mount(<HeadInjectScript injectsource={mockCallback} />);

    const expectVal = '<script src="test"></script><script src="xxx"></script>';
    const actualVal = documentRef.head.innerHTML;

    expect(expectVal).to.equal(actualVal);
  });

  it('call injectBeforeEvent before injectscript', () => {
    const mockCallback = () => srcTest;
    const mockCallbackInjectBeforeEvent = sinon.spy();

    mount(<HeadInjectScript
      injectsource={mockCallback}
      injectBeforeEvent={mockCallbackInjectBeforeEvent}
    />);

    expect(mockCallbackInjectBeforeEvent.called).to.equal(true);
  });

  it('call injectDoneEvent after injectscript', () => {
    const mockCallback = () => srcTest;
    const mockCallbackInjectDoneEvent = sinon.spy();

    mount(<HeadInjectScript
      injectsource={mockCallback}
      injectDoneEvent={mockCallbackInjectDoneEvent}
    />);

    expect(mockCallbackInjectDoneEvent.called).to.equal(true);
  });

  it('if injectsource is array perform multi insert', () => {
    const mockCallback = () => srcArrayTest;

    mount(<HeadInjectScript
      injectsource={mockCallback} 
    />);

    const expectVal = '<script src="test"></script><script src="xxx"></script><script src="yyy"></script>';
    const actualVal = documentRef.head.innerHTML;

    expect(expectVal).to.equal(actualVal);
  });

  it('call callback when actually load script', done => {
    const mockCallback = () => srcMap;
    const mockCallbackInjectOnLoadEvent = sinon.spy();

    const wrapper =  mount(<HeadInjectScript
      injectsource={mockCallback}
      injectOnLoadScriptEvent={done}
    />);

    // console.log('call callback when effective load script');
  });

});
