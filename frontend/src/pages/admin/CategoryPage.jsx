import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton, Tooltip } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import {
    useLazyGetAllCategoryQuery,
    useAddCategoryMutation,
    useModifyCategoryMutation,
    useDeleteCategoryMutation,
} from "../../services/category";
import CategoryFormDialog from "../../components/Dialog/FormDialog";
import AdminTable from "../../components/Table/Table";
import Toast from "../../components/Toast/Toast";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";

function CategoryPage() {
    const [getAllCategory, { data: categories }] = useLazyGetAllCategoryQuery();
    const [addCategory, { isSuccess: addCategorySuccess }] =
        useAddCategoryMutation();
    const [modifyCategory, { isSuccess: modifyCategorySuccess }] =
        useModifyCategoryMutation();
    const [
        deleteCategory,
        { isSuccess: deleteCategorySuccess, isError: deleteCategoryError },
    ] = useDeleteCategoryMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
        setEditingCategoryId(null);
        setCategory(null);
        setImageFile(null);
    }
    const handleInputChange = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setImageFile(file);
        const imageUrl = URL.createObjectURL(file);
        setCategory((prev) => ({ ...prev, thumbnail: imageUrl }));
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
        onDrop,
    });

    const handleEdit = (categoryId) => {
        setOpen(true);
        setEditingCategoryId(categoryId);
        const categoryToEdit = categories?.find(
            (category) => category.id === categoryId
        );
        setCategory(categoryToEdit);
    };

    const handleDelete = (categoryId) => {
        deleteCategory({ id: categoryId });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingCategoryId) {
            setIsLoading(true);
            if (imageFile) {
                const res = await uploadToCloudinary(
                    imageFile,
                    "canteen/category"
                );
                const { secure_url } = res.data;
                modifyCategory({ ...category, thumbnail: secure_url });
            } else {
                modifyCategory({ ...category });
            }
        } else {
            if (
                category?.name &&
                category?.description &&
                category?.thumbnail
            ) {
                setIsLoading(true);
                const res = await uploadToCloudinary(
                    imageFile,
                    "canteen/category"
                );
                const { secure_url } = res.data;
                addCategory({ ...category, thumbnail: secure_url });
            }
        }
    };

    useEffect(() => {
        getAllCategory();
    }, [getAllCategory]);
    useEffect(() => {
        if (deleteCategorySuccess) {
            toast.success("Delete successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                getAllCategory();
            }, 500);
        }
    }, [deleteCategorySuccess, getAllCategory]);
    useEffect(() => {
        if (deleteCategoryError) {
            toast.error("Can't delete this category", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }, [deleteCategoryError, getAllCategory]);
    useEffect(() => {
        if (modifyCategorySuccess) {
            setIsLoading(false);
            handleClose();
            toast.success("Edit successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                getAllCategory();
            }, 500);
        }
    }, [modifyCategorySuccess, getAllCategory]);
    useEffect(() => {
        if (addCategorySuccess) {
            setIsLoading(false);
            handleClose();
            toast.success("Add successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                getAllCategory();
            }, 500);
        }
    }, [addCategorySuccess, getAllCategory]);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        {
            field: "thumbnail",
            headerName: "Thumbnail",
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
            field: "name",
            headerName: "Name",
            width: 250,
        },
        {
            field: "description",
            headerName: "Description",
            headerAlign: "center",
            width: 400,
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
    const rows = categories ?? [];

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-700 w-fit border-b-[3px] border-primary-light">
                CATEGORY
            </h1>
            <button
                onClick={() => handleOpen()}
                className="my-10 w-full max-w-fit flex items-center gap-x-2 text-white text-lg font-semibold uppercase rounded-md px-4 py-2 bg-primary transition-all duration-300 hover:bg-primary-light"
            >
                Add category
                <AddIcon />
            </button>
            <CategoryFormDialog
                title={editingCategoryId ? "UPDATE CATEGORY" : "ADD CATEGORY"}
                open={open}
                onSetClose={handleClose}
            >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="name"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Category Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                            type="text"
                            placeholder="Enter category name"
                            value={category?.name ?? ""}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="description"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Category Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter category description"
                            value={category?.description ?? ""}
                            onChange={(e) => handleInputChange(e)}
                            className="border-none outline-none min-h-[100px] py-2 px-3 rounded-[4px] bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col mb-4 cursor-pointer">
                        <label
                            htmlFor="thumbnail"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Category Thumbnail
                        </label>
                        <div
                            {...getRootProps()}
                            className="dropzone"
                            style={{
                                border: "2px dashed #ccc",
                                borderRadius: "8px",
                                padding: "16px",
                                textAlign: "center",
                            }}
                        >
                            {category?.thumbnail ? (
                                <img
                                    src={category.thumbnail}
                                    alt="Food Thumbnail"
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
                            {editingCategoryId
                                ? "Update Category"
                                : "Add Category"}{" "}
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
            <Toast />
        </div>
    );
}

export default CategoryPage;
