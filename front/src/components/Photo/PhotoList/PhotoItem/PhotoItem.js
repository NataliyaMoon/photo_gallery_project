import { Card, CardActions, CardContent, CardHeader, Grid, CardMedia, IconButton, } from "@mui/material";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { uploadUrl } from "../../../../constants/config";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { deletePhoto, fetchPhotos } from "../../../../store/actions/photosActions";
import { useState } from "react";
import Popup from "../../../Popup/Popup";

const PhotoItem = ({ id, title, image, user }) => {
    const logginUser = useSelector(({ usersState }) => usersState.user);
    const dispatch = useDispatch();
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const imagePath = uploadUrl + '/' + image;

    const onRemove = async () => {
        await dispatch(deletePhoto(id));
        fetchPhotos();
    };

    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card  style={{ margin: '10px' }}>
                <CardHeader title={title} />
                <CardContent>
                    <CardMedia onClick={openPopup}
                        image={imagePath}
                        title={title}
                        sx={{ maxWidth: 400, height: 400 }}
                    />
                    <strong style={{ fontSize: "20px" }}>
                        By:
                    </strong>
                    <IconButton component={Link} to={`/users/${user._id}`}>
                        {user.username}
                    </IconButton>
                </CardContent>
                <CardActions>
                    {
                        logginUser?._id === user._id
                            ?
                            <Button onClick={onRemove}>Remove</Button>
                            : null
                    }
                </CardActions>
                {isPopupOpen && (
                    <Popup
                        image={imagePath}
                        onClose={closePopup}
                    />
                )}

            </Card>
        </Grid>
    );
};

PhotoItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
};

export default PhotoItem;
