import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { useModifyCartItemsMutation } from "../../services/cart";
import getItemsInCart from "../../features/cart/getItemsInCart";
import { formatPrice } from "../../utils";

export default function CartItem({
    user,
    isChecked,
    cart,
    onSetSelect,
    onDeleteCartItem,
}) {
    const dispatch = useDispatch();
    const [updateCartItem, { isSuccess: updateCartItemSuccess }] =
        useModifyCartItemsMutation();

    function handleModify(type = -1) {
        const { item, ...cartItem } = cart;
        if (type === -1) {
            if (cartItem.quantity > 1) {
                updateCartItem({
                    id: cartItem.id,
                    quantity: cartItem.quantity - 1,
                });
            }
        } else {
            if (item.stock >= 1) {
                updateCartItem({
                    id: cartItem.id,
                    quantity: cartItem.quantity + 1,
                });
            }
        }
    }

    useEffect(() => {
        if (updateCartItemSuccess) {
            dispatch(getItemsInCart({ userId: user.id }));
        }
    }, [updateCartItemSuccess, dispatch, user.id]);

    return (
        <tr className="border-b border-primary-dark">
            <td className="whitespace-nowrap px-6 py-4 font-medium">
                <label htmlFor="check" className="hidden"></label>
                <input
                    type="checkbox"
                    name="check"
                    id="check"
                    checked={isChecked}
                    value={cart.id ?? -1}
                    onChange={(e) => onSetSelect(e)}
                />
            </td>
            <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center">
                <div
                    className="w-[50px] h-[50px] bg-center bg-cover rounded-md"
                    style={{
                        backgroundImage: `url(${cart.item.thumbnail})`,
                    }}
                />
            </td>
            <td className="whitespace-nowrap px-6 py-4">{cart.item.name}</td>
            <td className="whitespace-nowrap px-6 py-4">
                <IconButton onClick={() => handleModify()}>
                    <RemoveIcon />
                </IconButton>
                <label htmlFor="quantity" className="hidden"></label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={1}
                    max={cart.item.stock}
                    value={cart.quantity ?? 0}
                    className="border border-gray-200 text-center w-[50px] rounded-sm"
                    disabled
                />
                <IconButton onClick={() => handleModify(1)}>
                    <AddIcon />
                </IconButton>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                $
                {formatPrice(
                    cart.item.price *
                        (1 - cart.item.discount * 0.01) *
                        cart.quantity
                )}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <IconButton onClick={() => onDeleteCartItem(cart)}>
                    <DeleteIcon />
                </IconButton>
            </td>
        </tr>
    );
}
