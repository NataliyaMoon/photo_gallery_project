import PhotoForm from "../../components/Photo/PhotoForm/PhotoForm";
import {Typography} from "@mui/material";
import {createPhoto} from "../../store/actions/photosActions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const AddPhoto = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onPhotoFormSubmit = async data => {
        await dispatch(createPhoto({data, callback: () => navigate('/')}));
    };

    return (
        <>
            <Typography variant='h4'>
                Add new photo
            </Typography>
            <PhotoForm
                createPhotoHandler={onPhotoFormSubmit}
            />
        </>
    );
};

export default AddPhoto;
