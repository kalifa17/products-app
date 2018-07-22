import * as actionTypes from '../actions/actionTypes';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type){
        case actionTypes.FETCH_PRODUCTS_BEGIN:
            return {
              ...state,
              loading: false,
              error: null
            };
      
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            initialState.items = action.payload.products;
            return {
              ...state,
              loading: false,
              items: action.payload.products
            };

        case actionTypes.FETCH_PRODUCTS_FAILURE:
            console.error(action);
            console.error(action.payload);
            console.error(action.payload.error);
            return {
              ...state,
              loading: false,
              error: action.payload.error,
              items: []
            };
        case actionTypes.FILTER_PRODUCTS:
            let filteresProducts = initialState.items.filter(obj => Object.keys(obj).some(key => key !== 'categories' ? obj[key].toString().toLowerCase().includes(action.searchValue.toLowerCase()):''));
            return {
                items: filteresProducts,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};
