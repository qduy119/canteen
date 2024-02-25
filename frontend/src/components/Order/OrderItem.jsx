import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PaymentsIcon from "@mui/icons-material/Payments";
import { formatDate, isSeatReturned } from "../../utils";
import Status from "../Status/Status";
import OrderItemDialog from "../Dialog/OrderItemDialog";

export default function OrderItem({
    stt,
    item,
    seats,
    payments,
    onReturnTable,
    onCancelOrder,
    onPayOrder,
    onAddReview,
}) {
    const [open, setOpen] = useState(false);
    const payment = payments?.find((payment) => payment.orderId === item.id);

    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }

    return (
        <tr className="border-b border-primary-dark">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{stt}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.id}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {formatDate(item.orderDate)}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {payment?.payDate ? formatDate(payment.payDate) : "Null"}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {payment?.bankCode ?? "Null"}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {payment?.cardType ?? "Null"}
            </td>
            <td className="whitespace-nowrap px-6 py-4">${item.total}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {item.seatNumber ?? "Null"}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center justify-center">
                    <Status status={item.status} />
                </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <div className="flex gap-2 items-center justify-center">
                    {item.status === "Pending" ? (
                        <>
                            <Tooltip title="Pay">
                                <IconButton
                                    onClick={() =>
                                        onPayOrder({
                                            order: item,
                                        })
                                    }
                                >
                                    <PaymentsIcon className="hover:text-green-500 transition-all" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel Order">
                                <IconButton
                                    onClick={() =>
                                        onCancelOrder({
                                            order: item,
                                            seatNumber: item.seatNumber,
                                        })
                                    }
                                >
                                    <CancelIcon className="hover:text-red-500 transition-all" />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : item.status === "Success" && item.seatNumber ? (
                        isSeatReturned(seats, {
                            orderId: item.id,
                            seatNumber: item.seatNumber,
                        }) ? null : (
                            <Tooltip title="Return Table">
                                <IconButton
                                    onClick={() =>
                                        onReturnTable(item.seatNumber)
                                    }
                                >
                                    <KeyboardReturnIcon className="hover:text-primary transition-all" />
                                </IconButton>
                            </Tooltip>
                        )
                    ) : null}
                </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Tooltip title="View Detail">
                    <IconButton onClick={handleOpen}>
                        <VisibilityIcon className="hover:text-primary transition-all" />
                    </IconButton>
                </Tooltip>
                <OrderItemDialog
                    open={open}
                    onSetClose={handleClose}
                    item={item}
                    onAddReview={onAddReview}
                />
            </td>
        </tr>
    );
}
