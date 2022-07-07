import s from "./FavsColumns.module.css";

export const FavsColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 230,
      editable: true,
      renderCell: (params) => {
        return (
          <div className={s.cellWithImg}>
            <img className={s.cellImg} src={params.row.image} alt="productimg" />
          </div>
        );
      },
    },
    {
      field: "productname",
      headerName: "Products",
      width: 230,
      editable: true,
      renderCell: (params) => {
        return (
          <div className={s.cell}>
            {params.row.name}
          </div>
        );
      },
    },

    {
      field: "price",
      headerName: "Price",
      width: 230,
      editable: true,
      renderCell: (params) => {
        return (
          <div className={s.cell}>
            {params.row.price}
          </div>
        );
      },
    },
];  