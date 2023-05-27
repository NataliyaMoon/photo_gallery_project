import axios from "../../api/axiosApi";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchPhotos = createAsyncThunk(
    'photos/fetch',
    async () => await axios.get('/photos').then(res => res.data)
);

export const createPhoto = createAsyncThunk(
    'photos/create',
    async ({data, callback}) => await axios
        .post('/photos', data)
        .then(res => callback())
);

export const deletePhoto = createAsyncThunk(
    'photos/delete',
    async (id) => await axios.delete('/photos/' + id).then(res => res.data)
);