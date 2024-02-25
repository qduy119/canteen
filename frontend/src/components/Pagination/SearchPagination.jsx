import { PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { Link, useLocation } from "react-router-dom";

export default function SearchPagination({ total, page, keyword }) {

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
                            ? `/search?query=${keyword}`
                            : `/search?query=${keyword}&page=${item.page}`
                    }`}
                    {...item}
                />
            )}
        />
    );
}
