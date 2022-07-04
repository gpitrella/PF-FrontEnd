import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable ({ rows, columns, loading, sx }){
    
    return (
        <DataGrid 
            rows={rows}
            columns={columns}
            loading={loading}
            sx={sx}
            checkboxSelection
            disableSelectionOnClick
            pageSize={9}
            rowsPerPageOptions={[9]}
            experimentalFeatures={{ newEditingApi: true }}
        />
    )
};