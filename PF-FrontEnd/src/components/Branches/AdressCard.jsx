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

export default function BasicCard({data}) {
  return ( 
    
    <Card  variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.city}
        </Typography>
        <Typography variant="h5" component="div">
          {data.adrss}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.phone}
        </Typography>
        <Typography variant="body2">
          Horario de atencion
          <br />
          {data.hours}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View on Maps</Button>
      </CardActions>
    </Card>
  );
}
