import {
    DialogTitle,
    DialogContent,
    Dialog,
    DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export default function FormDialog({
    title,
    open,
    onSetClose,
    children,
}) {
    return (
        <Dialog
            open={open}
            onClose={onSetClose}
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
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions></DialogActions>
        </Dialog>
    );
}
