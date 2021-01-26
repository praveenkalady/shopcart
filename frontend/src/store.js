import { createStore,combineReducers,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer,productDetailsListReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducer';
import { userLoginReducer } from './reducers/userReducer';
const reducers = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsListReducer,
    cart:cartReducer,
    userLogin:userLoginReducer
});

const middlewares = [thunk];

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};

const initialState = {
    cart:{cartItems: cartItemsFromStorage},
    userLogin:{userInfo: userInfoFromStorage}
};

const store = createStore(reducers,initialState,compose(applyMiddleware(...middlewares),composeWithDevTools()));

export default store;