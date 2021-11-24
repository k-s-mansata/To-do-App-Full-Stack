import React from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    formStyle : {
        margin : "20px auto",
        padding : "30px",
        borderRadius : "9px",
        boxShadow : "0px 0px 12px -3px #000000"
    },
    spacing : {
        marginTop : "20px"
    }
});

const SignIn = () => {
    const classes = useStyle();

    return ( 
        <>
        <form noValidate autoComplete = "off" className = {classes.formStyle}>
            <Typography variant = "h5">
                Sign In
            </Typography>
            <TextField
                id="enter-email"
                label="Email"
                variant = "outlined"
                fullWidth
                className = {classes.spacing}
            />
            <TextField
                id="enter-password"
                label="Password"
                type="password"
                variant = "outlined"
                fullWidth
                className = {classes.spacing}
            />
            <Button variant = "contained" color = "primary" type = "submit" className = {classes.spacing}>
                Sign In
            </Button>
        </form>
        </>
     );
}
 
export default SignIn;