import React from 'react';
import { shallow } from 'enzyme';
import { ItemsList } from '../index';

const defaultProps = {
  items: [],
};

describe('ItemsList', () => {
  it('renders without crashing', () => {
    shallow(<ItemsList {...defaultProps} />);
  });

  it('should display warning message if no items', () => {
    const renderedItem = shallow(<ItemsList {...defaultProps} items={[]} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(1);
  });

  it('should not display warning message if items are present', () => {
    const items = [{ id: 1, content: 'Test 1' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('#items-missing')).toHaveLength(0);
  });

  it('should render items as list items', () => {
    const items = [{ id: 1, content: 'Test 1' }, { id: 2, content: 'Test 2' }];
    const renderedItem = shallow(<ItemsList {...defaultProps} items={items} />);
    expect(renderedItem.find('li')).toHaveLength(2);
  });

  it('should filter items correctly', () => {
    const items = [
      { id: 1, content: 'Test1', completed: true },
      { id: 2, content: 'Test2', completed: false },
      { id: 3, content: 'Test3', completed: false },
      { id: 4, content: 'Test4', completed: true },
      { id: 5, content: 'Test5', completed: false },
    ];

    const renderedItem = shallow(
      <ItemsList {...defaultProps} items={items} filterCompleted={true} />
    );

    const results = renderedItem.find('li');
    expect(results).toHaveLength(3);
    expect(results.nodes[0].key).toEqual('2');
    expect(results.nodes[1].key).toEqual('3');
    expect(results.nodes[2].key).toEqual('5');
  });
});
