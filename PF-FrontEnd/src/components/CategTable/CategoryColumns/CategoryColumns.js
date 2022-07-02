export const categoryColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Category",
      width: 230,
      // editable: true,
      renderCell: (params) => {
        return (
          <div className="cell">
            {params.row.name}
          </div>
        );
      },
    },
  ];