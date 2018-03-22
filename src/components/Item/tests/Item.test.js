import React from 'react';
import { shallow, mount } from 'enzyme';
import { Item } from '../index';

const defaultProps = {
  data: {
    id: 3,
    content: 'test',
    completed: false
  },
  onDelete: f => f,
  onToggleComplete: f => f
};

describe('Item', () => {
  it('renders without crashing', () => {
    shallow(<Item {...defaultProps} />);
  });

  it('should display the item content', () => {
    const item = shallow(<Item {...defaultProps} />);
    expect(item.find('.content').text()).toEqual('test');
  });

  it('should should not toggle the checkbox incompleted items', () => {
    const item = shallow(<Item {...defaultProps} />);
    expect(item.find('.toggle-completed').props().checked).toEqual(false);
  });

  it('should toggle the checkbox for completed items', () => {
    const props = {
      ...defaultProps,
      data: { ...defaultProps.data, completed: true }
    };

    const item = shallow(<Item {...props} />);
    expect(item.find('.toggle-completed').props().checked).toEqual(true);
  });

  it('should call onToggleComplete with the id of data', () => {
    const onToggleCompleteMock = jest.fn();
    const renderedItem = mount(
      <Item {...defaultProps} onToggleComplete={onToggleCompleteMock} />
    );

    renderedItem.find('.toggle-completed').simulate('change');

    expect(onToggleCompleteMock.mock.calls.length).toBe(1);
    expect(onToggleCompleteMock.mock.calls[0][0]).toBe(3);
  });

  it('should call onDelete with the id of data', () => {
    const onDeleteMock = jest.fn();
    const renderedItem = mount(
      <Item {...defaultProps} onDelete={onDeleteMock} />
    );

    renderedItem.find('.delete-button').simulate('click');

    expect(onDeleteMock.mock.calls.length).toBe(1);
    expect(onDeleteMock.mock.calls[0][0]).toBe(3);
  });
});
