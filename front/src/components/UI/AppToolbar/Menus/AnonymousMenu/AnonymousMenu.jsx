import {NavLink} from "react-router-dom";
import {LOGIN, REGISTER} from "../../../../../constants/routes";
import {Button} from '@mui/material';

const AnonymousMenu = () => {
    return <>
        <Button color="inherit" component={NavLink} to={REGISTER}>Register</Button>
        <Button color="inherit" component={NavLink} to={LOGIN}>Login</Button>
    </>;
};

export default AnonymousMenu;
