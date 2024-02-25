export const baseUrl = "https://localhost:3000";

export const formatPrice = (price) => {
    return price.toFixed(2);
};

export const isAvailableSeat = (seats, seatNumber) => {
    const allSeats = seats?.reduce((result, item) => {
        result.push(item.seatNumber);
        return result;
    }, []);
    return !allSeats?.includes(seatNumber);
};

export const isSeatReturned = (seats, { orderId, seatNumber }) => {
    const found = seats?.some(
        (seat) => seat.orderId === orderId && seat.seatNumber === seatNumber
    );
    return !found;
};

export const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

export const formatDateOfBirth = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
};

export const getPaymentByOrderId = (payments, orderId) => {
    return payments?.find((payment) => payment.orderId === orderId);
};

export const getUserByOrder = (users, userIdInOrder) => {
    return users?.find((user) => user.id === userIdInOrder);
};

function startOfWeek(date) {
    const diff =
        date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

    return new Date(date.setDate(diff));
}

function endOfWeek(date) {
    const lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday));
}

export const getTotalOrder = (orders, { slot }) => {
    const hash =
        slot === "day"
            ? Array.from({ length: 24 }, (_, i) => String(i)) // from 9 a.m to 20 p.m
            : slot === "week"
            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            : [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
              ];
    const initialOrder =
        slot === "day"
            ? new Array(24).fill(0)
            : slot === "week"
            ? new Array(7).fill(0)
            : new Array(12).fill(0);
    let total = 0;
    const today = new Date();

    if (slot === "day") {
        total = orders?.reduce((totalOrder, order) => {
            const orderDay = new Date(order.orderDate);
            if (
                orderDay.toLocaleDateString() === today.toLocaleDateString() &&
                order.status === "Success"
            ) {
                const hourIn = orderDay.getHours();
                totalOrder[hourIn] += 1;
            }
            return totalOrder;
        }, initialOrder);
    } else if (slot === "week") {
        const start = startOfWeek(today);
        const end = endOfWeek(today);
        total = orders?.reduce((totalOrder, order) => {
            const orderDay = new Date(order.orderDate);
            if (
                orderDay.toLocaleDateString() <= end.toLocaleDateString() &&
                orderDay.toLocaleDateString() >= start.toLocaleDateString() &&
                order.status === "Success"
            ) {
                const dayIn =
                    orderDay.getDay() === 0 ? 6 : orderDay.getDay() - 1;
                totalOrder[dayIn] += 1;
            }
            return totalOrder;
        }, initialOrder);
    } else {
        total = orders?.reduce((totalOrder, order) => {
            const orderDay = new Date(order.orderDate);
            if (
                orderDay.getFullYear() === today.getFullYear() &&
                order.status === "Success"
            ) {
                const monthIn = orderDay.getMonth();
                totalOrder[monthIn] += 1;
            }
            return totalOrder;
        }, initialOrder);
    }
    const result = total?.map((amount, key) => {
        return { [hash[key]]: amount };
    });
    return result;
};

export const getTotalRevenue = (orders, { slot }) => {
    const hash =
        slot === "day"
            ? Array.from({ length: 24 }, (_, i) => String(i)) // from 9 a.m to 20 p.m
            : slot === "week"
            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            : [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
              ];
    const initialRevenue =
        slot === "day"
            ? new Array(24).fill(0)
            : slot === "week"
            ? new Array(7).fill(0)
            : new Array(12).fill(0);
    let total = 0;
    const today = new Date();

    if (slot === "day") {
        total = orders?.reduce((totalRevenue, order) => {
            const orderDay = new Date(order.orderDate);
            if (
                orderDay.toLocaleDateString() === today.toLocaleDateString() &&
                order.status === "Success"
            ) {
                const hourIn = orderDay.getHours();
                totalRevenue[hourIn] += order.total;
            }
            return totalRevenue;
        }, initialRevenue);
    } else if (slot === "week") {
        const start = startOfWeek(today);
        const end = endOfWeek(today);
        total = orders?.reduce((totalRevenue, order) => {
            const orderDay = new Date(order.orderDate);
            if (
                orderDay.toLocaleDateString() <= end.toLocaleDateString() &&
                orderDay.toLocaleDateString() >= start.toLocaleDateString() &&
                order.status === "Success"
            ) {
                const dayIn =
                    orderDay.getDay() === 0 ? 6 : orderDay.getDay() - 1;
                totalRevenue[dayIn] += order.total;
            }
            return totalRevenue;
        }, initialRevenue);
    } else if (slot === "month") {
        total = orders?.reduce((totalRevenue, order) => {
            const orderDay = new Date(order.orderDate);
            if (
                orderDay.getFullYear() === today.getFullYear() &&
                order.status === "Success"
            ) {
                const monthIn = orderDay.getMonth();
                totalRevenue[monthIn] += order.total;
            }
            return totalRevenue;
        }, initialRevenue);
    }
    const result = total?.map((amount, key) => {
        return { [hash[key]]: amount };
    });
    return result;
};

export const getTotalProfit = (orders, { value }) => {
    const hash =
        value === "week"
            ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            : [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
              ];
    const initialRevenue =
        value === "week" ? new Array(7).fill(0) : new Array(12).fill(0);
    let total = 0;
    const today = new Date();

    if (value === "week") {
        const start = startOfWeek(today);
        const end = endOfWeek(today);
        total = orders?.reduce((totalRevenue, order) => {
            const orderDay = new Date(order.orderDate);
            if (
                orderDay.toLocaleDateString() <= end.toLocaleDateString() &&
                orderDay.toLocaleDateString() >= start.toLocaleDateString() &&
                order.status === "Success"
            ) {
                const dayIn =
                    orderDay.getDay() === 0 ? 6 : orderDay.getDay() - 1;
                totalRevenue[dayIn] += order.total * 0.3;
            }
            return totalRevenue;
        }, initialRevenue);
    } else {
        total = orders?.reduce((totalRevenue, order) => {
            const orderDay = new Date(order.orderDate);
            if (
                orderDay.getFullYear() === today.getFullYear() &&
                order.status === "Success"
            ) {
                const monthIn = orderDay.getMonth();
                totalRevenue[monthIn] += order.total * 0.3;
            }
            return totalRevenue;
        }, initialRevenue);
    }
    const result = total?.map((amount, key) => {
        return { [hash[key]]: Number(amount).toFixed(2) };
    });
    return result;
};
