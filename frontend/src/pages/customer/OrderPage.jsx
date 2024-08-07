import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonIcon from "@mui/icons-material/Person";
import OrderItem from "../../components/Order/OrderItem";
import {
    useDeleteSeatReservationMutation,
    useGetAllSeatReservationQuery,
} from "../../services/seat";
import {
    useCancelOrderMutation,
    useLazyGetAllOrderByUserIdQuery,
} from "../../services/order";
import {
    useCreatePaymentUrlMutation,
    useLazyGetPaymentQuery,
} from "../../services/payment";
import OrderPagination from "../../components/Pagination/DefaultPagination";
import { useGetMeQuery } from "../../services/privateAuth";

export default function OrderPage() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get("page") || "1", 10);
    const [getAllOrders, { data: orders }] = useLazyGetAllOrderByUserIdQuery();
    const { data: seats } = useGetAllSeatReservationQuery();
    const { data: user } = useGetMeQuery();
    const [getPayment, { data: payments }] = useLazyGetPaymentQuery();
    const [cancelOrder, { isSuccess: cancelOrderSuccess }] =
        useCancelOrderMutation();
    const [returnSeat, { isSuccess: returnSeatSuccess }] =
        useDeleteSeatReservationMutation();
    const [deleteSeat] = useDeleteSeatReservationMutation();
    const [
        createPaymentUrl,
        { data: paymentUrl, isSuccess: createPaymentUrlSuccess },
    ] = useCreatePaymentUrlMutation();

    function handleReturnTable(seatNumber) {
        returnSeat({ seatNumber });
    }
    function handleCancelOrder({ order, seatNumber }) {
        cancelOrder({ id: order.id });
        if (seatNumber) {
            deleteSeat({ seatNumber });
        }
    }
    function handlePayOrder({ order }) {
        createPaymentUrl({
            orderId: order.id,
            amount: order.total,
            bankCode: "NCB",
        });
    }

    useEffect(() => {
        if (createPaymentUrlSuccess) {
            const { url } = paymentUrl;
            window.location.href = url;
        }
    }, [createPaymentUrlSuccess, paymentUrl]);
    useEffect(() => {
        if (returnSeatSuccess) {
            toast.success("Return table successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [returnSeatSuccess]);
    useEffect(() => {
        if (cancelOrderSuccess) {
            toast.success("Cancel order successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [cancelOrderSuccess]);
    useEffect(() => {
        getPayment({ userId: user.id });
    }, [getPayment, user?.id]);
    useEffect(() => {
        getAllOrders({ userId: user?.id, page, per_page: 10 });
    }, [getAllOrders, page, user?.id]);

    return (
        <div className="min-h-screen px-5 py-8">
            <Link to="/" className="hover:underline text-primary">
                <ArrowBackIosNewIcon />
                BACK TO HOME PAGE
            </Link>
            <div className="rounded-lg mt-4 min-h-[500px]">
                <div className="flex items-center px-3 py-2 gap-1">
                    <PersonIcon />
                    MY ORDER
                </div>
                <div className="z-[1000] w-full h-[1px] bg-black/20" />
                <div className="p-5 overflow-x-scroll">
                    <table className="min-w-full text-center table-auto">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Tracking No.
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Order ID
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Order Date
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Pay Date
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Bank Code
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Card Type
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Coupon Code
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Coupon Title
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Discount Percentage
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Seat Number
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Action
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Detail
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders?.data?.map((item, index) => (
                                <OrderItem
                                    key={index}
                                    item={item}
                                    seats={seats}
                                    payments={payments}
                                    onReturnTable={handleReturnTable}
                                    onCancelOrder={handleCancelOrder}
                                    onPayOrder={handlePayOrder}
                                    stt={(page - 1) * 10 + index + 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center mt-10">
                    <OrderPagination
                        total={orders?.["total_pages"]}
                        page={page}
                    />
                </div>
            </div>
        </div>
    );
}
