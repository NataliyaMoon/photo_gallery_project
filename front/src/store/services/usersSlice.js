import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../actions/usersActions";

const initialState = {
    loginError: null,
    logoutError: null,
    registerError: null,
    loading: false,
    user: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setLoginError: (state, action) => {
            state.loginError = action.payload;
        },
        setRegisterError: (state, action) => {
            state.registerError = action.payload;
        },
        setLogoutError: (state, action) => {
            state.logoutError = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(
                registerUser.pending,
                state => {
                    state.registerError = null;
                    state.loading = true;
                    state.user = null;
                }
            )
            .addCase(
                registerUser.rejected,
                state => {
                    state.loading = false;
                }
            )
            .addCase(
                registerUser.fulfilled,
                state => {
                    state.loading = false;
                }
            );

        builder
            .addCase(
                loginUser.pending,
                state => {
                    state.loginError = null;
                    state.loading = true;
                    state.user = null;
                }
            )
            .addCase(
                loginUser.rejected,
                state => {
                    state.loading = false;
                }
            )
            .addCase(
                loginUser.fulfilled,
                state => {
                    state.loading = false;
                }

            );
        builder
            .addCase(
                logoutUser.pending,
                state => {
                    state.logoutError = null;
                    state.loading = true;
                }
            )
            .addCase(
                logoutUser.rejected,
                state => {
                    state.loading = false;
                }
            )
            .addCase(
                logoutUser.fulfilled,
                state => {
                    state.loading = false;
                }
            );
    }
});

export const { setLoginError, setRegisterError, setUser, setLogoutError } = usersSlice.actions;
export default usersSlice.reducer;