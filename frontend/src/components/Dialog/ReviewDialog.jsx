import { useState } from "react";
import {
    DialogTitle,
    DialogActions,
    Button,
    DialogContent,
    Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Rating from "../Review/Rating";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { useGetMeQuery } from "../../services/privateAuth";

const quality = ["Terrible", "Poor", "Fair", "Good", "Amazing"];

export default function ReviewDialog({
    open,
    orderItem,
    onSetClose,
    onAddReview,
}) {
    const [rating, setRating] = useState(5);
    const [description, setDescription] = useState("");
    const [imagesFile, setImagesFile] = useState(null);
    const { data: user } = useGetMeQuery();
    const [isLoading, setIsLoading] = useState(false);

    function handleRating(star) {
        setRating(star);
    }
    function handleProductImages(e) {
        const fileUpload = e.target.files;
        for (const file of fileUpload) {
            setImagesFile((prev) => {
                let temp = prev;
                if (!temp) {
                    temp = new Array();
                }
                temp = [...temp, file];
                return temp;
            });
        }
    }
    async function handleAddReview() {
        let imagesFeedback = null;
        if (imagesFile) {
            setIsLoading(true);
            for (const file of imagesFile) {
                const res = await uploadToCloudinary(file, "canteen/review");
                if (res.status === 200) {
                    const { secure_url } = res.data;
                    if (!imagesFeedback) {
                        imagesFeedback = new Array();
                    }
                    imagesFeedback.push(secure_url);
                }
            }
            setIsLoading(false);
        }
        onAddReview({
            rating,
            description,
            images: imagesFeedback,
            orderItemId: orderItem.id,
            userId: user.id,
            createAt: new Date(),
        });
        onSetClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onSetClose}
            disableScrollLock={true}
            scroll="paper"
        >
            <DialogTitle sx={{ m: 0, p: 2, fontWeight: "medium" }}>
                Leave a comment
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onSetClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                <div className="p-2">
                    <div className="flex items-center mb-2">
                        <p className="w-fit mr-4">Quality</p>
                        <Rating rating={rating} onSetRating={handleRating} />
                        <p className="text-yellow-400">{quality[rating - 1]}</p>
                    </div>
                    <div className="p-2 rounded-sm">
                        <textarea
                            id=""
                            cols="30"
                            rows="5"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Share more thoughts on the product to help other buyers"
                            className="border-2 rounded-sm border-gray-300 outline-none w-full p-2 mb-2"
                        />
                        <label
                            htmlFor="feedback_photo"
                            className="text-primary p-2 border-[1px] border-primary"
                        >
                            <i className="fa-solid fa-camera mr-2" />
                            Add Photo
                        </label>
                        <input
                            type="file"
                            id="feedback_photo"
                            className="hidden"
                            accept="image/jpeg, image/jpg, image/png"
                            onChange={(e) => handleProductImages(e)}
                            multiple
                        />
                        {imagesFile && (
                            <div className="border-2 border-dashed rounded-lg p-4 flex flex-wrap items-center gap-4 mt-4">
                                {imagesFile.map((imageFile, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(imageFile)}
                                        width={100}
                                        height={100}
                                        className="object-cover border-[1px] border-primary rounded-md"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    onClick={handleAddReview}
                    className="bg-primary-light hover:bg-primary-dark transition-all text-white font-medium flex justify-center items-center gap-2"
                >
                    Add
                    <span className={`bar ${isLoading ? "" : "hidden"}`} />
                </Button>
            </DialogActions>
        </Dialog>
    );
}
