import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import usePagination from "../common/Pagination/index";
import { Pagination, Alert } from "@material-ui/lab";
import { Container, Grid, Snackbar } from "@material-ui/core";
import axios from "axios";
import ProductTable from "./userlist/index";
import { GET_USER } from "../../services/apiUrl";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { deleteUser } from '../../services/dataService'
import { useHistory } from "react-router-dom";
import {
   DELETED_SUCCESS_MESSAGE,
   SERVER_ERROR
} from './constants'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
    background: '#14b8b5',
    textTransform: 'none'
  },
}));

const User = () => {
  const classes = useStyles();
  const history = useHistory();
  const [filterText, setFilterText] = useState("");
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState({ message: "", type: '' })
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    getData();
  }, []);

  const count = Math.ceil(users.length / PER_PAGE);
  const _DATA = usePagination(users, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const getData = async () => {
    try {
      const response = await axios.get(GET_USER);
      setUsers(response.data.data);
    } catch(err) {
      console.log('error', err)
    }
  };

  const handleRowDel = (user) => {
    let index = users.indexOf(user);
    users.splice(index, 1);
    setUsers([...users]);
    deleteUserRow(user._id)

  };

  const deleteUserRow = async(id) => {
    try {
      const result = await deleteUser(id)
      if(result?.data?.data) {
        setOpen(true)
        setToastMessage({ message: DELETED_SUCCESS_MESSAGE, type: 'success' })
      }
    }catch(err) {
      setOpen(true)
      setToastMessage({ message: SERVER_ERROR, type: 'error' })
    }
  }


  const handleProductTable = (evt) => {
    history.push(`/user/${evt._id}`);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpen(false);
};

  return (
    <>
      <Container className={classes.root} maxWidth="sm">
        <Grid container item spacing={3} justify="space-around" alignItems="center">
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={() => history.push('/user')}
            >
              Create User
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={3} justify="space-around" alignItems="center">
          <ProductTable
            onRowEdit={(evt) => handleProductTable(evt)}
            onRowDel={(evt) => handleRowDel(evt)}
            users={_DATA.currentData()}
            filterText={filterText}
          />
          {!_DATA.currentData() && <Grid container spacing={3}>
            <Grid item xs={8}>
              <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                color="primary"
                onChange={handleChange}
              />
            </Grid>
          </Grid>}
        </Grid>
        {open && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={toastMessage.type}>
                    {toastMessage.message}
                </Alert>
            </Snackbar>
            }
      </Container>

    </>
  );
};

export default User;
