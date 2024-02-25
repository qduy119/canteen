import { useState } from "react";

import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import { NumericFormat } from "react-number-format";

import { formatDate } from "../../utils/index";

function createData(trackingNo, date, seat, status, total) {
    return { trackingNo, date, seat, status, total };
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
    {
        id: "trackingNo",
        align: "left",
        disablePadding: false,
        label: "Tracking No.",
    },
    {
        id: "date",
        align: "left",
        disablePadding: true,
        label: "Order Date",
    },
    {
        id: "seat",
        align: "center",
        disablePadding: false,
        label: "Seat Number",
    },
    {
        id: "status",
        align: "left",
        disablePadding: false,
        label: "Status",
    },
    {
        id: "total",
        align: "right",
        disablePadding: false,
        label: "Total Amount",
    },
];

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case "Pending":
            color = "text-yellow-500";
            title = "Pending";
            break;
        case "Success":
            color = "text-green-500 success";
            title = "Success";
            break;
        case "Cancel":
            color = "text-red-500 error";
            title = "Cancel";
            break;
        default:
            color = "";
            title = "None";
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography className={color}>{title}</Typography>
        </Stack>
    );
};

export default function OrderTable({ orders }) {
    const [order] = useState("desc");
    const [orderBy] = useState("trackingNo");
    const [selected] = useState([]);
    const rows = orders?.slice(0, 10)?.map((order) => {
        return createData(
            order.id,
            formatDate(order.orderDate),
            order.seatNumber,
            order.status,
            order.total
        );
    });

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    return (
        <Box>
            <TableContainer
                sx={{
                    width: "100%",
                    overflowX: "auto",
                    position: "relative",
                    display: "block",
                    maxWidth: "100%",
                    "& td, & th": { whiteSpace: "nowrap" },
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        "& .MuiTableCell-root:first-of-type": {
                            pl: 2,
                        },
                        "& .MuiTableCell-root:last-of-type": {
                            pr: 3,
                        },
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))?.map(
                            (row, index) => {
                                const isItemSelected = isSelected(
                                    row.trackingNo
                                );
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.trackingNo}
                                        selected={isItemSelected}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align="left"
                                        >
                                            <p
                                                color="secondary"
                                                className="pl-4 cursor-pointer hover:underline text-black/50"
                                            >
                                                {row.trackingNo}
                                            </p>
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.date}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.seat}
                                        </TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row.status} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <NumericFormat
                                                value={row.total}
                                                displayType="text"
                                                thousandSeparator
                                                prefix="$"
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
