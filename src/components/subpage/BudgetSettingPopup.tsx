import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { COLORS } from '../../constants/Colors';
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

const useStyles = makeStyles({
    budgetUsage: {
        display: "flex",
        justifyContent: "space-evenly",
    }
});

export function BudgetSettingPopup(props: any) {
    const classes = useStyles();
    const coffeeSaveCalc: any = (value: any) => {
        console.log(value);
        if (value >= 12) {
            return 0;
        } else {
            return (12 - value) / 2;
        }
    }

    const handleDragChange: any = (value: any) => {
        console.log(value);
        // setBudget(value);
    }

    const handleDragEnd: any = (value: any) => {
        console.log(value);
        setBudget(value);
        setCoffee(coffeeSaveCalc(value));
    }

    const onChanged: any = (value: any) => {
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
    const [coffee, setCoffee]: any = React.useState(props.coffee);
    const handlePopupClose: any = () => {
        props.handlePopupClose();
        props.handleBudgetSetting(budget, coffee);
    }
    return (
        <div>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Budget Limit Setting
                </Typography>
                <div style={{ display: "flex" }}>
                    <Typography id="modal-modal-description" sx={{
                        mt: 2, display: "flex",
                        justifyContent: 'flex-end',
                        width: "60%",
                        textAlign: "left",
                        fontSize: "36px",
                        fontFamily: "Futura, sans-serif",
                        fontWeight: "bold",
                        color: COLORS.green
                    }}>
                        ${budget.toFixed(2)}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ alignSelf: "flex-end" }}>/week</Typography>
                </div>

                <Ruler
                    startValue={props.budget}
                    onDrag={handleDragChange}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    renderValue={handleRenderValue}
                    start={0}
                    end={20}
                    step={1}
                />
                <h2 style={{ fontSize: "20px" }}>Equivalent to saving <p style={{ color: COLORS.green, display: "inline" }}>{coffee}</p> coffees/week!</h2>
                <div className={classes.budgetUsage}>
                    <Box sx={{ color: COLORS.grayFont, fontFamily: "Futura, sans-serif", backgroundColor: COLORS.gray + "50", borderRadius: "20px", padding: "0 1rem 0 1rem" }}>
                        <h2 style={{ fontWeight: "bold" }}>${12.00.toFixed(2)}</h2>
                        <p style={{ alignSelf: "flex-end", fontWeight: "normal", marginLeft: "1rem" }}>Recommended</p>
                    </Box>
                    <Box sx={{ color: COLORS.grayFont, fontFamily: "Futura, sans-serif", backgroundColor: COLORS.gray + "50", borderRadius: "20px", padding: '0 1rem 0 1rem' }}>
                        <h2 style={{ fontWeight: "bold" }}>${17.50.toFixed(2)}</h2>
                        <p style={{ alignSelf: "flex-end", fontWeight: "normal", marginLeft: "1rem" }}>Area Average</p>
                    </Box>
                </div>
                <Button sx={{
                    mt: "1rem",
                    padding: "1rem 1.5rem 1rem 1.5rem",
                    float: "right",
                    borderRadius: "20px",
                    fontSize: "24px",
                    fontFamily: "Futura, sans-serif",
                    fontWeight: "bold",
                    backgroundColor: COLORS.green,
                    color: COLORS.white,
                    '&:hover': {
                        backgroundColor: COLORS.green,
                    }
                }} onClick={() => handlePopupClose()}>Set!</Button>
            </Box>
        </div>
    );
}