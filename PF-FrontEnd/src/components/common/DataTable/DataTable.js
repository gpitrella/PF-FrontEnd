import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable ({ rows, columns, loading, sx }){
    const [pageSize, setPageSize] = useState(5);
    
    return (
        <DataGrid 
            rows={rows}
            columns={columns}
            loading={loading}
            sx={sx}
            checkboxSelection
            disableSelectionOnClick
            pageSize={10}
            rowsPerPageOptions={[9]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            experimentalFeatures={{ newEditingApi: true }}
        />
    )
};