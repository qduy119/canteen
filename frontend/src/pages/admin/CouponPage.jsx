import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CouponFormDialog from "../../components/Dialog/FormDialog";
import { Button, IconButton, Tooltip } from "@mui/material";
import AdminTable from "../../components/Table/Table";
import Toast from "../../components/Toast/Toast";
import { formatDate, formatDateOfBirth } from "../../utils";
import {
    useAddCouponMutation,
    useDeleteCouponMutation,
    useLazyGetAllCouponQuery,
    useModifyCouponMutation,
} from "../../services/coupon";
import { toast } from "react-toastify";

export default function CouponPage() {
    const [getAllCoupon, { data: coupons }] = useLazyGetAllCouponQuery();
    const [addCoupon, { isSuccess: addCouponSuccess }] = useAddCouponMutation();
    const [modifyCoupon, { isSuccess: modifyCouponSuccess }] =
        useModifyCouponMutation();
    const [deleteCoupon, { isSuccess: deleteCouponSuccess }] =
        useDeleteCouponMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [couponToEdit, setCouponToEdit] = useState(null);
    const [editingCouponId, setEditingCouponId] = useState(null);

    function handleInputChange(e) {
        setCouponToEdit((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }
    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
        setCouponToEdit(null);
        setEditingCouponId(null);
    }
    function handleEdit(id) {
        setOpen(true);
        const couponToEdit = coupons?.find((coupon) => coupon.id === id);
        setCouponToEdit(couponToEdit);
        setEditingCouponId(id);
    }
    function handleDelete(id) {
        deleteCoupon({ id });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        if (editingCouponId) {
            setIsLoading(true);
            modifyCoupon({ ...couponToEdit });
        } else {
            if (
                couponToEdit?.code &&
                couponToEdit.title &&
                couponToEdit.discountPercentage &&
                couponToEdit.expirationDate
            ) {
                setIsLoading(true);
                addCoupon({ ...couponToEdit });
            }
        }
    }

    useEffect(() => {
        getAllCoupon();
    }, [getAllCoupon]);

    useEffect(() => {
        if (deleteCouponSuccess) {
            toast.success("Delete successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                getAllCoupon();
            }, 500);
        }
    }, [deleteCouponSuccess, getAllCoupon]);
    useEffect(() => {
        if (modifyCouponSuccess) {
            setIsLoading(false);
            handleClose();
            toast.success("Edit successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                getAllCoupon();
            }, 500);
        }
    }, [modifyCouponSuccess, getAllCoupon]);
    useEffect(() => {
        if (addCouponSuccess) {
            setIsLoading(false);
            handleClose();
            toast.success("Add successfully", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            setTimeout(() => {
                getAllCoupon();
            }, 500);
        }
    }, [addCouponSuccess, getAllCoupon]);

    const columns = [
        { field: "id", headerName: "ID", width: 75 },
        {
            field: "code",
            headerName: "Coupon Code",
            width: 200,
            sortable: false,
        },
        {
            field: "title",
            headerName: "Title",
            width: 200,
            sortable: false,
        },
        {
            field: "discountPercentage",
            headerName: "Discount",
            headerAlign: "center",
            align: "center",
            width: 150,
            sortable: false,
            renderCell: (rowData) => <p>{rowData.row.discountPercentage}%</p>,
        },
        {
            field: "expirationDate",
            headerName: "Expiration Date",
            headerAlign: "center",
            width: 200,
            renderCell: (rowData) => (
                <p>{formatDate(rowData.row.expirationDate)}</p>
            ),
        },
        {
            field: "usedQuantity",
            headerName: "Used",
            headerAlign: "center",
            align: "center",
            type: "number",
            width: 100,
            renderCell: (rowData) => {
                const percent = (
                    (rowData.row.usedQuantity / rowData.row.usageLimit) *
                    100
                ).toFixed(2);
                return <p>{`${rowData.row.usedQuantity} (${percent}%)`}</p>;
            },
        },
        {
            field: "usageLimit",
            headerName: "Limit",
            headerAlign: "center",
            align: "center",
            type: "number",
            width: 100,
        },
        {
            field: "actions",
            headerName: "Actions",
            headerAlign: "center",
            align: "center",
            width: 100,
            sortable: false,
            renderCell: (rowData) => (
                <div className="flex items-center justify-center gap-4">
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(rowData.row.id)}>
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
            ),
        },
    ];
    const rows = coupons ?? [];

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-700 w-fit border-b-[3px] border-primary-light">
                COUPON
            </h1>
            <button
                onClick={() => handleOpen()}
                className="my-10 w-full max-w-fit flex items-center gap-x-2 text-white text-lg font-semibold uppercase rounded-md px-4 py-2 bg-primary transition-all duration-300 hover:bg-primary-light"
            >
                Add coupon
                <AddIcon />
            </button>
            <CouponFormDialog
                title={editingCouponId ? "UPDATE COUPON" : "ADD COUPON"}
                open={open}
                onSetClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="name"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Code
                        </label>
                        <input
                            id="code"
                            name="code"
                            className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                            type="text"
                            placeholder="Enter code"
                            value={couponToEdit?.code ?? ""}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="title"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            value={couponToEdit?.title ?? ""}
                            onChange={(e) => handleInputChange(e)}
                            className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="discountPercentage"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Discount
                        </label>
                        <input
                            id="discountPercentage"
                            name="discountPercentage"
                            className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                            type="number"
                            placeholder="Enter discount percentage"
                            value={couponToEdit?.discountPercentage ?? ""}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="expirationDate"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Expiration Date
                        </label>
                        <input
                            id="expirationDate"
                            name="expirationDate"
                            className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                            type="date"
                            placeholder="Enter expiration date"
                            value={formatDateOfBirth(
                                couponToEdit?.expirationDate
                            )}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label
                            htmlFor="usageLimit"
                            className="text-sm font-semibold text-gray-600 mb-2"
                        >
                            Usage Limit
                        </label>
                        <input
                            id="usageLimit"
                            name="usageLimit"
                            className="border-none outline-none py-2 px-3 rounded-[4px] bg-gray-100"
                            type="number"
                            placeholder="Enter usage limit"
                            value={couponToEdit?.usageLimit ?? ""}
                            onChange={(e) => handleInputChange(e)}
                        />
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
                            {editingCouponId ? "Update Coupon" : "Add Coupon"}{" "}
                            <span
                                className={`bar ${isLoading ? "" : "hidden"}`}
                            />
                        </Button>
                    </div>
                </form>
            </CouponFormDialog>
            <div className="bg-white px-6 py-4 rounded-md">
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
