import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import Search from "../Search/Search";

export default function Header() {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const user = useSelector((state) => state.auth.user);
    const [searchString, setSearchString] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (searchString) {
            navigate(`/search?query=${searchString}`);
        }
    }
    function handleNavigateToCart() {
        if (user) {
            navigate("/cart");
        } else {
            navigate("/login", { state: { from: "/cart" } });
        }
    }

    return (
        <div className="flex gap-2 sm:gap-4 py-2 items-center">
            <Search
                search={searchString}
                onSetSearch={setSearchString}
                onSubmit={handleSubmit}
            />
            {user ? (
                <Badge
                    color="warning"
                    badgeContent={cartItems?.length || 0}
                    max={10}
                >
                    <ShoppingCartOutlinedIcon
                        sx={{ "&:hover": { cursor: "pointer" } }}
                        onClick={handleNavigateToCart}
                    />
                </Badge>
            ) : (
                <ShoppingCartOutlinedIcon
                    sx={{ "&:hover": { cursor: "pointer" } }}
                    onClick={handleNavigateToCart}
                />
            )}
        </div>
    );
}
