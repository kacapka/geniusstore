import { combineReducers } from 'redux';
import cart from './cartReducer';
import checkout from './checkoutReducer';

const rootReducer = combineReducers({
    cart,
    checkout
});

export default rootReducer;