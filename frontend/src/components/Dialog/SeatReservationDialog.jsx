import {
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    Dialog,
    Box,
    Typography,
} from "@mui/material";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { isAvailableSeat } from "../../utils";

export default function SeatReservationDialog({
    open,
    seats,
    onSetClose,
    onSetSeatNumber,
}) {
    const [selected, setSelected] = useState(null);

    function handleAddSeat() {
        onSetSeatNumber(selected);
        onSetClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onSetClose}
            disableScrollLock={true}
            scroll="paper"
        >
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
                                        isAvailableSeat(seats, seatNumber)
                                            ? ""
                                            : "Seat not available"
                                    }
                                >
                                    <span>
                                        <IconButton
                                            onClick={() =>
                                                setSelected(seatNumber)
                                            }
                                            disabled={
                                                !isAvailableSeat(
                                                    seats,
                                                    seatNumber
                                                )
                                            }
                                        >
                                            <TableRestaurantIcon
                                                className={
                                                    selected === seatNumber
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
                    <span className="font-bold">{selected ?? "None"}</span>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={handleAddSeat}
                    className="bg-primary-light hover:bg-primary-dark transition-all text-white font-medium"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
