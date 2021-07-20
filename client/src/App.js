import React from "react";
import "./App.css"
import { BrowserRouter as Router } from "react-router-dom";
import Routers from './routes/index'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Container } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "#eae9e9",
  },
  header: {
    background: '#fff',
    padding: '20px 10px',
    color: '#000'
  },
  title: {
    flexGrow: 1,
  },
  container: {
    textAlign: 'center'
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="static" className={classes.header}>
          Archimydes Challanges
        </AppBar>
        <Container className={classes.container}>
          <Routers />
        </Container>
      </div>
    </Router>
  );
};

export default App;
