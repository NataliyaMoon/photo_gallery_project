import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../UI/AppToolbar/AppToolbar";
import {Outlet} from "react-router-dom";

const Layout = () => (
    <>
        <CssBaseline/>
        <header>
            <AppToolbar/>
        </header>
        <main>
            <Container maxWidth="xl">
                <Outlet />
            </Container>
        </main>
    </>
);

export default Layout;
