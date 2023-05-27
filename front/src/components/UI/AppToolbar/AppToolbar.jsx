import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useSelector } from "react-redux";
import UserMenu from './Menus/UserMenu/UserMenu';
import AnonymousMenu from './Menus/AnonymousMenu/AnonymousMenu';

const AppToolbar = () => {
    const user = useSelector(({ usersState }) => usersState.user);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Photo Gallery
                    </Typography>
                    {
                        user
                            ? <UserMenu user={user} />
                            : <AnonymousMenu />
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default AppToolbar;
