import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteItem, toggleItemCompleted } from '../../logic/todos';

export const Item = ({ data, onDelete, onToggleComplete }) => {
  return (
    <div>
      <label>
        <input type="checkbox"
          className="toggle-completed"
          onChange={() => onToggleComplete(data.id)}
          checked={!!data.completed}
        />
        <span className="content">{data.content}</span>
      </label>
      <button className="delete-button" onClick={() => onDelete(data.id)}>
        Delete
      </button>
    </div>
  )
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(deleteItem(id)),
  onToggleComplete: id => dispatch(toggleItemCompleted(id)),
});

export default connect(null, mapDispatchToProps)(Item);