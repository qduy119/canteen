import { useNavigate } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ReviewDialog from "../Dialog/ReviewDialog";
import { IconButton, Tooltip } from "@mui/material";
import { useAddReviewMutation } from "../../services/review";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLazyCheckRatingQuery } from "../../services/orderitem";

export default function OrderItemDialogItem({ item, status }) {
    const navigate = useNavigate();
    const [ratingOpen, setRatingOpen] = useState(false);
    const [addReview, { isSuccess: addReviewSuccess }] = useAddReviewMutation();
    const [checkRating, { data }] = useLazyCheckRatingQuery();

    function handleOpen() {
        setRatingOpen(true);
    }
    function handleClose() {
        setRatingOpen(false);
    }
    function handleAddReview(feedback) {
        addReview(feedback);
    }

    useEffect(() => {
        if (addReviewSuccess) {
            toast.success("Add review successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            checkRating({ id: item.id });
        }
    }, [addReviewSuccess, checkRating, item.id]);
    useEffect(() => {
        checkRating({ id: item.id });
    }, [checkRating, item.id]);

    return (
        <tr className="border-b border-primary-dark">
            <td className="whitespace-nowrap px-6 py-4">{item.item.name}</td>
            <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center">
                <div
                    className="w-[50px] h-[50px] bg-center bg-cover rounded-md hover:cursor-pointer"
                    style={{
                        backgroundImage: `url(${item.item.thumbnail})`,
                    }}
                    onClick={() => navigate(`/food/${item.itemId}`)}
                />
            </td>
            <td className="whitespace-nowrap px-6 py-4">${item.price}</td>
            <td className="whitespace-nowrap px-6 py-4">{item.quantity}</td>
            <td className="whitespace-nowrap px-6 py-4">
                {!data?.isRated && status === "Success" ? (
                    <Tooltip title="Write a feedback">
                        <IconButton onClick={handleOpen}>
                            <RateReviewIcon className="hover:text-primary transition-all" />
                        </IconButton>
                    </Tooltip>
                ) : null}
            </td>
            <ReviewDialog
                orderItem={item}
                open={ratingOpen}
                onSetClose={handleClose}
                onAddReview={handleAddReview}
            />
        </tr>
    );
}
