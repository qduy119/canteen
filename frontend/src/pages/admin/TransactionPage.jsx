import { useEffect } from "react";
import { useLazyGetAllPaymentQuery } from "../../services/payment";
import { formatDate } from "../../utils";
import Status from "../../components/Status/Status";
import AdminTable from "../../components/Table/Table";

export default function TransactionPage() {
    const [getAllTransaction, { data: transaction }] =
        useLazyGetAllPaymentQuery();

    useEffect(() => {
        getAllTransaction();
    }, [getAllTransaction]);

    const columns = [
        {
            field: "id",
            headerName: "Transaction No.",
            headerAlign: "center",
            align: "center",
            width: 150,
        },
        {
            field: "userAvatar",
            headerName: "User",
            headerAlign: "center",
            align: "center",
            width: 150,
            renderCell: (rowData) => {
                return (
                    <div
                        className="w-[50px] h-[50px] bg-center bg-cover rounded-md border-[1px] border-primary-light"
                        style={{
                            backgroundImage: `url(${rowData.row.user?.avatar})`,
                        }}
                    />
                );
            },
        },
        {
            field: "orderId",
            headerName: "Order ID",
            headerAlign: "center",
            align: "center",
            width: 150,
        },
        {
            field: "payDate",
            headerName: "Pay Date",
            headerAlign: "center",
            align: "center",
            width: 200,
            renderCell: (rowData) => {
                const payment = rowData.row;
                return (
                    <p>
                        {payment.payDate ? formatDate(payment.payDate) : null}
                    </p>
                );
            },
        },
        {
            field: "bankCode",
            headerName: "Bank Code",
            headerAlign: "center",
            align: "center",
            width: 150,
        },
        {
            field: "cardType",
            headerName: "Card Type",
            headerAlign: "center",
            align: "center",
            width: 150,
        },
        {
            field: "amount",
            headerName: "Amount",
            headerAlign: "center",
            align: "center",
            type: "number",
            width: 150,
            renderCell: (rowData) => {
                return <p>${rowData.row.amount}</p>;
            },
        },
        {
            field: "status",
            headerName: "Status",
            headerAlign: "center",
            align: "center",
            width: 200,
            renderCell: (rowData) => {
                return <Status status={rowData.row.status} />;
            },
        },
    ];
    const rows = transaction ?? [];

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold text-gray-700 w-fit border-b-[3px] border-primary-light">
                TRANSACTION
            </h1>
            <div className="bg-white px-6 py-4 rounded-md my-10">
                <AdminTable
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[10, 20, 30, 40, 50]}
                />
            </div>
        </div>
    );
}
