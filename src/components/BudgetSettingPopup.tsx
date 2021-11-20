import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { COLORS } from '../constants/Colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: COLORS.white,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledButton = withStyles({
    root: {
      float: "right",
      borderRadius: "20px",
      padding: "1rem",
      fontSize: "24px",
      fontFamily: "Futura, sans-serif",
      fontWeight: "bold",
      backgroundColor: COLORS.green,
      color: COLORS.white,
      '&:hover': {
        backgroundColor: COLORS.green,
    },
  }})(Button);

export function BudgetSettingPopup(props: any) {
  return (
    <div>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Budget Limit Setting
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            $12.00 /week
          </Typography>
          <StyledButton onClick={() => props.handlePopupClose()}>Set!</StyledButton>
        </Box>
    </div>
  );
}