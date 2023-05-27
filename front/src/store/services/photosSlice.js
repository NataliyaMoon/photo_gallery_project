import { createSlice } from "@reduxjs/toolkit";
import { fetchPhotos, deletePhoto } from "../actions/photosActions";

const initialState = {
    photos: []
};

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    extraReducers: builder => {
        builder
            .addCase(
                fetchPhotos.fulfilled,
                (state, { payload }) => {
                    state.photos = payload || [];
                }
            );
        builder
            .addCase(
                deletePhoto.pending,
                (state, action) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(
                deletePhoto.fulfilled,
                (state, action) => {
                    state.loading = false;
                    let id = state.photos.findIndex(item => item._id === action.payload)
                    state.photos.splice(id, 1)
                }
            )
            .addCase(
                deletePhoto.rejected,
                (state, action) => {
                    state.error = action.error;
                    state.loading = false;
                }
            );
    }

});

export default photosSlice.reducer;
