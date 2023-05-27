import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Grid } from "@mui/material";
import FileInput from "../../UI/Form/FileInput/FileInput";
import FormElement from "../../UI/Form/FormElement/FormElement";
import { useEffect } from "react";

const PhotoForm = ({ createPhotoHandler }) => {
    const User = useSelector(({ usersState }) => usersState.user);

    const [state, setState] = useState({
        user: User._id,
        title: "",
        image: ""
    });

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        const isFormValid = state.title.trim() !== '' && state.image !== "";
        setFormValid(isFormValid);
    }, [state.title, state.image]);

    const submitFormHandler = e => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(state).forEach(key => {
            formData.append(key, state[key]);
        });

        createPhotoHandler(formData);
    };

    const inputChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => {
            return { ...prevState, [name]: value };
        });
    };

    const onFileChangeHandler = e => {
        const file = e.currentTarget.files[0];
        const name = e.currentTarget.name;

        setState(prevState => {
            return { ...prevState, [name]: file };
        });
    };

    return (
        <form
            autoComplete="off"
            onSubmit={submitFormHandler}
        >
            <Grid container direction="column" spacing={2}>
                <FormElement
                    id="title"
                    label="Title"
                    value={state.title}
                    onChange={inputChangeHandler}
                    name="title"
                />
                <FileInput
                    onChange={onFileChangeHandler}
                    name="image"
                    label="Image"
                />
                <Grid item xs>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={!formValid}
                    >
                        Create photo
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default PhotoForm;
