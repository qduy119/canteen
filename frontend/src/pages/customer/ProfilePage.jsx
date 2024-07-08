import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonIcon from "@mui/icons-material/Person";
import { formatDateOfBirth } from "../../utils";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import {
    useGetMeQuery,
    useModifyUserMutation,
} from "../../services/privateAuth";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const { data: user, isSuccess: isGetMeSuccess } = useGetMeQuery();
    const [credentials, setCredentials] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [updateUserMutation, { isSuccess: updateUserSuccess, isLoading }] =
        useModifyUserMutation();

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setCredentials((prev) => ({ ...prev, avatar: imageUrl }));
    };

    const { getRootProps } = useDropzone({
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
        onDrop,
    });
    function handleChange(e) {
        setCredentials((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (imageFile) {
            const res = await uploadToCloudinary(imageFile, "canteen/user");
            const { secure_url } = res.data;
            updateUserMutation({ ...credentials, avatar: secure_url });
        } else {
            updateUserMutation(credentials);
        }
    }

    useEffect(() => {
        if (updateUserSuccess) {
            toast.success("Update successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [updateUserSuccess]);
    useEffect(() => {
        if (isGetMeSuccess && user) {
            const { id, avatar, fullName, phoneNumber, gender, dateOfBirth } =
                user;
            setCredentials({
                id,
                avatar,
                fullName,
                phoneNumber,
                gender,
                dateOfBirth,
            });
        }
    }, [isGetMeSuccess, user]);

    return (
        <div className="w-full">
            <div className="mx-auto px-[10%] sm:px-[20%] my-10">
                <Link
                    to="../"
                    className="flex items-center px-3 py-4 hover:underline text-primary"
                >
                    <ArrowBackIosNewIcon />
                    BACK TO HOME PAGE
                </Link>
                <div className="bg-gray-200 rounded-lg p-2">
                    <div className="flex items-center px-3 py-2">
                        <PersonIcon />
                        PROFILE
                    </div>
                    <div className="z-[1000] w-full h-[1px] bg-black/20" />
                    <form action="/" onSubmit={handleSubmit}>
                        <div className="py-3 px-10">
                            <div
                                {...getRootProps()}
                                className={`dropzone mx-auto w-[120px] h-[120px] ${
                                    user?.provider !== "default"
                                        ? "pointer-events-none opacity-70"
                                        : ""
                                }`}
                            >
                                <img
                                    src={credentials?.avatar}
                                    alt="User Avatar"
                                    className="object-cover w-[120px] h-[120px] rounded-full"
                                />
                            </div>
                            <div className="mt-3">
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="fullname">Full Name</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        className="rounded-[4px] py-2 px-3 border-none outline-none"
                                        name="fullName"
                                        value={credentials?.fullName || ""}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="flex flex-col mb-3">
                                    <label htmlFor="number">Phone Number</label>
                                    <input
                                        type="text"
                                        id="number"
                                        className="rounded-[4px] py-2 px-3 border-none outline-none"
                                        name="phoneNumber"
                                        value={credentials?.phoneNumber || ""}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                                <div className="flex items-center gap-x-2 mb-3">
                                    <div>
                                        <input
                                            type="radio"
                                            id="male"
                                            name="gender"
                                            value="Male"
                                            checked={
                                                credentials?.gender === "Male"
                                            }
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            id="female"
                                            name="gender"
                                            value="Female"
                                            checked={
                                                credentials?.gender === "Female"
                                            }
                                            onChange={(e) => handleChange(e)}
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <label htmlFor="dob">Date of birth</label>
                                    <input
                                        type="date"
                                        id="dob"
                                        className="rounded-[4px] py-2 px-3 border-none outline-none"
                                        name="dateOfBirth"
                                        value={formatDateOfBirth(
                                            credentials?.dateOfBirth
                                        )}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="flex justify-center items-center gap-2 mt-3 w-full rounded-[4px] border-none outline-none text-white font-bold text-xl bg-primary hover:bg-primary-dark py-2"
                            >
                                SAVE{" "}
                                {isLoading ? <span className="bar" /> : null}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
