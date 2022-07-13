import s from "./NotificationsColumns.module.css";

export const notificationColumns = [
    { field: "id", headerName: "ID", width: 30 },
    {
      field: "name",
      headerName: "Product Name",
      width: 200,
      // editable: true,
      renderCell: (params) => {
        return (
          <div className={s.cell}>
            {params.row?.products[0]?.name}
          </div>
        );
      },
    },
    { 
      field: "question", 
      headerName: "Question", 
      width: 250,
      renderCell: (params) => {
        return (
          <div className={s.cell}>
            {params.row?.comment}
          </div>
        );
      },    
    },
    { 
      field: "date created", 
      headerName: "Date Created", 
      width: 100,
      renderCell: (params) => {
        return (
          <div className={s.cell}>
            {params.row?.createdAt.slice(0,10)}
          </div>
        );
      },   
    },
    { 
      field: "answer done", 
      headerName: "Answer", 
      width: 100,
      renderCell: (params) => {
        return (
          <div className={s.cell}>
            {!params.row.answer ? 'WOut Answer' : params.row?.answer}
          </div>
        );
      },  
    },
    { 
      field: 
      "date answered", 
      headerName: "Date Answered", 
      width: 100,
      renderCell: (params) => {
        return (
          <div className={s.cell}>
            {!params.row.answer ? '---' : params.row?.updatedAt}
          </div>
        );
      }, 

    },
  ];