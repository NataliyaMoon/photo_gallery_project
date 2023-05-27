import { Grid, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhotos} from "../../store/actions/photosActions";
import {useEffect} from "react";
import PhotoList from "../../components/Photo/PhotoList/PhotoList";

const Photos = () => {
    const dispatch = useDispatch();
    const photos = useSelector(({photosState}) => photosState.photos);

    useEffect(() => {
        dispatch(fetchPhotos());
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
                        Photos
                    </Typography>
                </Grid>
            </Grid>
            <PhotoList photos={photos} />
        </Grid>
    );
};

export default Photos;
