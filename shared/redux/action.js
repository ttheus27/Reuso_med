export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_QUANTITY = 'UPDATE_CART_QUANTITY';

export const ThemeChanger = (value) => async (dispatch) => {
    dispatch({
        type: "ThemeChanger",
        payload: value
    });
};

export const setSelectedItem = (item) => ({
    type: "SET_SELECTED_ITEM",
    payload: item
});

export const addToWishlist = (item, id) => ({
    type: "ADD_TO_WISHLIST",
    payload: { ...item, id }
});

export const removeFromWishlist = (id) => ({
    type: "REMOVE_FROM_WISHLIST",
    payload: id
});

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item
});

export const addToCheckout = (items) => ({
    type: 'ADD_TO_CHECKOUT',
    payload: items,
    actionType: 'shoppingCartCheckOut'
  });

export const buynow = (item) => ({
    type: 'Buynow_checkout',
    payload: item,
    actionType: 'shopDetailsBuyNow'
});

export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id
});

export const updateCartQuantity = (id, quantity) => ({
    type: UPDATE_CART_QUANTITY,
    payload: { id, quantity }
  });
 
