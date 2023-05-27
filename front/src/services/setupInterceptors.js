import axiosApi from "../api/axiosApi";

const setup = ({getState}) => {
    axiosApi.interceptors.request.use(
        config => {
            const user = getState().usersState.user;

            if (user) {
                config.headers.Authorization = user.token;
            }

            return config;
        },
        error => Promise.reject(error)
    );
};

export default setup;
