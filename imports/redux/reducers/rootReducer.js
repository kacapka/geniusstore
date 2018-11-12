import { combineReducers } from 'redux';
import cart from './cartReducer';
import checkout from './checkoutReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const cartPersistConfig = {
    storage,
    key: 'cart',
    whitelist: ['products']
};

const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cart),
    checkout
});

export default rootReducer;