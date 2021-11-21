import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { COLORS } from '../constants/Colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Ruler from 'rc-ruler-slider/dist';
import 'rc-ruler-slider/dist/index.css';

const style = {
  borderRadius: "40px",
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: COLORS.white,
  border: '2px solid #000',
  boxShadow: 24,
  padding: "2rem",
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

const handleDragChange: any = (value: any) => {
    console.log(value);
    // setBudget(value);
 }
  
const handleDragEnd: any = (value: any) => {
    console.log(value);
    setBudget(value);
 }
  
const handleDragStart: any = (value: any) => {
    console.log(value);
 }
  
const handleRenderValue: any = (value: any) => {
    return `${value.toFixed(2)}`;
 }
 const [budget, setBudget]: any = React.useState(props.budget);
const handlePopupClose: any = () => {
    props.handlePopupClose();
    props.handleBudgetSetting(budget);
}
  return (
    <div>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Budget Limit Setting
          </Typography>
          <div style={{display: "flex"}}>
          <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex",
        justifyContent: 'flex-end',
        width: "60%",
        textAlign: "left",
        fontSize: "36px",
        fontFamily: "Futura, sans-serif",
        fontWeight: "bold",
        color: COLORS.green }}>
            ${budget.toFixed(2)}
          </Typography>
          <Typography id="modal-modal-description" sx={{alignSelf: "flex-end"}}>/week</Typography>
          </div>

           <Ruler
                // ref={rulerRef}
                startValue={budget}
                onDrag={handleDragChange}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                renderValue={handleRenderValue}
                start={0}
                end={20}
                step={1}
            />
          <StyledButton onClick={() => handlePopupClose()}>Set!</StyledButton>
        </Box>
    </div>
  );
}