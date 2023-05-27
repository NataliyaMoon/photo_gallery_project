import { useState } from "react";
import { Button, Menu, MenuItem } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { logoutUser } from "../../../../../store/actions/usersActions";
import { MAIN, PHOTO_ADD } from "../../../../../constants/routes";

const UserMenu = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return <>
        <Button color="inherit" component={NavLink} to={MAIN}>Home</Button>
        <Button color="inherit" component={NavLink} to={PHOTO_ADD}>Add new photo</Button>
        <Button
            aria-controls="simple-menu"
            aria-haspopup={true}
            onClick={handleClick}
            color="inherit"
        >
            Hello, {user.username}
        </Button>
        <Menu
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            keepMounted
        >
            <MenuItem
                onClick={() => dispatch(logoutUser({ callback: () => navigate(MAIN) }))}
            >
                Logout
            </MenuItem>
        </Menu>
    </>;
};

export default UserMenu;
