import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAddOrderMutation } from "../../services/order";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SeatReservationDialog from "../../components/Dialog/SeatReservationDialog";
import { formatPrice } from "../../utils";
import {
    useDeleteCartItemsMutation,
    useModifyCartItemsMutation,
} from "../../services/cart";
import { useAddOrderItemsMutation } from "../../services/orderitem";
import {
    useAddSeatReservationMutation,
    useLazyGetAllSeatReservationQuery,
} from "../../services/seat";
import { useCreatePaymentUrlMutation } from "../../services/payment";
import { useLazyGetAllCouponQuery } from "../../services/coupon";
import getItemsInCart from "../../features/cart/getItemsInCart";
import CustomCheckoutDialog from "../../components/Dialog/CustomCheckoutDialog";
import CouponSelectionDialog from "../../components/Dialog/CouponSelectionDialog";
import { toast } from "react-toastify";
import CheckoutItem from "../../components/Checkout/CheckoutItem";
import { useGetMeQuery } from "../../services/privateAuth";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { data: user } = useGetMeQuery();
    const cartItems = useSelector((state) => state.cart.items);
    const items = location.state?.items;
    const [getAllSeat, { data: seats }] = useLazyGetAllSeatReservationQuery();
    const [getAllCoupon, { data: coupons }] = useLazyGetAllCouponQuery();
    const [addOrder, { data: order, isSuccess: addOrderSuccess }] =
        useAddOrderMutation();
    const [deleteCartItem, { isSuccess: deleteCartItemSuccess }] =
        useDeleteCartItemsMutation();
    const [modifyCartItem, { isSuccess: modifyCartItemSuccess }] =
        useModifyCartItemsMutation();
    const [addOrderItem] = useAddOrderItemsMutation();
    const [addSeatReservation] = useAddSeatReservationMutation();
    const [
        createPaymentUrl,
        { data: paymentUrl, isSuccess: createPaymentUrlSuccess },
    ] = useCreatePaymentUrlMutation();
    const [open, setOpen] = useState(false);
    const [couponOpen, setCouponOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [seatNumber, setSeatNumber] = useState(null);
    const [coupon, setCoupon] = useState(null);

    const getPrice = () =>
        items.reduce((total, item) => {
            total += Number(
                formatPrice(
                    item.quantity *
                        item.item.price *
                        (1 - item.item.discount * 0.01)
                )
            );
            return total;
        }, 0);
    const getDiscount = () =>
        coupon ? 0.01 * coupon.discountPercentage * getPrice() : 0;
    const getTotalPrice = () => getPrice() - getDiscount();

    function handleCouponOpen() {
        getAllCoupon();
        setCouponOpen(true);
    }
    function handleCouponClose() {
        setCouponOpen(false);
    }
    function handleDialogOpen() {
        getAllSeat();
        setOpen(true);
    }
    function handleDialogClose() {
        setOpen(false);
    }
    function handleSeatNumber(number) {
        setSeatNumber(number);
    }
    function handleCoupon(code) {
        setCoupon(code);
    }
    function handleCheckout() {
        const payload = {
            orderDate: new Date(),
            total: getTotalPrice(),
            seatNumber,
            userId: user.id,
        };
        if (coupon) {
            payload.couponCode = coupon.code;
            payload.couponTitle = coupon.title;
            payload.discountPercentage = coupon.discountPercentage;
        }
        addOrder(payload);
        items.forEach((item) => {
            const found = cartItems.find((cartItem) => cartItem.id == item.id);
            if (item.quantity === found.quantity) {
                deleteCartItem({ id: found.id });
            } else if (item.quantity < found.quantity) {
                modifyCartItem({
                    id: found.id,
                    quantity: found.quantity - item.quantity,
                });
            }
        });
    }
    function handlePayLater() {
        navigate("/order");
    }
    function handlePayNow() {
        createPaymentUrl({
            orderId: order.id,
            amount: formatPrice(getTotalPrice()),
            bankCode: "NCB",
        });
    }

    useEffect(() => {
        if (addOrderSuccess) {
            const orderId = order.id;
            items.forEach((item) => {
                addOrderItem({
                    itemId: item.item.id,
                    orderId,
                    quantity: item.quantity,
                    price: formatPrice(
                        item.item.price *
                            (1 - item.item.discount * 0.01) *
                            item.quantity
                    ),
                });
            });
            if (seatNumber) {
                addSeatReservation({ seatNumber, orderId });
            }
            toast.success("Place order successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setModalOpen(true);
        }
    }, [
        addOrderSuccess,
        items,
        seatNumber,
        addOrderItem,
        addSeatReservation,
        order?.id,
    ]);
    useEffect(() => {
        if (deleteCartItemSuccess || modifyCartItemSuccess) {
            dispatch(getItemsInCart({ userId: user.id }));
        }
    }, [deleteCartItemSuccess, modifyCartItemSuccess, dispatch, user?.id]);
    useEffect(() => {
        if (createPaymentUrlSuccess) {
            const { url } = paymentUrl;
            window.location.href = url;
        }
    }, [createPaymentUrlSuccess, paymentUrl]);

    return (
        <div className="min-h-screen px-5 py-8">
            <Link to="/" className="hover:underline text-primary">
                <ArrowBackIosNewIcon />
                BACK TO HOME PAGE
            </Link>
            <div className="mt-4">
                <div className="flex-1">
                    <p className="font-medium text-xl sm:text-2xl text-center px-2">
                        Current Cart
                    </p>
                    <div className="p-5 overflow-x-scroll">
                        <table className="min-w-full text-center table-auto bg-white rounded-md">
                            <thead className="font-medium border-b border-primary">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Thumbnail
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <CheckoutItem
                                        key={index}
                                        i={index}
                                        item={item}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-5">
                        <div className="float-right">
                            <table className="border-spacing-2 border-separate">
                                <tbody className="text-lg">
                                    <tr>
                                        <td>
                                            <p className="font-medium text-primary-light">
                                                PRICE
                                            </p>
                                        </td>
                                        <td>
                                            <span className="font-bold text-primary">
                                                {formatPrice(getPrice())}$
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="font-medium text-primary-light">
                                                DISCOUNT
                                            </p>
                                        </td>
                                        <td>
                                            <span className="font-bold text-primary">
                                                {formatPrice(getDiscount())}$
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="font-medium text-primary-light">
                                                TOTAL
                                            </p>
                                        </td>
                                        <td>
                                            <span className="font-bold text-primary">
                                                {formatPrice(getTotalPrice())}$
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <p className="text-xl font-medium mt-4 text-primary-light">
                                PRICE:{" "}
                                <span className="font-bold text-primary">
                                    {formatPrice(getPrice())}$
                                </span>
                            </p>
                            <p className="text-xl font-medium mt-2 text-primary-light">
                                DISCOUNT:{" "}
                                <span className="font-bold text-primary">
                                    {formatPrice(getDiscount())}$
                                </span>
                            </p>
                            <p className="text-xl font-medium mt-2 text-primary-light">
                                TOTAL:{" "}
                                <span className="font-bold text-primary">
                                    {formatPrice(getTotalPrice())}$
                                </span>
                            </p> */}
                        </div>
                        <button
                            type="button"
                            onClick={() => handleDialogOpen()}
                            className="mt-2 py-2 px-5 bg-primary hover:bg-primary-dark text-white rounded font-semibold transition-all"
                        >
                            SEAT RESERVATION
                        </button>
                        <p className="mt-2 text-primary font-medium">
                            No. seat:{" "}
                            <span className="font-bold">
                                {seatNumber ?? "None"}
                            </span>
                        </p>
                        <div
                            onClick={() => handleCouponOpen()}
                            className="mt-4 p-2 border-primary border-[1px] rounded-md w-fit text-primary cursor-pointer"
                        >
                            {coupon ? (
                                <p>
                                    <LocalOfferIcon className="mr-1" />
                                    {coupon.title} {coupon.discountPercentage}%
                                    OFF
                                </p>
                            ) : (
                                <p>
                                    Coupon
                                    <ChevronRightIcon />
                                </p>
                            )}
                        </div>
                        <SeatReservationDialog
                            open={open}
                            seats={seats}
                            onSetSeatNumber={handleSeatNumber}
                            onSetClose={handleDialogClose}
                        />
                        <CouponSelectionDialog
                            open={couponOpen}
                            onSetClose={handleCouponClose}
                            onSetCoupon={handleCoupon}
                            coupons={coupons}
                        />
                    </div>
                </div>
                <div className="p-5">
                    <button
                        type="button"
                        className="uppercase font-bold text-lg py-[10px] bg-primary hover:bg-primary-dark w-full rounded text-white transition-all duration-300"
                        onClick={handleCheckout}
                    >
                        PLACE ORDER
                    </button>
                </div>
            </div>
            <CustomCheckoutDialog title={"Select a method"} open={modalOpen}>
                <div className="flex gap-5">
                    <button
                        type="button"
                        className="uppercase font-bold text-lg py-[10px] bg-gray-400 hover:bg-gray-500 w-full rounded text-white transition-all duration-300"
                        onClick={handlePayLater}
                    >
                        PAY LATER
                    </button>
                    <button
                        type="button"
                        className="uppercase font-bold text-lg py-[10px] bg-primary hover:bg-primary-dark w-full rounded text-white transition-all duration-300"
                        onClick={handlePayNow}
                    >
                        PAY NOW
                    </button>
                </div>
            </CustomCheckoutDialog>
        </div>
    );
}
