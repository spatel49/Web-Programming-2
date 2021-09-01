import { v4 as uuid } from 'uuid';
const initalState = [
  {
    pageTerm: "",
    loading: false,
    charactersData: undefined,
    searchData: undefined,
    searchTerm: ""
  }
];

let copyState = null;
let index = 0;

const searchReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_SEARCH':
      console.log('payload', payload);
      return [
        ...state,
        { pageTerm: "", loading: false, charactersData: undefined, searchData: payload.searchData, searchTerm: payload.searchTerm }
      ];
    case 'LOADING_TRUE':
      copyState = [...state];
      index = copyState.findIndex((x) => x.pageTerm === payload.pageTerm);
      copyState[index].loading = true;
      return [...copyState];
    case 'LOADING_FALSE':
      copyState = [...state];
      index = copyState.findIndex((x) => x.pageTerm === payload.pageTerm);
      copyState[index].loading = false;
      return [...copyState];
    default:
      return state;
  }
};

export default searchReducer;