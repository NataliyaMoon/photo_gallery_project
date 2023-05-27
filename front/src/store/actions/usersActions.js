import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../api/axiosApi";
import { setLoginError, setRegisterError, setUser, setLogoutError } from "../services/usersSlice";

export const registerUser = createAsyncThunk(
    'users/register',
    async ({ data, callback }, { dispatch }) => await axiosApi
        .post('/users', data)
        .then(res => callback())
        .catch(e => {
            if (e?.response?.data) dispatch(setRegisterError(e.response.data));
            else dispatch(setRegisterError(e));
            throw e;
        })
);

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ data, callback }, { dispatch, getState }) => await axiosApi
        .post('/users/login', data)
        .then(res => {
            dispatch(setUser(res.data));
            callback();

        })
        .catch(e => {
            if (e?.response?.data) dispatch(setLoginError(e.response.data));
            else dispatch(setLoginError(e));
            throw e;
        })
);

export const logoutUser = createAsyncThunk(
    'users/logout',
    async (payload, {dispatch, getState}) => await axiosApi
        .delete(
            '/users/logout',
            {headers: {Authorization: getState().usersState.user.token}}
        )
        .then(res => {
            dispatch(setUser(null));
            payload.callback();
        })
        .catch(e => {
            if (e?.response?.data) dispatch(setLogoutError(e.response.data));
            else dispatch(setLogoutError(e));
            throw e;
        })
);
