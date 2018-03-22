import React from 'react';
import { shallow, mount } from 'enzyme';
import { ItemsListFilter } from '../index';

const defaultProps = {
  checked: false,
  onToggle: f => f
};

describe('ItemListFilter', () => {
  it('renders without crashing', () => {
    shallow(<ItemsListFilter {...defaultProps} />);
  });

  it('should not be checked if checked property is false', () => {
    const renderedItem = shallow(<ItemsListFilter {...defaultProps} />);
    expect(renderedItem.find('.filter-toggle').props().checked).toEqual(false);
  });

  it('should be checked if checked property is true', () => {
    const renderedItem = shallow(<ItemsListFilter {...defaultProps} checked={true} />);
    expect(renderedItem.find('.filter-toggle').props().checked).toEqual(true);
  });

  it('should call onToggle', () => {
    const onToggleMock = jest.fn();
    const renderedItem = mount(
      <ItemsListFilter checked={false} onToggle={onToggleMock} />
    );

    renderedItem.find('.filter-toggle').simulate('change');
    expect(onToggleMock.mock.calls.length).toBe(1);
  });
});
