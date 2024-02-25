import { PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Link, useLocation } from "react-router-dom";

export default function OrderPagination({ total, page }) {
    const location = useLocation();

    return (
        <Pagination
            page={page}
            color="warning"
            count={total}
            renderItem={(item) => (
                <PaginationItem
                    sx={{ fontSize: 14, fontWeight: "bold" }}
                    component={Link}
                    to={`${
                        item.page === 1
                            ? `${location.pathname}`
                            : `${location.pathname}?page=${item.page}`
                    }`}
                    {...item}
                />
            )}
        />
    );
}
