import {
    Link,
    useLoaderData,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAddCartItemsMutation } from "../../services/cart";
import getItemsInCart from "../../features/cart/getItemsInCart";
import Review from "../../components/Review/Review";

export default function ProductPage() {
    const location = useLocation();
    const { data: food, review } = useLoaderData();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [addToCart, { isSuccess: addToCartSuccess }] =
        useAddCartItemsMutation();
    const [addToCartNow, { data, isSuccess: addToCartNowSuccess }] =
        useAddCartItemsMutation();
    const [currentStock, setCurrentStock] = useState(food.stock);
    const [quantity, setQuantity] = useState(1);
    const [thumbImage, setThumbImage] = useState(() => ({
        curr: -1,
        thumb: food.thumbnail,
    }));

    function handleShowThumbnail(e) {
        setThumbImage({ curr: +e.target.id, thumb: e.target.src });
    }
    function handleChangeQuantity(e) {
        let quantity = +e.target.value;
        if (quantity < 0) {
            quantity = 1;
        } else if (quantity > currentStock) {
            quantity = currentStock;
        }
        setQuantity(quantity);
    }
    function handleModify(type = -1) {
        if (type === -1) {
            if (quantity > 1) {
                setQuantity((prev) => prev - 1);
            }
        } else {
            if (quantity < currentStock) {
                setQuantity((prev) => prev + 1);
            }
        }
    }
    function handleAddToCart() {
        if (!user) {
            navigate("/login");
        } else {
            if (currentStock > 0 && currentStock >= quantity) {
                addToCart({ quantity, itemId: food.id, userId: user.id });
                setCurrentStock((prev) => prev - quantity);
            }
        }
    }
    function handleBuyNow() {
        if (!user) {
            navigate("/login", { state: { from: location.pathname } });
        } else {
            if (currentStock > 0 && currentStock >= quantity) {
                addToCartNow({ quantity, itemId: food.id, userId: user.id });
            }
        }
    }

    useEffect(() => {
        if (addToCartSuccess) {
            dispatch(getItemsInCart({ userId: user.id }));
            toast.success("Add to cart successfully !", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [addToCartSuccess, dispatch, user]);
    useEffect(() => {
        if (addToCartNowSuccess) {
            dispatch(getItemsInCart({ userId: user.id }));
            navigate("/checkout", {
                state: { items: [{ ...data, quantity, item: food }] },
            });
        }
    }, [
        addToCartNowSuccess,
        navigate,
        dispatch,
        user?.id,
        data,
        food,
        quantity,
    ]);

    return (
        <div className="min-h-screen px-5 py-8">
            <Link to="/" className="hover:underline text-primary">
                <ArrowBackIosNewIcon />
                BACK TO HOME PAGE
            </Link>
            <div className="block sm:flex gap-x-8 mt-5">
                <div className="w-[100%] sm:w-[55%]">
                    <div>
                        <img
                            className="w-[100%] h-auto object-cover rounded-md"
                            src={thumbImage.thumb}
                            alt="Thumbnail"
                        />
                    </div>
                    <div className="mt-4 flex items-center flex-wrap gap-x-4 gap-y-2 w-full">
                        <img
                            className={`${
                                thumbImage.curr === -1
                                    ? "border-2 border-primary"
                                    : ""
                            } w-[80px] h-[50px] sm:w-[120px] sm:h-[80px] object-cover opacity-1 cursor-pointer hover:opacity-80 rounded-sm`}
                            src={food.thumbnail}
                            id={-1}
                            alt="Image"
                            onClick={(e) => handleShowThumbnail(e)}
                        />
                        {food?.images?.map((image, index) => (
                            <img
                                id={index}
                                key={index}
                                className={`${
                                    thumbImage.curr === index
                                        ? "border-2 border-primary"
                                        : ""
                                } w-[80px] h-[50px] sm:w-[120px] sm:h-[80px] object-cover opacity-1 cursor-pointer hover:opacity-80 rounded-sm`}
                                src={image}
                                alt="Image"
                                onClick={(e) => handleShowThumbnail(e)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex-1 mt-8 sm:mt-5">
                    <div>
                        <h3 className="font-semibold text-3xl text-primary-dark">
                            {food.name}
                        </h3>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-bold text-xl uppercase">
                            Description:{" "}
                        </h3>
                        <p>{food.description}</p>
                    </div>
                    <h3 className="font-bold text-xl uppercase mt-4">
                        Rating:{" "}
                        <span className="font-normal">{food.rating}</span>
                    </h3>
                    <h3 className="font-bold text-xl uppercase mt-4">
                        Stock:{" "}
                        <span className="font-normal">{currentStock}</span>
                    </h3>
                    <h3 className="font-bold text-xl uppercase mt-4">
                        Price:{" "}
                        <span className="font-normal">${food.price}</span>
                    </h3>
                    <div className="flex items-center gap-x-4 mt-4">
                        <IconButton onClick={() => handleModify()}>
                            <RemoveIcon />
                        </IconButton>
                        <label htmlFor="quantity" className="hidden"></label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            min={1}
                            max={currentStock}
                            value={quantity}
                            onChange={(e) => handleChangeQuantity(e)}
                            className="border border-gray-300"
                        />
                        <IconButton onClick={() => handleModify(1)}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className="mt-4 flex gap-x-5">
                        <button
                            type="button"
                            onClick={handleBuyNow}
                            className="uppercase font-semibold text-sm sm:text-lg border-none outline-none rounded-[4px] bg-primary hover:bg-primary-dark text-white text-center py-2 px-4 w-[50%] transition-all"
                        >
                            BUY NOW
                        </button>
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="uppercase font-semibold text-sm sm:text-lg border-none outline-none rounded-[4px] bg-primary hover:bg-primary-dark text-white text-center py-2 px-4 w-[50%] transition-all"
                        >
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <h1 className="font-semibold text-3xl mb-4">Reviews</h1>
                <Review review={review} rating={food.rating} />
            </div>
        </div>
    );
}
