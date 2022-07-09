import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ModalAddAddress from '../ModalAddAddress/ModalAddAddress';
import { getUserDetail, showModalAddAddress } from '../../redux/actions';

import s from './CheckOutAddress.module.css';

export default function CheckOutAddress() {

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.general.user.user);
  const { oneuser } = useSelector(state => state.userReducer);
  const { show } = useSelector(state => state.modalAddAddress);

  const [ selectDirection, setSelectDirection ] = React.useState(null);

  React.useEffect(() => {
    dispatch(getUserDetail(id));
  }, []);

  if (Object.keys(oneuser).length === 0) return <></>;

  let handleAddAddress = function() {
    dispatch(showModalAddAddress());
  }

  let handleChange = function(e) {
    let { value } = e.target;

    setSelectDirection(value);
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
        oneuser && Object.keys(oneuser).length > 0 && oneuser.useraddresses.length > 0 && 
        <Grid item xs = {12}>
          <FormControl required fullWidth>
            <InputLabel id="demo-simple-select-required-label">Address</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={selectDirection}
              label="Address *"
              onChange={handleChange}
              fullWidth
            >
            {
              oneuser && oneuser.useraddresses.map((address, index) => 

                <MenuItem value={address.id}>{address.direction}</MenuItem>

              )
            }
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Grid>
      }
      {
        show && <ModalAddAddress />
      }
    </>
  )
}