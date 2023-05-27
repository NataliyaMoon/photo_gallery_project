import {useEffect, useState} from "react";
import {Avatar, Button, Container, Grid, Typography, Link, Box, CssBaseline, Alert} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
import {REGISTER} from "../../../constants/routes";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../../store/actions/usersActions";
import FormElement from "../../../components/UI/Form/FormElement/FormElement";
import {setLoginError} from "../../../store/services/usersSlice";

const theme = createTheme();

const Login = () => {
    const error = useSelector(({usersState}) => usersState.loginError);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const location = useLocation();

    useEffect(() => {
        dispatch(setLoginError(null));
    }, [location]);

    const inputChangeHandler = (e) => {
        const {name, value} = e.currentTarget;

        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({
            data: {...state},
            callback: () => navigate('/')
        }));
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
                        Login
                    </Typography>
                    {error && <Alert severity="error">{error.error}</Alert>}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <FormElement
                                required={true}
                                label="Username"
                                name="username"
                                onChange={inputChangeHandler}
                                value={state.username}
                            />
                            <FormElement
                                required={true}
                                name="password"
                                label="Password"
                                type="password"
                                onChange={inputChangeHandler}
                                value={state.password}
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2" component={RouterLink} to={REGISTER}>
                                    Register
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
