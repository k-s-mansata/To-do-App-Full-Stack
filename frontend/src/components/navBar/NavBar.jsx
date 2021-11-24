import React from 'react';
import {AppBar, Typography, Toolbar, Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root :{
        flexGrow : 1
    },
    linkStyle: {
      color : "#fafafa",
      textDecoration : "none"
    }
  });
  

const NavBar = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleSignout = () => {
        //Signout user
        navigate("/signin");
    };

    return ( 
        <>
            <AppBar position = "static">
                <Toolbar>
                    <Typography variant = "h4" className = {classes.root}>
                        <Link className = {classes.linkStyle} to = "/">Todo App</Link>
                    </Typography>
                    <Typography variant = "subtitle2" className = {classes.root}>
                        Logged in As Krupal
                    </Typography>
                    <Button color = "inherit" onClick = {() => handleSignout()}>
                        Sign out
                    </Button>
                    <Button color = "inherit">
                        <Link className = {classes.linkStyle} to = "/signin">
                            Sign In
                        </Link>
                    </Button>
                    <Button color = "inherit">
                        <Link className = {classes.linkStyle} to = "/signup">
                            Sign Up
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </>
     );
}
 
export default NavBar;