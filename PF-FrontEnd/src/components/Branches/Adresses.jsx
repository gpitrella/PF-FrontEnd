import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import BasicCard from "./AdressCard";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from 'react-redux';
import { getBranchOffices, resetCheckoutAddress } from '../../redux/actions';
import Loading from '../SVG/Loading';
import ServerError from '../SVG/ServerError';

import s from './Address.module.css';

// const data = [
//   {
//     city: "CABA",
//     adrss: "Av. Leandro N. Alem 652",
//     phone: "11 5478-3658",
//     hours: "9hs a 17hs",
//   },
//   {
//     city: "CABA",
//     adrss: "Cerrito 750",
//     phone: "11 5568-8758",
//     hours: "9hs a 17hs",
//   },
//   {
//     city: "CABA",
//     adrss: "Av. Callao 1521",
//     phone: "11 6587-2253",
//     hours: "9hs a 17hs",
//   },
//   {
//     city: "Cordoba",
//     adrss: "Av. Duarte Quirós 1400",
//     phone: "351 482-8184",
//     hours: "9hs a 17hs",
//   },
//   {
//     city: "La Plata",
//     adrss: "60 esq 118",
//     phone: "221 222 2222",
//     hours: "9hs a 17hs",
//   },
//   {
//     city: "Berazategui",
//     adrss: "Av. 14 4092",
//     phone: "11 425 60135",
//     hours: "9hs a 17hs",
//   },
//   {
//     city: "Mendoza",
//     adrss: "Chile 964",
//     phone: "261 426-2852",
//     hours: "9hs a 17hs",
//   },
//   {
//     city: "Rawson",
//     adrss: "Ezcurra 786",
//     phone: "280 441-3685",
//     hours: "9hs a 17hs",
//   },
// ];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Adresses = () => {

  const dispatch = useDispatch();
  const { branchOffices, errorBranchOffices } = useSelector(state => state.general);

  React.useEffect(() => {
    dispatch(getBranchOffices());
    return () => dispatch(resetCheckoutAddress());
  }, []);

  let handleRetry = function() {
    dispatch(resetCheckoutAddress());
    dispatch(getBranchOffices());
  }

  if (branchOffices.length === 0 && !errorBranchOffices) {
    return (
      <div className = {s.container}>
        <div className = {s.imageContainer}>
          <div className = {s.loadingContainer}>
            <Loading />
          </div>
        </div>
        <span className = {s.spanLoading}>Loading Sucursals...</span>
      </div>
    )
  }

  if (errorBranchOffices) {
    return (
      <div className = {s.container}>
        <div className = {s.imageContainer}>
          <div className = {s.errorContainer}>
            <ServerError />
          </div>
        </div>
        <span className = {s.errorMsg}>Error Loading Sucursals...</span>
        <button className = {s.btnRetry} onClick = {handleRetry}>Retry</button>
      </div>
    )
  }

  return (
    <div className = {s.container}>
      <br />
      <br />
      <Typography
        align="center"
        sx={{ fontSize: 30 }}
        color="text.secondary"
        gutterBottom
        className= {s.title}
      >
        Our Branches
      </Typography>
      <br />
      <br />
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className = {s.grid}>
 {/*         {data.map((e) => (
            <Grid item xs={12} sm={3}>
              <Item>
                <BasicCard data={e} />
              </Item>
            </Grid>
          ))}*/}
          {
            branchOffices && branchOffices.length > 0 && branchOffices.map((branchOffice, index) => 

               <Grid item xs={12} sm={3} key = {`branch-office-card-${branchOffice.id}-${index}`}>
                <Item>
                  <BasicCard branchOffice = {branchOffice} />
                </Item>
              </Grid>

            )
          }
        </Grid>
      </Box>
    </div>
  );
};
export default Adresses;
