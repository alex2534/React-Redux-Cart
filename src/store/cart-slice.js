/** @format */

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		items: [],
		totalQuantity: 0,
		totalAmount: 0,
		changed: false,
	},
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			/*In here we are checking if the item already existis in the cart
			 */
			const existingItem = state.items.find((item) => item.id === newItem.id);
			/*if the item does not exist in the cart then we add it as a new item
                and the only reasen we can use the push method in here is because 
                we are using the @reactjs/toolkit if it was the redux we couln't use
                the push method in here because it would manipulate the state direct */
			state.totalQuantity++;
			state.changed = true;
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
				//if it existis in the cart than we increase the number of  same item in the cart
			} else {
				existingItem.quantity = existingItem.quantity + 1;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},
		remomveItemFromCart(state, action) {
			const id = action.payload;
			/*In here we are checking if the item already existis in the cart
			 */
			const existingItem = state.items.find((item) => item.id === id);
			state.totalQuantity--;
			state.changed = true;
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;
