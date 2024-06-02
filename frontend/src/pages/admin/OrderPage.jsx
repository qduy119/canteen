import { toast } from "react-toastify";
import { useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { IconButton, Tooltip } from "@mui/material";
import {
    useDeleteSeatReservationMutation,
    useGetAllSeatReservationQuery,
} from "../../services/seat";
import {
    useCancelOrderMutation,
    useGetAllOrderQuery,
} from "../../services/order";
import { useLazyGetAllPaymentQuery } from "../../services/payment";
import { useLazyGetAllUserQuery } from "../../services/privateAuth";
import {
    formatDate,
    isSeatReturned,
    getPaymentByOrderId,
    getUserByOrder,
} from "../../utils";
import AdminTable from "../../components/Table/Table";
import Status from "../../components/Status/Status";
import OrderItemDialogAdmin from "../../components/Dialog/OrderItemDialogAdmin";

export default function OrderPage() {
    const [getAllUsers, { data: users }] = useLazyGetAllUserQuery();
    const [getAllPayments, { data: payments }] = useLazyGetAllPaymentQuery();
    const { data: seats } = useGetAllSeatReservationQuery();
    const { data: orders } = useGetAllOrderQuery();
    const [cancelOrder, { isSuccess: cancelOrderSuccess }] =
        useCancelOrderMutation();
    const [deleteSeat] = useDeleteSeatReservationMutation();
    const [returnSeat, { isSuccess: returnSeatSuccess }] =
        useDeleteSeatReservationMutation();

    function handleReturnTable(seatNumber) {
        returnSeat({ seatNumber });
    }
    function handleCancelOrder(order) {
        cancelOrder({ id: order.id });
        if (order.seatNumber) {
            deleteSeat({ seatNumber: order.seatNumber });
        }
    }

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
        getAllUsers();
    }, [getAllUsers]);
    useEffect(() => {
        getAllPayments();
    }, [getAllPayments]);

    const columns = [
        {
            field: "id",
            headerName: "Tracking No.",
            headerAlign: "center",
            align: "center",
            width: 150,
        },
        {
            field: "userAvatar",
            headerName: "User",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (rowData) => {
                const user = getUserByOrder(users, rowData.row.userId);
                return (
                    <div
                        className="w-[50px] h-[50px] bg-center bg-cover rounded-md border-[1px] border-primary-light"
                        style={{
                            backgroundImage: `url(${user?.avatar})`,
                        }}
                    />
                );
            },
        },
        {
            field: "fullName",
            headerName: "Name",
            headerAlign: "center",
            align: "center",
            width: 200,
            renderCell: (rowData) => {
                const user = getUserByOrder(users, rowData.row.userId);
                return <p>{user?.fullName}</p>;
            },
        },
        {
            field: "orderDate",
            headerName: "Order Date",
            headerAlign: "center",
            align: "center",
            width: 200,
            renderCell: (rowData) => {
                return <p>{formatDate(rowData.row.orderDate)}</p>;
            },
        },
        {
            field: "payDate",
            headerName: "Pay Date",
            headerAlign: "center",
            align: "center",
            width: 200,
            renderCell: (rowData) => {
                const payment = getPaymentByOrderId(payments, rowData.row.id);
                return (
                    <p>
                        {payment?.payDate ? formatDate(payment?.payDate) : null}
                    </p>
                );
            },
        },
        {
            field: "bankCode",
            headerName: "Bank Code",
            headerAlign: "center",
            align: "center",
            width: 120,
            renderCell: (rowData) => {
                const payment = getPaymentByOrderId(payments, rowData.row.id);
                return <p>{payment?.bankCode}</p>;
            },
        },
        {
            field: "cardType",
            headerName: "Card Type",
            headerAlign: "center",
            align: "center",
            width: 120,
            renderCell: (rowData) => {
                const payment = getPaymentByOrderId(payments, rowData.row.id);
                return <p>{payment?.cardType}</p>;
            },
        },
        {
            field: "couponCode",
            headerName: "Coupon Code",
            width: 150,
            sortable: false,
        },
        {
            field: "couponTitle",
            headerName: "Coupon Title",
            width: 200,
            sortable: false,
        },
        {
            field: "discountPercentage",
            headerName: "Discount",
            headerAlign: "center",
            align: "center",
            width: 100,
            sortable: false,
            renderCell: (rowData) => (
                <p>
                    {rowData.row.discountPercentage &&
                        `${rowData.row.discountPercentage}%`}
                </p>
            ),
        },
        {
            field: "total",
            headerName: "Amount",
            headerAlign: "center",
            align: "center",
            type: "number",
            width: 150,
            renderCell: (rowData) => {
                return <p>${rowData.row.total}</p>;
            },
        },
        {
            field: "seatNumber",
            headerName: "Seat Number",
            headerAlign: "center",
            align: "center",
            width: 150,
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            width: 200,
            renderCell: (rowData) => {
                return <Status status={rowData.row.status} />;
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (rowData) => {
                return rowData.row.status === "Pending" ? (
                    <Tooltip title="Cancel Order">
                        <IconButton
                            onClick={() => handleCancelOrder(rowData.row)}
                        >
                            <CancelIcon className="hover:text-red-500 transition-all" />
                        </IconButton>
                    </Tooltip>
                ) : rowData.row.status === "Success" &&
                  rowData.row.seatNumber ? (
                    isSeatReturned(seats, {
                        orderId: rowData.row.id,
                        seatNumber: rowData.row.seatNumber,
                    }) ? null : (
                        <Tooltip title="Return Table">
                            <IconButton
                                onClick={() =>
                                    handleReturnTable(rowData.row.seatNumber)
                                }
                            >
                                <KeyboardReturnIcon className="hover:text-primary transition-all" />
                            </IconButton>
                        </Tooltip>
                    )
                ) : null;
            },
        },
        {
            field: "view",
            headerName: "View Detail",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (rowData) => {
                return <OrderItemDialogAdmin item={rowData.row} />;
            },
        },
    ];
    const rows = orders ?? [];

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-700 w-fit border-b-[3px] border-primary-light">
                ORDER
            </h1>
            <div className="bg-white px-6 py-4 rounded-md my-10">
                <AdminTable
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}
