import { useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";

import OrdersTable from "../../components/Chart/OrdersTable";
import OrderLineChart from "../../components/Chart/OrderLineChart";
import TopSalesFoodChart from "../../components/Chart/TopSalesFoodChart";
import AnalyticEcommerce from "../../components/Chart/AnalyticEcommerce";
import MainCard from "../../components/Card/MainCard";

import {
    GiftOutlined,
    MessageOutlined,
    SettingOutlined,
} from "@ant-design/icons";

import {
    useGetTopSalesQuery,
    useLazyGetAllProductQuery,
} from "../../services/item";
import { useLazyGetAllUserQuery } from "../../services/privateAuth";
import { useLazyGetAllOrderQuery } from "../../services/order";
import { getTotalOrder, getTotalSales } from "../../utils";

const avatarSX = {
    width: 36,
    height: 36,
    fontSize: "1rem",
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: "auto",
    right: "auto",
    alignSelf: "flex-start",
    transform: "none",
};

export default function DashboardPage() {
    const [getAllProducts, { data: products }] = useLazyGetAllProductQuery();
    const [getAllUsers, { data: users }] = useLazyGetAllUserQuery();
    const { data: topSales } = useGetTopSalesQuery();
    const [getAllOrders, { data: orders }] = useLazyGetAllOrderQuery();
    const [slot, setSlot] = useState("day");
    const order = getTotalOrder(orders, { slot });
    const totalSales = getTotalSales(orders);

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);
    useEffect(() => {
        getAllOrders();
    }, [getAllOrders]);
    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-700 w-fit border-b-[3px] border-primary-light">
                OVERVIEW
            </h1>
            <div className="my-8">
                <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {/* row 1 */}
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <Typography variant="h5">Dashboard</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total Products"
                            count={products?.length}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total Users"
                            count={users?.length ?? 0}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total Order"
                            count={orders?.length ?? 0}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <AnalyticEcommerce
                            title="Total Sales"
                            count={`$${totalSales ?? 0}`}
                        />
                    </Grid>
                    <Grid
                        item
                        md={8}
                        sx={{
                            display: {
                                sm: "none",
                                md: "block",
                                lg: "none",
                            },
                        }}
                    />
                    {/* row 2 */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <Typography variant="h5">
                                    Order Statistics
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
                                            slot === "month"
                                                ? "outlined"
                                                : "text"
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
                                            slot === "week"
                                                ? "outlined"
                                                : "text"
                                        }
                                    >
                                        Week
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => setSlot("day")}
                                        color={
                                            slot === "day"
                                                ? "primary"
                                                : "secondary"
                                        }
                                        variant={
                                            slot === "day" ? "outlined" : "text"
                                        }
                                    >
                                        Today
                                    </Button>
                                </Stack>
                            </Grid>
                        </Grid>
                        <MainCard content={false} sx={{ mt: 1.5 }}>
                            <Box sx={{ pt: 1, pr: 2 }}>
                                <OrderLineChart order={order} />
                            </Box>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <Typography variant="h5">
                                    Top Sales Food
                                </Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2.25, pb: 5 }} content={false}>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6" color="textSecondary">
                                    Statistics
                                </Typography>
                            </Box>
                            <TopSalesFoodChart products={topSales} />
                        </MainCard>
                    </Grid>
                    {/* row 3 */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <Typography variant="h5">
                                    Recent Orders
                                </Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <OrdersTable orders={orders} />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={5} lg={4}>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <Typography variant="h5">
                                    Transaction History
                                </Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <MainCard sx={{ mt: 2 }} content={false}>
                            <List
                                component="nav"
                                sx={{
                                    px: 0,
                                    py: 0,
                                    "& .MuiListItemButton-root": {
                                        py: 1.5,
                                        "& .MuiAvatar-root": avatarSX,
                                        "& .MuiListItemSecondaryAction-root": {
                                            ...actionSX,
                                            position: "relative",
                                        },
                                    },
                                }}
                            >
                                <ListItemButton divider>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: "success.main",
                                                bgcolor: "success.lighter",
                                            }}
                                        >
                                            <GiftOutlined />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1">
                                                Order #002434
                                            </Typography>
                                        }
                                        secondary="Today, 2:00 AM"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography
                                                variant="subtitle1"
                                                noWrap
                                            >
                                                + $1,430
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color="secondary"
                                                noWrap
                                            >
                                                78%
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                                <ListItemButton divider>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: "primary.main",
                                                bgcolor: "primary.lighter",
                                            }}
                                        >
                                            <MessageOutlined />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1">
                                                Order #984947
                                            </Typography>
                                        }
                                        secondary="5 August, 1:45 PM"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography
                                                variant="subtitle1"
                                                noWrap
                                            >
                                                + $302
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color="secondary"
                                                noWrap
                                            >
                                                8%
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: "error.main",
                                                bgcolor: "error.lighter",
                                            }}
                                        >
                                            <SettingOutlined />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="subtitle1">
                                                Order #988784
                                            </Typography>
                                        }
                                        secondary="7 hours ago"
                                    />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography
                                                variant="subtitle1"
                                                noWrap
                                            >
                                                + $682
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                color="secondary"
                                                noWrap
                                            >
                                                16%
                                            </Typography>
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            </List>
                        </MainCard>
                        <MainCard sx={{ mt: 2 }}>
                            <Stack spacing={3}>
                                <Grid
                                    container
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <Stack>
                                            <Typography variant="h5" noWrap>
                                                Help & Support Chat
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="secondary"
                                                noWrap
                                            >
                                                Typical replay within 5 min
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Button
                                    size="small"
                                    variant="contained"
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    Need Help?
                                </Button>
                            </Stack>
                        </MainCard>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
