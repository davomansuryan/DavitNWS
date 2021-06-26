function CatList(state = [], action) {
  switch (action.type) {
    case "ADD_CATS":
      return [...action.payload];
    case "MORE_CAT_IMAGES":
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export default CatList;
