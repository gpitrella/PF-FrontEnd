import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, CardContent, Card, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ModalAddAddress from '../ModalAddAddress/ModalAddAddress';
import { getUserDetail, showModalAddAddress } from '../../redux/actions';

import s from './CheckOutAddress.module.css';

export default function CheckOutAddress() {

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.general.user.user);
  const { oneuser } = useSelector(state => state.userReducer);
  const { show } = useSelector(state => state.modalAddAddress);

  React.useEffect(() => {
    dispatch(getUserDetail(id));
  }, []);

  if (Object.keys(oneuser).length === 0) return <></>;

  let handleAddAddress = function() {
    dispatch(showModalAddAddress());
  }

  return (
    <>
      {
        oneuser && Object.keys(oneuser).length > 0 && oneuser.useraddresses.length === 0 && 
        <Grid item xs = {12}>
          <Button 
            id="btn_checkou_editorder"
            fullWidth
            variant="outlined"
            size = "medium"
            onClick={handleAddAddress}
            sx={{ height: '100%%' }}
          >
            No Address Registred: Add Address
          </Button>
        </Grid>
      }
      {
        show && <ModalAddAddress />
      }
    </>
  )
}