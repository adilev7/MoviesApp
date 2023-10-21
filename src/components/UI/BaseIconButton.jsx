import { IconButton } from "@mui/material";
import React from "react";

const BaseIconButton = ({ children, ...rest }) => {
  return (
    <IconButton className="hover-grow" sx={{ color: "#fff", height: "fit-content" }} {...rest}>
      {children}
    </IconButton>
  );
};

export default BaseIconButton;
