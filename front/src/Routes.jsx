import { Navigate, Outlet, Route, Routes as RoutesSwitch } from "react-router-dom";
import { LOGIN, REGISTER, MAIN, PHOTO_ADD, USERS_GALLERY } from "./constants/routes";
import Layout from "./components/Layout/Layout";
import Register from "./containers/Auth/Register/Register";
import Login from "./containers/Auth/Login/Login";
import AddPhoto from './containers/AddPhoto/AddPhoto';
import Photos from './containers/Photos/Photos';
import UsersGallery from "./components/UsersGallery/UsersGallery";

const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }

    return children || <Outlet />;
};

const Routes = ({ user }) => {
    const addPhoto = <ProtectedRoute
        isAllowed={!!user}
        redirectPath={!!user ? MAIN : LOGIN}
    >
        <AddPhoto />
    </ProtectedRoute>;

    return <RoutesSwitch>
        <Route element={<Layout />}>
            <Route index element={<Photos />} />
            <Route path={REGISTER} element={<Register />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={MAIN} element={<Photos />} />
            <Route path={USERS_GALLERY} element={<UsersGallery />} />
            <Route path={PHOTO_ADD} element={addPhoto} />
        </Route>
    </RoutesSwitch>
};

export default Routes;
