export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Brands",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.row.name}
            <img className="cellImg" src={params.row.image} alt="brandicon" />
          </div>
        );
      },
    },
];  