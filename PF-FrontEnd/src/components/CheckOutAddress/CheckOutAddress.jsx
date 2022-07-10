import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { makeStyles } from "@material-ui/core/styles";
import ModalAddAddress from '../ModalAddAddress/ModalAddAddress';
import { getUserDetail, showModalAddAddress, getBranchsOfficesWithDistance, resetCheckoutAddress } from '../../redux/actions';

import s from './CheckOutAddress.module.css';

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function CheckOutAddress({ selectDirection, setSelectDirection, radioBranchOffice, setradioBranchOffice }) {

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.general.user.user);
  const { oneuser, reloadUserDetails } = useSelector(state => state.userReducer);
  const { show } = useSelector(state => state.modalAddAddress);
  const { branchOffices, errorBranchOffices } = useSelector(state => state.general);

  // const [ selectDirection, setSelectDirection ] = React.useState('');
  // const [ radioBranchOffice, setradioBranchOffice ] = React.useState('');

  const classes = useStyles();

  React.useEffect(() => {
    dispatch(getUserDetail(id));

    return () => {
      dispatch(resetCheckoutAddress());
    }
  }, []);

  React.useEffect(() => {
    if (reloadUserDetails) dispatch(getUserDetail(id));
  }, [reloadUserDetails]);

  React.useEffect(() => {
    if (branchOffices.length > 0) setradioBranchOffice(branchOffices[0].branchOffice.id);
    else setradioBranchOffice('');
  }, [branchOffices])

  if (Object.keys(oneuser).length === 0) return <></>;

  let handleAddAddress = function() {
    dispatch(showModalAddAddress());
  }

  let handleSelectChange = function(e) {
    let { value } = e.target;
    let addressSelected = oneuser.useraddresses.find(address => address.id === value);

    setSelectDirection(value);
    dispatch(getBranchsOfficesWithDistance(addressSelected.latitude, addressSelected.longitude));
  }

  let handleReload = function() {
    let addressSelected = oneuser.useraddresses.find(address => address.id === selectDirection);
    dispatch(getBranchsOfficesWithDistance(addressSelected.latitude, addressSelected.longitude));
  }

  let handleRadioChange = function(e) {
    let { value } = e.target;
    setradioBranchOffice(value);
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
        <>
          <Grid item xs = {12} sm = {9}>
            <FormControl required fullWidth>
              <InputLabel id="demo-simple-select-required-label">Address</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={selectDirection}
                label="Address *"
                onChange={handleSelectChange}
                fullWidth
              >
              {
                oneuser && oneuser.useraddresses.map((address, index) => 

                  <MenuItem value={address.id} key = {`address-select-${address.id}-${index}`}>{address.direction}</MenuItem>

                )
              }
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs = {12} sm = {3}>
            <Button 
              id="btn_checkou_editorder"
              fullWidth
              variant="outlined"
              size = "medium"
              onClick={handleAddAddress}
            >
              Add New Address
            </Button>
          </Grid>
        </>
      }
      {
        errorBranchOffices &&
        <Grid item xs = {12}>
          <Button 
            id="btn_checkou_editorder"
            fullWidth
            variant="outlined"
            size = "medium"
            onClick={handleReload}
            sx={{ height: '100%%' }}
          >
            Error Loading Sucursals. Click To Reload
          </Button>
        </Grid>
      }
      {
        branchOffices && branchOffices.length > 0 && 
        <Grid item xs = {12}>
          <FormControl fullWidth>
            <FormLabel 
              id = "demo-radio-buttons-group-label"
              fullWidth
              labelPlacement = "start"
              classes = {classes}
            >
              Choose a Sucursal:
            </FormLabel>
            <RadioGroup
              aria-labelledby = "demo-radio-buttons-group-label"
              value = {radioBranchOffice}
              name = "radio-buttons-group"
              fullWidth
              onChange = {handleRadioChange}
            >
            {
              branchOffices.map((office, index) => 
                
                <FormControlLabel
                  value = { office.branchOffice.id }
                  control = { <Radio /> }
                  label = {`${office.branchOffice.name} - ${office.branchOffice.direction} - ${Math.round(office.distance)}KM - ${index === 0 ? ' Recommended *' : ''}`}
                  key = {`radio-branchoffice-${office.branchOffice}`}
                />
              )
            }
            </RadioGroup>
          </FormControl>
        </Grid>
      }
      {
        show && <ModalAddAddress />
      }
    </>
  )
}