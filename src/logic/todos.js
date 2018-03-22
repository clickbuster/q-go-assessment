export const ADD_ITEM = 'qgo/assessment/ADD_ITEM';
export const DELETE_ITEM = 'qgo/assessment/DELETE_ITEM';
export const TOGGLE_ITEM_COMPLETED = 'qgo/assessment/TOGGLE_ITEM_COMPLETED';
export const TOGGLE_FILTER_COMPLETED = 'qgo/assessment/TOGGLE_FILTER_COMPLETED';

export const addItem = content => ({ type: ADD_ITEM, content });
export const deleteItem = id => ({ type: DELETE_ITEM, id });
export const toggleItemCompleted = id => ({ type: TOGGLE_ITEM_COMPLETED, id });
export const toggleFilterCompleted = () => ({ type: TOGGLE_FILTER_COMPLETED });

export const initialState = {
  filterCompleted: false,
  items: [
    { id: 1, content: 'Call mum', completed: true },
    { id: 2, content: 'Buy cat food' },
    { id: 3, content: 'Water the plants' },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const nextId =
        state.items.reduce((id, item) => Math.max(item.id, id), 0) + 1;
      const newItem = {
        id: nextId,
        content: action.content,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };

    case DELETE_ITEM:
      const index = state.items.findIndex(i => i.id === action.id);
      state.items.splice(index, 1);

      return {
        ...state,
        items: [...state.items]
      };

    case TOGGLE_ITEM_COMPLETED:
      const itemIndex = state.items.findIndex(i => i.id === action.id);
      const item = state.items[itemIndex];

      state.items[itemIndex] = {
        ...item,
        completed: !item.completed
      };

      return {
        ...state,
        items: [...state.items]
      };

    case TOGGLE_FILTER_COMPLETED:
      return {
        ...state,
        filterCompleted: !state.filterCompleted
      };
  
    default:
      return state;
  }
};

export default reducer;
