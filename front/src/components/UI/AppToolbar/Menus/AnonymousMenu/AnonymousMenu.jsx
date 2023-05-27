import {NavLink} from "react-router-dom";
import {LOGIN, REGISTER} from "../../../../../constants/routes";
import {Button} from '@mui/material';

const AnonymousMenu = () => {
    return <>
        <Button color="inherit" component={NavLink} to={REGISTER}>Sign up</Button>
        <Button color="inherit" component={NavLink} to={LOGIN}>Sign In</Button>
    </>;
};

export default AnonymousMenu;
