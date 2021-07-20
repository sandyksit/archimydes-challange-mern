import React, { useEffect, useState, useReducer } from "react";
import { Button, Grid, TextField, Breadcrumbs, Link, Snackbar, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getRoles, postUser, getUserById, putUser } from '../../../services/dataService'
import { useParams, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

import {
    SERVER_ERROR, CANCEL_LABEL, CREATE_USER_LABEL, UPDATE_USER_LABEL,
    CREATED_SUCCESS_MESSAGE, UPDATED_SUCCESS_MESSAGE
} from '../constants'

const useStyles = makeStyles((theme) => ({
    cancelButton: {
        margin: theme.spacing(1),
        width: '100%',
        border: 0,
        marginTop: '20px',
        textTransform: 'none'
    },
    button: {
        margin: theme.spacing(1),
        width: '100%',
        background: '#14b8b5',
        textTransform: 'none'
    },
    root: {
        padding: theme.spacing(3, 2)
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        width: '100%',
        margin: '10px'
    },
    form: {
        margin: '10px',
        padding: '20px',
        background: '#fff',
        borderRadius: '4px'
    },
    link: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        }
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
        verticalAlign: 'inherit',
    },
    formControl: {
        width: '100%',
        margin: '10px'
    }
}));

const UserForm = (props) => {
    const classes = useStyles();

    const history = useHistory();
    const { id } = useParams()
    const [role, setRole] = useState([]);
    const [open, setOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState({ message: "", type: '' })

    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: "",
            email: "",
            role: ""
        }
    );

    useEffect(() => {
        getRoleData()
    }, [])

    const getRoleData = async () => {
        try {
            const result = await getRoles()
            if (result?.data?.data) {
                setRole(result?.data?.data)
                if (id) {
                    getUserData(result?.data?.data)
                }
            }
        } catch (err) {
            console.log("err", err)
        }
    }

    const getUserData = async (roleParams) => {
        try {
            const result = await getUserById(id)
            if (result?.data?.data) {
                const { name, email, role: resRole } = result?.data?.data[0]
                const selectRole = roleParams.filter(item => item._id === resRole[0])
                let data = { ...formInput, name, email, role: selectRole[0]?.name }
                setFormInput(data)
            }
        } catch (err) {
            setOpen(true)
            setToastMessage({ message: err.data.message, type: 'error' })
        }
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if (!formInput.name) return
        submitPost()
    };

    const submitPost = async () => {
        const { name, email } = formInput;
        const selectedRole = role.filter(item => item.name === formInput.role)
        const params = {
            name,
            email,
            role: selectedRole
        }
        try {
            const result = id ? await putUser(id, params) : await postUser(params)
            if (result?.data?.data) {
                setOpen(true)
                setToastMessage({ message: id ? UPDATED_SUCCESS_MESSAGE : CREATED_SUCCESS_MESSAGE, type: 'success' })
                history.push('/')
            }
        } catch (err) {
            console.log("err", err)
            setOpen(true)
            setToastMessage({ message: SERVER_ERROR, type: 'error' })
        }

    }

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };


    const handleChange = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const mode = id ? UPDATE_USER_LABEL : CREATE_USER_LABEL;
    return (
        <Container className={classes.root} maxWidth="sm">
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link color="textPrimary" className={classes.link} component="button">
                    <ArrowBackIcon className={classes.icon} onClick={() => history.push('/')} />{mode}
                </Link>
            </Breadcrumbs>
            <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                    label="Name"
                    id="margin-normal"
                    name="name"
                    variant="outlined"
                    value={formInput.name}
                    defaultValue={formInput.name}
                    className={classes.textField}
                    onChange={handleInput}
                />

                <TextField
                    label="Email"
                    id="margin-normal"
                    name="email"
                    variant="outlined"
                    value={formInput.email}
                    defaultValue={formInput.email}
                    className={classes.textField}
                    onChange={handleInput}
                />

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel >Role</InputLabel>
                    <Select
                        onChange={handleChange}
                        label="Role"
                        name="role"
                        value={formInput.role}
                        defaultValue={formInput.role}
                    >
                        {role.map((item, inx) => (
                            <MenuItem key={inx} value={item.name}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid container direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12}
                    >
                        <Button
                            type="button"
                            variant="contained"
                            className={classes.cancelButton}
                            onClick={() => history.push('/')}
                        >
                            {CANCEL_LABEL}
                        </Button>
                    </Grid>
                    <Grid item
                        xs={12}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            {mode}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {open && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={toastMessage.type}>
                    {toastMessage.message}
                </Alert>
            </Snackbar>
            }
        </Container>
    );
}

export default UserForm;
