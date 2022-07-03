export const BrandsColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Brands",
      width: 230,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="cell">
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "image",
      headerName: "Icon",
      width: 230,
      editable: true,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="brandicon" />
          </div>
        );
      },
    },
];  