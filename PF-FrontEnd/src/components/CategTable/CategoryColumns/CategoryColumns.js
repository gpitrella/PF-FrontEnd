import s from "./CategoryColumns.module.css";

export const categoryColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Category",
      width: 230,
      // editable: true,
      renderCell: (params) => {
        return (
          <div className={s.cell}>
            {params.row.name}
          </div>
        );
      },
    },
  ];