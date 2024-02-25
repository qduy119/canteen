import { useState } from "react";
import { DialogTitle, DialogContent, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ReviewImage({ image }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <img
                src={image}
                width={100}
                height={100}
                className="object-cover cursor-pointer"
                onClick={() => setOpen(true)}
            />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                disableScrollLock={true}
                scroll="paper"
            >
                <DialogTitle sx={{ m: 0, p: 2, fontWeight: "medium" }}>
                    Feedback
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setOpen(false)}
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
                    <img src={image} className="object-cover" />
                </DialogContent>
            </Dialog>
        </>
    );
}
