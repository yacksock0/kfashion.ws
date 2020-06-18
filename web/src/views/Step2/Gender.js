import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import React from "react";

class Gender extends React.Component{
    render() {
        return (
        <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" name="gender">
                <FormControlLabel value="male" control={<Radio/>} label="남성"/>
                <FormControlLabel value="female" control={<Radio/>} label="여성"/>
                <FormControlLabel value="unisex" control={<Radio/>} label="공용"/>
            </RadioGroup>
        </FormControl>
        );
    }
};
export default Gender;