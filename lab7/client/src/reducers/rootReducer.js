import { combineReducers } from 'redux';
import charactersReducer from './charactersReducer';
import comicsReducer from './comicsReducer';
import seriesReducer from './seriesReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  charactersPage: charactersReducer,
  comicsPage: comicsReducer,
  seriesPage: seriesReducer,
  searchPage: searchReducer
});

export default rootReducer;