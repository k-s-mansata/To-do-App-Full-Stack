import React from 'react';
// eslint-disable-next-line
import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Todos from './components/todos/Todos';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NavBar from './components/navBar/NavBar'; 

const useStyles = makeStyles({
  contentStyle : {
    margin : "30px auto"
  }
});

function App() {
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        <Container maxWidth = "md">
          <NavBar/>
          <Container classes = {classes.contentStyle} maxWidth = "sm">
            <Routes>
              <Route path="/signin" element={<SignIn />}/>
              <Route path="/signup" element={<SignUp />}/>
              <Route path="/" element={<Todos />}/>
            </Routes>
          </Container>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
