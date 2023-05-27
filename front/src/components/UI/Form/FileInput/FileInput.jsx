import {useState, useRef} from 'react';
import {Button, Grid, TextField} from '@mui/material';

const FileInput = ({onChange, name, label}) => {
    const [filename, setFilename] = useState('');
    const inputRef = useRef();

    const activateInput = () => {
        inputRef.current.click();
    };

    const onChangeFile = (e) => {
        const file = e.currentTarget.files[0];

        setFilename(file ? file.name : '');
        onChange(e);
    };

    return (
        <>
            <input
                type="file"
                name={name}
                ref={inputRef}
                onChange={onChangeFile}
                accept="image/*"
                style={{display: 'none'}}
            />
            <Grid
                container
                direction="row"
                spacing={2}
                alignItems="center"
            >
                <Grid item xs>
                    <TextField
                        label={label}
                        disabled
                        variant="standard"
                        fullWidth
                        value={filename}
                        onClick={activateInput}
                    />
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={activateInput}
                    >
                        Browse file
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;
