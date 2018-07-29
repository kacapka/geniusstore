const cart = (state = [], action) => {

    switch(action.type) {
        case 'ADD_CART':
            return action.payload;
        default:
            return state;
    }

}

export default cart;