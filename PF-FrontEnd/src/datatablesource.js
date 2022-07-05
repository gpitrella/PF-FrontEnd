export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {/* <img className="cellImg" src={params.row.image} alt="avatar" /> */}
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "admin",
    headerName: "Admin",
    width: 100,
  },
  {
    field: "isactive",
    headerName: "Active",
    width: 160,
    // renderCell: (params) => {
    //   return (
        
    //       <div className={`${params.row.isactive}`}>
    //         {params.row.isactive}
    //       </div>

        
    //   );
    // },
  },
  
];

//temporary data
// export const userRows = [
//   {
//     id: 1,
//     name: "Bettina",
//     img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//     email: "bettinaigamboa@gmail.com",
//     password: "123456",
//     admin: true,
//     isactive: "active"
// },
// {
//     id: 2,
//     name: "Enzo",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "enz997.ing.ind@gmail.com",
//     password: "123456",
//     admin: true,
//     isactive: true
// },
// {
//     id: 3,
//     name: "Lucas",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "lucassebastianbattaglia@gmail.com",
//     password: "123456",
//     admin: true,
//     isactive: true
// },
// {
//     id: 4,
//     name: "Nicolas",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "nicolasexeburgos@gmail.com",
//     password: "123456",
//     admin: true,
//     isactive: true
// },
// {
//     id: 5,
//     name: "FedeF",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "federicofaraz@gmail.com",
//     password: "123456",
//     admin: true,
//     isactive: true
// },
// {
//     id: 6,
//     name: "FedeR",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "romerof14@gmail.com",
//     password: "123456",
//     admin: true,
//     isactive: true
// },
// {
//     id: 7,
//     name: "Gabriel",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "gabrielpitrella@gmail.com",
//     password: "123456",
//     admin: true,
//     isactive: true
// },
// {
//     id: 8,
//     name: "Horacio",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "ahabitu@gmail.com",
//     password: "123456",
//     admin: true,
//     isactive: true
// },
// {
//     id: 9,
//     name: "Juan",
//     img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
//     email: "Juanc@gmail.com",
//     password: "123456",
//     admin: false,
//     isactive: true
// },
  // {
  //   id: 1,
  //   username: "Snow",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   status: "active",
  //   email: "1snow@gmail.com",
  //   age: 35,
  // },
  // {
  //   id: 2,
  //   username: "Jamie Lannister",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "2snow@gmail.com",
  //   status: "passive",
  //   age: 42,
  // },
  // {
  //   id: 3,
  //   username: "Lannister",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "3snow@gmail.com",
  //   status: "pending",
  //   age: 45,
  // },
  // {
  //   id: 4,
  //   username: "Stark",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "4snow@gmail.com",
  //   status: "active",
  //   age: 16,
  // },
  // {
  //   id: 5,
  //   username: "Targaryen",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "5snow@gmail.com",
  //   status: "passive",
  //   age: 22,
  // },
  // {
  //   id: 6,
  //   username: "Melisandre",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "6snow@gmail.com",
  //   status: "active",
  //   age: 15,
  // },
  // {
  //   id: 7,
  //   username: "Clifford",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "7snow@gmail.com",
  //   status: "passive",
  //   age: 44,
  // },
  // {
  //   id: 8,
  //   username: "Frances",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "8snow@gmail.com",
  //   status: "active",
  //   age: 36,
  // },
  // {
  //   id: 9,
  //   username: "Roxie",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "snow@gmail.com",
  //   status: "pending",
  //   age: 65,
  // },
  // {
  //   id: 10,
  //   username: "Roxie",
  //   img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  //   email: "snow@gmail.com",
  //   status: "active",
  //   age: 65,
  // },
//];
