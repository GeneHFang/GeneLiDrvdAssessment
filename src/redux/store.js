//REDUX IMPORTS
import { 
    createStore, 
    applyMiddleware,
    //combineReducers 
} from 'redux';
import thunk from 'redux-thunk';

//REDUCER
import reducer from './reducers/reducer';

// COMBINE IF NEEDED
// const rootReducer = combineReducers({
//     first: reducer,
// })

//STORE
const store = createStore(reducer, applyMiddleware(thunk));
export default store; 