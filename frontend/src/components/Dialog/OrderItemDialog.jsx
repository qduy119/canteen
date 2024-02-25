import {
    DialogTitle,
    DialogActions,
    DialogContent,
    Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Toast from "../Toast/Toast";
import OrderItemDialogItem from "../Order/OrderItemDialogItem";

export default function OrderItemDialog({ open, onSetClose, item }) {
    return (
        <Dialog
            open={open}
            onClose={onSetClose}
            disableScrollLock={true}
            scroll="paper"
        >
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: "medium" }}>
                Order Detail
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onSetClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <div className="overflow-x-scroll">
                    <table className="min-w-full text-center table-auto">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Thumbnail
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-4">
                                    Feedback
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.orderItems?.map((e, i) => (
                                <OrderItemDialogItem
                                    key={i}
                                    item={e}
                                    status={item.status}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </DialogContent>
            <DialogActions></DialogActions>
            <Toast />
        </Dialog>
    );
}
