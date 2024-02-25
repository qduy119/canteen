import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function AdminTable({ rows, columns, pageSizeOptions }) {
    return (
        <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        page: 0,
                        pageSize: pageSizeOptions[0],
                    },
                },
            }}
            pageSizeOptions={pageSizeOptions}
            slots={{ toolbar: GridToolbar }}
            style={{ fontSize: 16 }}
            density="comfortable"
        />
    );
}
