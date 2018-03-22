import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Item from '../Item';
import './styles.css';

export const ItemsList = ({ items, filterCompleted }) => {
  const list = filterCompleted ? items.filter(i => !i.completed) : items;

  return (
    <div>
      <ul className="itemsList-ul">
        {list.length < 1 && <p id="items-missing">Add some tasks above.</p>}
        {list.map(item =>
          <li key={item.id}><Item data={item} /></li>
        )}
      </ul>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    items: state.todos.items,
    filterCompleted: state.todos.filterCompleted
  };
};

export default connect(mapStateToProps)(ItemsList);
