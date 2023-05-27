import { Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import { fetchSomeUserPhotos} from "../../store/actions/photosActions";
import {useEffect} from "react";
import PhotoList from "../../components/Photo/PhotoList/PhotoList";
import { useParams } from "react-router-dom";

const UsersGallery = () => {
    const dispatch = useDispatch();
    const photos = useSelector(({photosState}) => photosState.photos);
    const {id} = useParams();

    useEffect(() => {
        dispatch(fetchSomeUserPhotos(id));
    }, []);

    return (
        <Grid container direction="column" spacing={2}>
            <Grid
                container
                item
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h4">
                        Photo Gallery
                    </Typography>
                </Grid>
            </Grid>
            <PhotoList photos={photos} />
        </Grid>
    );
};

export default UsersGallery;