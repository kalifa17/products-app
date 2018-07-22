import * as actionTypes from './actionTypes';

export const filterProducts = (searchValue) => {
  return {
    type: actionTypes.FILTER_PRODUCTS,
    searchValue: searchValue
  }
};

export const fetchProductsBegin = () => ({
  type: actionTypes.FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
  type: actionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: { products }
});

export const fetchProductsError = error => ({
  type: actionTypes.FETCH_PRODUCTS_FAILURE,
  payload: { error }
});

export function fetchProducts() {
    let header = new Headers({
        'Access-Control-Allow-Origin':'*',
        'Content-Type': 'multipart/form-data'
    });
    let sendData = {
        mode: 'cors',
        header: header
    };
    return dispatch => {
      dispatch(fetchProductsBegin());
      return fetch("http://localhost:3000/api/products/", sendData)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
          console.log(json);
          dispatch(fetchProductsSuccess(json));
          return json;
        })
        .catch(error => dispatch(fetchProductsError(error)));
    };
}
  
function handleErrors(response) {
    if (!response.ok) {
        console.error(response);
        throw Error(response.statusText);
    }
    return response;
}