import {
    DialogTitle,
    DialogActions,
    DialogContent,
    Dialog,
    Tooltip,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function OrderItemDialogAdmin({ item }) {
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <Tooltip title="View Detail">
                <IconButton onClick={handleOpen}>
                    <VisibilityIcon className="hover:text-primary transition-all" />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                scroll="paper"
            >
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: "medium" }}>
                    Order Detail
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
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
                                </tr>
                            </thead>
                            <tbody>
                                {item.orderItems?.map((e, i) => (
                                    <tr
                                        className="border-b border-primary-dark"
                                        key={i}
                                    >
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {e.item.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center">
                                            <div
                                                className="w-[50px] h-[50px] bg-center bg-cover rounded-md"
                                                style={{
                                                    backgroundImage: `url(${e.item.thumbnail})`,
                                                }}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            ${e.price}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {e.quantity}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </>
    );
}
