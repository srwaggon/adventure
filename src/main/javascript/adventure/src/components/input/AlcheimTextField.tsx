import {TextField, TextFieldProps} from "@mui/material";
import React from "react";

type AlcheimTextFieldParams = JSX.IntrinsicAttributes & TextFieldProps & { readOnly?: boolean };

const AlcheimTextField = (props: AlcheimTextFieldParams) => {
    const {readOnly} = props;
  return <TextField
    variant={"outlined"}
    fullWidth
    size={"small"}
    margin={"dense"}
    inputProps={{readOnly}}
    {...props}
  />
}

export default AlcheimTextField;
