import React from 'react';
import { shallow, mount } from 'enzyme';
import Emoji from './Emoji';

describe('rendering Emoji component', () => {

  it('renders without crashing', () => {
    const component = shallow(<Emoji symbol="🙂" />);
    expect(component).toMatchSnapshot();
  });

});
  
describe('Emoji component accessibility', () => {

  it('sets aria-hidden when no label is passed', () => {
    const component = mount(<Emoji symbol="🙂" />);
    expect(component.find({ className: "emoji" }).prop('aria-hidden')).toBe(true);
  });

  it('sets aria-hidden when no label is passed', () => {
    const component = mount(<Emoji symbol="🙂" />);
    expect(component.find({ className: "emoji" }).prop('aria-hidden')).toBe(true);
    expect(component.find({ className: "emoji" }).prop('aria-label')).toBe(undefined);
  });

  it('sets aria-hidden when a label is passed', () => {
    const component = mount(<Emoji symbol="🙂" label="testing label" />);
    expect(component.find({ className: "emoji" }).prop('aria-hidden')).toBe(undefined);
    expect(component.find({ className: "emoji" }).prop('aria-label')).toBe("testing label");
  });

  it('sets role as img', () => {
    const component = mount(<Emoji symbol="🙂" />);
    expect(component.find({ className: "emoji" }).prop('role')).toBe("img");
  });

});

