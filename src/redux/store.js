//REDUX IMPORTS
import { 
    createStore, 
    applyMiddleware,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

//REDUCER
import reducer from './reducers/reducer';

//PERSIST CONFIG
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducer);

// COMBINE IF NEEDED
// const rootReducer = combineReducers({
//     first: reducer,
// })


//STORE

    export let store = createStore(persistedReducer, applyMiddleware(thunk));
    export let persistor = persistStore(store);

 