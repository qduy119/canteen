import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";
import { Button, IconButton, Tooltip } from "@mui/material";
import {
    useAddUserMutation,
    useDeleteUserMutation,
    useGetAllUserQuery,
    useModifyUserMutation,
} from "../../services/privateAuth";
import { useDropzone } from "react-dropzone";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { toast } from "react-toastify";
import { formatDateOfBirth } from "../../utils";
import CategoryFormDialog from "../../components/Dialog/FormDialog";
import AdminTable from "../../components/Table/Table";

export default function CustomerPage() {
    const { data: users } = useGetAllUserQuery();
    const [addUser, { isSuccess: addUserSuccess, isError: addUserError }] =
        useAddUserMutation();
    const [updateUser, { isSuccess: updateUserSuccess }] =
        useModifyUserMutation();
    const [deleteUser, { isSuccess: deleteUserSuccess }] =
        useDeleteUserMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
        setEditingUserId(null);
        setUser(null);
        setImageFile(null);
    }

    const handleInputChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setUser((prev) => ({ ...prev, avatar: imageUrl }));
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
        onDrop,
    });

    const handleEdit = (userId) => {
        setOpen(true);
        setEditingUserId(userId);
        const userToEdit = users?.find((user) => user.id === userId);
        setUser(userToEdit);
    };

    const handleDelete = (userId) => {
        deleteUser({ id: userId });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUserId) {
            setIsLoading(true);
            if (imageFile) {
                const res = await uploadToCloudinary(imageFile, "canteen/user");
                const { secure_url } = res.data;
                updateUser({ ...user, avatar: secure_url });
            } else {
                updateUser({ ...user });
            }
        } else {
            if (user?.email && user?.password && user?.fullName) {
                setIsLoading(true);
                if (imageFile) {
                    const res = await uploadToCloudinary(
                        imageFile,
                        "canteen/user"
                    );
                    const { secure_url } = res.data;
                    console.log({ ...user, avatar: secure_url });
                    addUser({ ...user, avatar: secure_url });
                } else {
                    addUser({ ...user });
                }
            }
        }
    };

    useEffect(() => {
        if (deleteUserSuccess) {
            toast.success("Delete successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [deleteUserSuccess]);
    useEffect(() => {
        if (updateUserSuccess) {
            setIsLoading(false);
            handleClose();
            toast.success("Update successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [updateUserSuccess]);
    useEffect(() => {
        if (addUserSuccess) {
            setIsLoading(false);
            handleClose();
            toast.success("Add successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [addUserSuccess]);
    useEffect(() => {
        if (addUserError) {
            setIsLoading(false);
            handleClose();
            toast.error("User has existed", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [addUserError]);

    const columns = [
        { field: "id", headerName: "ID", width: 210 },
        {
            field: "avatar",
            headerName: "Avatar",
            headerAlign: "center",
            align: "center",
            width: 150,
            sortable: false,
            renderCell: (rowData) => {
                const image = rowData.formattedValue;
                return (
                    <div
                        className="w-[50px] h-[50px] bg-center bg-cover rounded-md border-[1px] border-primary-light"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            width: 250,
        },
        {
            field: "fullName",
            headerName: "Full Name",
            width: 200,
        },
        {
            field: "role",
            headerName: "Role",
            width: 200,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 200,
        },
        {
            field: "gender",
            headerName: "Gender",
            width: 150,
        },
        {
            field: "dateOfBirth",
            headerName: "Date Of Birth",
            width: 150,
            renderCell: (rowData) => {
                return (
                    <p>
                        {rowData.row.dateOfBirth
                            ? new Date(
                                  rowData.row.dateOfBirth
                              ).toLocaleDateString()
                            : null}
                    </p>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (rowData) => {
                return (
                    <div className="flex items-center justify-center gap-4">
                        <Tooltip title="Edit">
                            <IconButton
                                onClick={() => handleEdit(rowData.row.id)}
                            >
                                <EditIcon className="hover:text-green-500 transition-all" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton
                                onClick={() => handleDelete(rowData.row.id)}
                            >
                                <DeleteIcon className="hover:text-red-500 transition-all" />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];
    const rows = users ?? [];

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-700 w-fit border-b-[3px] border-primary-light">
                CUSTOMER
            </h1>
            <button
                onClick={() => handleOpen()}
                className="my-10 w-full max-w-fit flex items-center gap-x-2 text-white text-lg font-semibold uppercase rounded-md px-4 py-2 bg-primary transition-all duration-300 hover:bg-primary-light"
            >
                Add user
                <AddIcon />
            </button>
            <CategoryFormDialog
                title={editingUserId ? "UPDATE USER" : "ADD USER"}
                open={open}
                onSetClose={handleClose}
            >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter user email"
                            value={user?.email ?? ""}
                            onChange={(e) => handleInputChange(e)}
                            className={`border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100 ${
                                editingUserId ||
                                (user?.provider !== "default" && editingUserId)
                                    ? "pointer-events-none opacity-60"
                                    : ""
                            }`}
                            disabled={
                                editingUserId ||
                                (user?.provider !== "default" && editingUserId)
                            }
                        />
                    </div>
                    <div
                        className={`flex flex-col ${
                            editingUserId ? "" : "mb-4"
                        }`}
                    >
                        <label
                            htmlFor="password"
                            className={`text-sm font-semibold text-gray-600 mb-2 ${
                                editingUserId ? "hidden" : ""
                            }`}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter user password"
                            value={user?.password ?? ""}
                            onChange={(e) => handleInputChange(e)}
                            className={`border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100 ${
                                editingUserId ? "hidden" : ""
                            }`}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="phoneNumber"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter user phone number"
                            value={user?.phoneNumber ?? ""}
                            onChange={(e) => handleInputChange(e)}
                            className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="fullName"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            placeholder="Enter user full name"
                            value={user?.fullName ?? ""}
                            onChange={(e) => handleInputChange(e)}
                            className={`border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100 ${
                                user?.provider !== "default" && editingUserId
                                    ? "pointer-events-none opacity-60"
                                    : ""
                            }`}
                            disabled={
                                user?.provider !== "default" && editingUserId
                            }
                        />
                    </div>
                    <div className="flex mb-4 gap-4">
                        <div className="flex items-center gap-1">
                            <label
                                htmlFor="male"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Male
                            </label>
                            <input
                                id="male"
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={user?.gender === "Male"}
                                onChange={(e) => handleInputChange(e)}
                                className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                            />
                        </div>
                        <div className="flex items-center gap-1">
                            <label
                                htmlFor="female"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Female
                            </label>
                            <input
                                id="female"
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={user?.gender === "Female"}
                                onChange={(e) => handleInputChange(e)}
                                className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="dateOfBirth"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Date Of Birth
                        </label>
                        <input
                            id="dateOfBirth"
                            name="dateOfBirth"
                            type="date"
                            placeholder="Enter user date of birth"
                            value={formatDateOfBirth(user?.dateOfBirth)}
                            onChange={(e) => handleInputChange(e)}
                            className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col mb-4 cursor-pointer">
                        <label
                            htmlFor="avatar"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            User Avatar
                        </label>
                        <div
                            {...getRootProps()}
                            className={`dropzone ${
                                user?.provider !== "default" && editingUserId
                                    ? "pointer-events-none opacity-70"
                                    : ""
                            }`}
                            style={{
                                border: "2px dashed #ccc",
                                borderRadius: "8px",
                                padding: "16px",
                                textAlign: "center",
                            }}
                        >
                            {user?.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt="User Avatar"
                                    className="object-cover mx-auto"
                                />
                            ) : (
                                <>
                                    <input {...getInputProps()} />
                                    <p style={{ margin: "8px 0" }}>
                                        Drag and drop an image here, or click to
                                        select an image
                                    </p>
                                    <ImageIcon
                                        style={{
                                            fontSize: "48px",
                                            color: "#555",
                                        }}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <Button
                            type="button"
                            onClick={handleClose}
                            className="bg-slate-200 hover:bg-slate-300 px-4 transition-all duration-300 text-black font-medium"
                        >
                            CLOSE
                        </Button>
                        <Button
                            type="submit"
                            autoFocus
                            className="flex justify-center items-center px-4 gap-2 bg-primary-light uppercase hover:bg-primary-dark transition-all duration-300 text-white font-medium"
                        >
                            {editingUserId ? "Update" : "Add"}{" "}
                            <span
                                className={`bar ${isLoading ? "" : "hidden"}`}
                            />
                        </Button>
                    </div>
                </form>
            </CategoryFormDialog>
            <div className="bg-white px-8 py-4 rounded-md">
                <AdminTable
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}
