import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const InputFileUpload = ({ field, setValue }) => {
  const { value, ...rest } = field;
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      tabIndex={-1}
    >
      Upload photo
      <VisuallyHiddenInput
        {...rest}
        type="file"
        capture="environment"
        accept="image/*"
        onChange={(event) => {
          const files = Object.values(event.target.files);
          setValue("photo", files);
        }}
      />
    </Button>
  );
};
