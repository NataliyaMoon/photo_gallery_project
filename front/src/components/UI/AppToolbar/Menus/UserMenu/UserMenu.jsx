import { useState } from "react";
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import { useDispatch } from "react-redux";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { logoutUser } from "../../../../../store/actions/usersActions";
import { ALBUM_ADD, MAIN, TRACK_ADD, TRACK_HISTORY } from "../../../../../constants/routes";
import { ARTIST_ADD } from "../../../../../constants/routes";

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
        {
            user && <Grid item>
                <Button color="inherit" component={Link} to={ARTIST_ADD}>
                    Add artist
                </Button>
            </Grid>
        }
        {
            user && <Grid item>
                <Button color="inherit" component={Link} to={ALBUM_ADD}>
                    Add album
                </Button>
            </Grid>
        }
        {
            user && <Grid item>
                <Button color="inherit" component={Link} to={TRACK_ADD}>
                    Add track
                </Button>
            </Grid>
        }
        <Button color="inherit" component={NavLink} to={TRACK_HISTORY}>My track history</Button>
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
            <MenuItem>Profile</MenuItem>
            <MenuItem>My account</MenuItem>
            <MenuItem
                onClick={() => dispatch(logoutUser({ callback: () => navigate(MAIN) }))}
            >
                Logout
            </MenuItem>
        </Menu>
    </>;
};

export default UserMenu;
