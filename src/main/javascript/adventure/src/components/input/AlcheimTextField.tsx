import {TextField, TextFieldProps} from "@mui/material";
import React from "react";

type AlcheimTextFieldParams = JSX.IntrinsicAttributes & TextFieldProps & { isEditing?: boolean };

const AlcheimTextField = (props: AlcheimTextFieldParams) => {
    const {isEditing = true} = props;
  return <TextField
    variant={"outlined"}
    fullWidth
    margin={"dense"}
    inputProps={{readOnly: !isEditing}}
    {...props}
  />
}

export default AlcheimTextField;
