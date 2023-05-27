import { Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchSomeUserPhotos } from "../../store/actions/photosActions";
import { useEffect } from "react";
import PhotoList from "../../components/Photo/PhotoList/PhotoList";
import { useParams, NavLink } from "react-router-dom";
import { PHOTO_ADD } from "../../constants/routes";

const UsersGallery = () => {
    const dispatch = useDispatch();
    const photos = useSelector(({ photosState }) => photosState.photos);
    const User = useSelector(({ usersState }) => usersState.user);
    const { id } = useParams();

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
                    {
                        User?._id === id
                            ? <Button
                                color="primary"
                                sx={{ bgcolor: 'lightgrey' }}
                                component={NavLink} to={PHOTO_ADD}
                                style={{ fontSize: "20px", margin: "15px" }}>
                                Add new photo
                            </Button>
                            : null
                    }
                </Grid>
            </Grid>
            {
                photos.length !== 0
                ? <PhotoList photos={photos} />
                : <Typography variant="h6">Вы еще не загрузили ни одной фотографии</Typography>
            }
        </Grid>
    );
};

export default UsersGallery;