import React, {useState} from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";


import { signUp } from '../../store/actions/authActions';

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

const SignUp = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [user, setUser] = useState({
        name: "",
        email : "",
        password : ""
    });
    const handleSubmit = (e) => {
        e.preventDefault(); 
        dispatch(signUp(user));
        setUser({
            name: "",
            email : "",
            password : ""
        });
    };

    if(auth._id) {
        return (<Navigate to = "/" />)
    }

    return ( 
        <>
        <form noValidate autoComplete = "off" className = {classes.formStyle} onSubmit = {handleSubmit}>
            <Typography variant = "h5">
                Sign Up
            </Typography>
            <TextField
                id="enter-name"
                label="Name"
                variant = "outlined"
                fullWidth
                className = {classes.spacing}
                value = {user.name}
                onChange = {(e) => setUser({...user, name : e.target.value})}
            />
            <TextField
                id="enter-email"
                label="Email"
                variant = "outlined"
                fullWidth
                className = {classes.spacing}
                value = {user.email}
                onChange = {(e) => setUser({...user, email : e.target.value})}
            />
            <TextField
                id="enter-password"
                label="Password"
                type="password"
                variant = "outlined"
                fullWidth
                className = {classes.spacing}
                value = {user.password}
                onChange = {(e) => setUser({...user, password : e.target.value})}
            />
            <Button variant = "contained" color = "primary" type = "submit" className = {classes.spacing}>
                Sign In
            </Button>
        </form>
        </>
     );
}
 
export default SignUp;