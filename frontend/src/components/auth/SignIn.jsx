import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Navigate } from 'react-router';

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
    const dispatch = useDispatch();
    const [creds, setCreds] = useState({
        email : "",
        password : ""
    });
    const auth = useSelector(state => state.auth);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(creds));
        setCreds({
            email : "",
            password : ""
        });
    };

    if(auth._id) return <Navigate to = "/" />

    return ( 
        <>
        <form noValidate autoComplete = "off" className = {classes.formStyle} onSubmit = {handleSubmit}>
            <Typography variant = "h5">
                Sign In
            </Typography>
            <TextField
                id="enter-email"
                label="Email"
                variant = "outlined"
                fullWidth
                className = {classes.spacing}
                value = {creds.email}
                onChange = {(e) => setCreds({
                    ...creds,
                    email : e.target.value
                })}
            />
            <TextField
                id="enter-password"
                label="Password"
                type="password"
                variant = "outlined"
                fullWidth
                className = {classes.spacing}
                value = {creds.password}
                onChange = {(e) => setCreds({
                    ...creds,
                    password : e.target.value
                })}
            />
            <Button variant = "contained" color = "primary" type = "submit" className = {classes.spacing}>
                Sign In
            </Button>
        </form>
        </>
     );
}
 
export default SignIn;