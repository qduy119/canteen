import {
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CouponItem from "../Coupon/CouponItem";
import { useState } from "react";

export default function CouponSelectionDialog({
    open,
    coupons,
    onSetCoupon,
    onSetClose,
}) {
    const [coupon, setCoupon] = useState(null);

    function handleSelectCoupon() {
        onSetClose();
        onSetCoupon(coupon);
    }

    return (
        <Dialog
            open={open}
            onClose={onSetClose}
            disableScrollLock={true}
            scroll="paper"
        >
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: "medium" }}>
                Select an coupon
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
                {coupons?.map((coupon, index) => (
                    <CouponItem
                        coupon={coupon}
                        key={index}
                        onSetCoupon={setCoupon}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSelectCoupon}
                    className="bg-primary-light hover:bg-primary-dark transition-all text-white font-medium"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
