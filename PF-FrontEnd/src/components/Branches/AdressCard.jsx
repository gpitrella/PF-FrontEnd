import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

              
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.5)' }}
  >
    •
  </Box>
);

export default function BasicCard({branchOffice, setMap, map}) {

  let handleSetMap = function() {
    setMap({
      ...branchOffice
    });
  }

  let handleRemoveMap = function() {
    setMap(false);
  }

  return ( 
    
    <Card  variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {branchOffice.direction}
        </Typography>
        <Typography variant="h5" component="div">
          {branchOffice.name}
        </Typography>
        <Typography variant="body2">
          Horario de atencion
          <br />
          9hs a 17hs
        </Typography>
      </CardContent>
      <CardActions>
      {
        (!map || map.id !== branchOffice.id) &&
        <Button size="small" onClick = {handleSetMap}>View on Maps</Button>
      }
      {
        map && map.id === branchOffice.id &&
        <Button size="small" onClick = {handleRemoveMap}>Remove map</Button>
      }
      </CardActions>
    </Card>
  );
}
