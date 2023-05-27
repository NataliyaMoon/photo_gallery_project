import { Card, CardActions, CardContent, CardHeader, Grid, IconButton, CardMedia } from "@mui/material";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { uploadUrl } from "../../../../constants/config";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { deletePhoto } from "../../../../store/actions/photosActions";

const PhotoItem = ({ id, title, image , user}) => {
    const logginUser = useSelector(({ usersState }) => usersState.user);
    const dispatch = useDispatch();

    const imagePath = uploadUrl + '/' + image;

    const onRemove = async () => {
        await dispatch(deletePhoto(id));
    };

    return (
        <Grid item xs={12} sm={12} md={6} lg={4}>
            <Card>
                <CardHeader title={title} />
                <CardContent>
                    <CardMedia
                        image={imagePath}
                        title={title}
                        sx={{ maxWidth: 400, height: 400 }}
                    />
                </CardContent>
                <CardActions>
                    {/* {
                        logginUser._id === user
                            ?
                            <Button variant="danger" onClick={onRemove}>Remove</Button>
                            : null
                    } */}
                </CardActions>
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
