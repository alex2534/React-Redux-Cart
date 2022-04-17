/** @format */

import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

import classes from "./CartButton.module.css";

const CartButton = (props) => {
	//by doing it i have acces to the useDispatch hook in the dispatch constante
	const dispatch = useDispatch();

	//in here we access the quantity in the cartslice
	const cartQuantity = useSelector((state) => state.cart.totalQuantity);

	const toggleCartHandler = () => {
		/*in Here i call the dispatch function and pass the uiActions.toggle as a
		 argument so a can use it in here and in here we execute the toggle function
     */

		dispatch(uiActions.toggle());
	};
	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQuantity}</span>
		</button>
	);
};

export default CartButton;
