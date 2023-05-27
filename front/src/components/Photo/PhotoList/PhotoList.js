import PhotoItem from "./PhotoItem/PhotoItem";
import { Grid } from "@mui/material";
import { useState } from "react";

const PhotoList = ({ photos }) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const goToPhoto = (id) => {
        setPopupOpen(true);
    };

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
                    onClick={() => { goToPhoto(photo._id) }}
                />
            ))
        }
    </Grid>;
};

export default PhotoList;
