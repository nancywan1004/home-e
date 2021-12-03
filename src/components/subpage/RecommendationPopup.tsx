import { COLORS } from '../../constants/Colors';
import { Box, Button, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        borderRadius: "40px",
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgColor: COLORS.white,
        padding: "2rem",
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between"
    }
});

const YesButton = withStyles({
    root: {
      margin: "auto auto auto 4rem",
      borderRadius: "20px",
      padding: "0.5rem 1rem 0.5rem 1rem",
      fontSize: "24px",
      fontFamily: "Futura, sans-serif",
      fontWeight: "bold",
      backgroundColor: COLORS.green,
      color: COLORS.white,
      '&:hover': {
        backgroundColor: COLORS.green,
    },
  }})(Button);

  const NoButton = withStyles({
    root: {
      margin: "auto auto auto 4rem",
      borderRadius: "20px",
      padding: "0.5rem 1rem 0.5rem 1rem",
      fontSize: "24px",
      fontFamily: "Futura, sans-serif",
      fontWeight: "bold",
      backgroundColor: COLORS.black,
      color: COLORS.white,
      '&:hover': {
        backgroundColor: COLORS.black,
    },
  }})(Button);

export function RecommendationPopup(props: any) {
    const classes = useStyles();
    return (
        <div>
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
              This link will visit an external site, do you want to continue?
              </Typography>
              <div className={classes.buttons}>
              <NoButton onClick={() => props.handleClose()}>No</NoButton>
              <YesButton onClick={() => props.handleClose()}>Yes</YesButton>
              </div>
            </Box>
        </div>
    )
}