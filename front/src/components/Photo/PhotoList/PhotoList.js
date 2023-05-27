import PhotoItem from "./PhotoItem/PhotoItem";
import { Grid } from "@mui/material";
import { useState } from "react";

const PhotoList = ({ photos }) => {
    return <Grid
        container
        item
        direction="row"
        justifyContent="space-between"
        alignItems="center"
    >
        {
            photos.map(photo => (
                <PhotoItem
                    key={photo._id}
                    id={photo._id}
                    title={photo.title}
                    image={photo.image}
                    user={photo.user}
                />
            ))
        }
    </Grid>;
};

export default PhotoList;
