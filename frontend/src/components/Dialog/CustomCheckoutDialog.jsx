import {
    DialogTitle,
    DialogContent,
    Dialog,
} from "@mui/material";

export default function FormDialog({
    title,
    open,
    children,
}) {
    return (
        <Dialog
            open={open}
            disableScrollLock={true}
            scroll="paper"
            fullWidth={true}
            maxWidth={"sm"}
        >
            <DialogTitle
                sx={{ m: 0, p: 2, fontWeight: "medium", fontSize: "20px" }}
            >
                {title}
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
}
