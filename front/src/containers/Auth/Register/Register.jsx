import {useEffect, useState} from "react";
import {Avatar, Button, Container, Grid, Typography, Link, Box, CssBaseline} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import {LOGIN} from "../../../constants/routes";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../../store/actions/usersActions";
import FormElement from "../../../components/UI/Form/FormElement/FormElement";
import {setRegisterError} from "../../../store/services/usersSlice";

const theme = createTheme();

const Register = () => {
    const error = useSelector(({usersState}) => usersState.registerError);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const location = useLocation();

    useEffect(() => {
        dispatch(setRegisterError(null));
    }, [location]);

    const inputChangeHandler = (e) => {
        const {name, value} = e.currentTarget;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({
            data: {...state},
            callback: () => navigate('/')
        }));
    };

    const getFieldError = (field) => {
        return error?.errors[field]?.message;
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <FormElement
                                required={true}
                                label="Username"
                                name="username"
                                onChange={inputChangeHandler}
                                value={state.username}
                                error={getFieldError('username')}
                            />
                            <FormElement
                                required={true}
                                name="password"
                                label="Password"
                                type="password"
                                onChange={inputChangeHandler}
                                value={state.password}
                                error={getFieldError('password')}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" component={RouterLink} to={LOGIN}>
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
