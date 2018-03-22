import reducer, {
  initialState,
  addItem,
  deleteItem,
  toggleFilterCompleted,
  toggleItemCompleted,
} from '../todos';

const testState = {
  items: [
    { id: 1, content: 'first' },
    { id: 2, content: 'second' },
  ]
};

describe.only('reducer', () => {
  let state;

  beforeEach(() => state = { items: [...testState.items] });

  it('should return state for unknown action', () => {
    const mockState = { test: 'testItem' };
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(mockState, mockAction);

    expect(result).toEqual(mockState);
  });

  it('should use initial state if state not provided', () => {
    const mockAction = { type: 'mystery-meat' };
    const result = reducer(undefined, mockAction);

    expect(result).toEqual(initialState);
  });

  it('should add new items on ADD_ITEM', () => {
    const mockAction = addItem('third');
    const result = reducer(state, mockAction);

    expect(result.items).toHaveLength(3);
    expect(result.items[2].id).toEqual(3);
    expect(result.items[2].content).toEqual('third');
  });

  it('shoulde delete items by id on DELETE_ITEM', () => {
    const mockAction = deleteItem(1);
    const result = reducer(state, mockAction);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toEqual(2);
    expect(result.items[0].content).toEqual('second');
  });

  it('should toggle the completed flag of an item on TOGGLE_ITEM_COMPLETED', () => {
    const mockAction = toggleItemCompleted(1);

    const result = reducer(state, mockAction);
    const item = result.items.find(i => i.id === 1);
    expect(item.completed).toEqual(true);

    const nextResult = reducer(result, mockAction);
    const nextItem = nextResult.items.find(i => i.id === 1);
    expect(nextItem.completed).toEqual(false);
  });

  it('should toggle the completion filter on TOGGLE_FILTER_COMPLETED', () => {
    const state = {
      filterCompleted: true
    };

    const mockAction = toggleFilterCompleted();
    const result = reducer(state, mockAction);
    const nextResult = reducer(result, mockAction);

    expect(result.filterCompleted).toEqual(false);
    expect(nextResult.filterCompleted).toEqual(true);
  });
});
