import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./services/usersSlice";
import photosReducer from "./services/photosSlice";

const localStorageMiddleware = ({getState}) => next => action => {
    const result = next(action);
    if (getState().usersState.user) {
        localStorage.setItem('user', JSON.stringify(getState().usersState.user));
    } else {
        localStorage.removeItem('user');
    }
    return result;
};

const reHydrateStore = () => {
    const userLocalStorage = localStorage.getItem('user');

    if (userLocalStorage !== null || userLocalStorage !== 'null' || userLocalStorage !== '') {
        return {
            usersState: {
                user: JSON.parse(localStorage.getItem('user'))
            }
        };
    }

    return undefined;
};

const store = configureStore({
    reducer: {
        usersState: usersReducer,
        photosState: photosReducer
    },
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware)
});

export default store;
