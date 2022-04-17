/** @format */
import { useEffect, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { sendCartData, fetchCartData } from "./store/cart-actions";

import Notification from "./components/UI/Notification";

let isInitial = true;
function App() {
	const dispatch = useDispatch();
	/*To use useSelector we have to pass a funciton to it and the function receives 
  the readux-state automatic because this function will be executed by react-redux
  and then we shold pass the data we want to use in this component and in this case 
  it is the cartIsVisible value and this is  (state.ui.cartIsVisible) the way we extract the value we need
  */
	const showCart = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		if (cart.changed) {
			dispatch(sendCartData(cart));
		}
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{/* and that's how we use it in here to show or hide the cart component */}
				{showCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
