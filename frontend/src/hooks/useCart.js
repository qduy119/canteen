import { useDispatch, useSelector } from "react-redux";
import getItemsInCart from "../features/cart/getItemsInCart";
import { useEffect } from "react";

export default function useCart() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const cartItems = useSelector((state) => state.cart.items);
    const isLoading = useSelector(
        (state) => state.cart.getItemsInCart.isLoading
    );
    const error = useSelector((state) => state.cart.getItemsInCart.error);

    useEffect(() => {
        if (user) {
            dispatch(getItemsInCart({ userId: user.id }));
        }
    }, [dispatch, user]);

    return { isLoading, error, cartItems };
}
