import {
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    Dialog,
    Box,
    Typography,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { isAvailableSeat } from "../../utils";

export default function SeatReservationDialog({
    open,
    data,
    currentSeat,
    onSetClose,
    onSetSeatNumber,
}) {
    return (
        <Dialog open={open} onClose={onSetClose} disableScrollLock={true} scroll="paper">
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: "medium" }}>
                Select an available seat
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
                <div className="grid grid-cols-5 gap-10">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(
                        (seatNumber) => (
                            <Box key={seatNumber}>
                                <Tooltip
                                    title={
                                        isAvailableSeat(data, seatNumber)
                                            ? ""
                                            : "Seat not available"
                                    }
                                >
                                    <span>
                                        <IconButton
                                            onClick={() =>
                                                onSetSeatNumber(seatNumber)
                                            }
                                            disabled={
                                                !isAvailableSeat(
                                                    data,
                                                    seatNumber
                                                )
                                            }
                                        >
                                            <TableRestaurantIcon
                                                className={
                                                    currentSeat === seatNumber
                                                        ? "text-primary"
                                                        : ""
                                                }
                                            />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Typography className="font-medium">
                                    Seat {seatNumber}
                                </Typography>
                            </Box>
                        )
                    )}
                </div>
                <Typography className="mt-5 font-medium text-primary">
                    Your seat:{" "}
                    <span className="font-bold">{currentSeat ?? "None"}</span>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={onSetClose}
                    className="bg-primary-light hover:bg-primary-dark transition-all text-white font-medium"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
