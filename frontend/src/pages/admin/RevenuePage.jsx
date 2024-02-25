import {
    Box,
    Button,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import SalesColumnChart from "../../components/Chart/SalesColumnChart";
import RevenueBarChart from "../../components/Chart/RevenueBarChart";
import MainCard from "../../components/Card/MainCard";
import { useEffect, useState } from "react";
import { getTotalProfit, getTotalRevenue } from "../../utils";
import { useLazyGetAllOrderQuery } from "../../services/order";

const status = [
    {
        value: "week",
        label: "Daily",
    },
    {
        value: "month",
        label: "Monthly",
    },
];

export default function RevenuePage() {
    const [getAllOrders, { data: orders }] = useLazyGetAllOrderQuery();
    const [value, setValue] = useState("week");
    const [slot, setSlot] = useState("day");
    const revenue = getTotalRevenue(orders, { slot });
    const salesRevenue = getTotalRevenue(orders, { slot: value });
    const salesProfit = getTotalProfit(orders, { value });

    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-700 mb-1">REVENUE</h1>
            <div className="bg-primary-light w-[135px] h-[3px] rounded-[4px] mb-5" />
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {/* row 1 */}
                <Grid item xs={12}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <Typography variant="h5">
                                Revenue Overview
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={0}
                            >
                                <Button
                                    size="small"
                                    onClick={() => setSlot("month")}
                                    color={
                                        slot === "month"
                                            ? "primary"
                                            : "secondary"
                                    }
                                    variant={
                                        slot === "month" ? "outlined" : "text"
                                    }
                                >
                                    Month
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => setSlot("week")}
                                    color={
                                        slot === "week"
                                            ? "primary"
                                            : "secondary"
                                    }
                                    variant={
                                        slot === "week" ? "outlined" : "text"
                                    }
                                >
                                    Week
                                </Button>
                                <Button
                                    size="small"
                                    onClick={() => setSlot("day")}
                                    color={
                                        slot === "day" ? "primary" : "secondary"
                                    }
                                    variant={
                                        slot === "day" ? "outlined" : "text"
                                    }
                                >
                                    Day
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <Box sx={{ p: 3, pb: 0 }}>
                            <Stack spacing={2}>
                                <Typography variant="h6" color="textSecondary">
                                    Statistics
                                </Typography>
                                <Typography variant="h3">
                                    $
                                    {revenue
                                        ?.reduce(
                                            (sum, e) =>
                                                sum + Number(Object.values(e)),
                                            0
                                        )
                                        .toFixed(2)}
                                </Typography>
                            </Stack>
                        </Box>
                        <RevenueBarChart revenue={revenue} />
                    </MainCard>
                </Grid>
                {/* row 2 */}
                <Grid item xs={12}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <Typography variant="h5">Sales Report</Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-select-currency"
                                size="small"
                                select
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                sx={{
                                    "& .MuiInputBase-input": {
                                        py: 0.5,
                                        fontSize: "0.875rem",
                                    },
                                }}
                            >
                                {status.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <MainCard sx={{ mt: 1.75 }}>
                        <Stack spacing={1.5} sx={{ mb: -12 }}>
                            <Typography variant="h6" color="secondary">
                                Net Profit
                            </Typography>
                            <Typography variant="h4">
                                $
                                {salesProfit
                                    ?.reduce(
                                        (sum, e) =>
                                            sum + Number(Object.values(e)),
                                        0
                                    )
                                    .toFixed(2)}
                            </Typography>
                        </Stack>
                        <SalesColumnChart
                            revenue={salesRevenue}
                            profit={salesProfit}
                        />
                    </MainCard>
                </Grid>
            </Grid>
        </div>
    );
}
