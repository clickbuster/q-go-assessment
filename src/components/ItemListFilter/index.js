import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleFilterCompleted } from '../../logic/todos';

export const ItemsListFilter = ({ checked, onToggle }) => {
  return (
    <div>
      <label>
        Filter Copmlete:
        <input className="filter-toggle" type="checkbox" onChange={onToggle} checked={checked} />
      </label>
    </div>
  );
};

ItemsListFilter.propTypes = {
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  checked: state.todos.filterCompleted
});

const mapDispatchToProps = dispatch => ({
  onToggle: () => dispatch(toggleFilterCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsListFilter);
