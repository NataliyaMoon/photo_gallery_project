import {Grid, MenuItem, TextField} from "@mui/material";
import PropTypes from "prop-types";

const FormElement = ({
    name,
    label,
    value,
    onChange,
    required,
    error,
    type,
    select,
    multiline,
    rows,
    options
}) => {
    let inputChildren = null;

    if (select) {
        inputChildren = options.map(option => (
            <MenuItem key={option._id} value={option._id}>
                {option.name}
            </MenuItem>
        ));
    }

    return <Grid item xs={12}>
        <TextField
            fullWidth
            required={required}
            id={name}
            name={name}
            label={label}
            error={!!error}
            helperText={error}
            value={value}
            onChange={onChange}
            autoComplete={name}
            type={type}
            multiline={multiline}
            rows={rows}
            select={select}
        >
            {inputChildren}
        </TextField>
    </Grid>;
};

FormElement.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    error: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    select: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    options: PropTypes.arrayOf(PropTypes.object)
};

export default FormElement;
