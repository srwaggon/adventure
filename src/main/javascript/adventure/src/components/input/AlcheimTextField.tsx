import {TextField, TextFieldProps} from "@mui/material";
import React from "react";

type AlcheimTextFieldParams = JSX.IntrinsicAttributes & TextFieldProps;

const AlcheimTextField = (props: AlcheimTextFieldParams) => {
  return <TextField
    variant={"outlined"}
    fullWidth
    margin={"dense"}
    {...props}
  />
}

export default AlcheimTextField;
