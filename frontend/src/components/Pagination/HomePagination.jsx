import { PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";

export default function HomePagination({ total, page }) {
    return (
        <Pagination
            page={page}
            color="warning"
            count={total}
            renderItem={(item) => (
                <PaginationItem
                    sx={{ fontSize: 14, fontWeight: "bold" }}
                    component={Link}
                    to={`${item.page === 1 ? "/" : `/home?page=${item.page}`}`}
                    {...item}
                />
            )}
        />
    );
}
