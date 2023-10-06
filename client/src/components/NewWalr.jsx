import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Rating,
  Dialog,
  DialogContent,
} from "@mui/material";

import { InputFileUpload } from "./InputFileUpload";

export const NewWalr = ({
  show,
  toggle,
  selectedLocation,
  setSelectedLocation,
  setWalrs,
}) => {
  // Form
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedLocation?.text || "",
      desc: "",
      rating: 5,
      photo: null,
      lat:
        selectedLocation.latitude || selectedLocation.geometry.coordinates[1],
      lng:
        selectedLocation.longitude || selectedLocation.geometry.coordinates[0],
    },
  });

  // Handle form submit
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post("/walrs", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setWalrs((prev) => [...prev, response.data.savedWalr]);
      setSelectedLocation(null);
      toggle((prev) => ({ ...prev, newWalr: false }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={show}
      onClose={() => toggle((prev) => ({ ...prev, newWalr: false }))}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Title"
                size="small"
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ""}
              />
            )}
          />
          <Controller
            name="desc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                minRows={3}
                maxRows={5}
                label="Description"
                size="small"
                error={!!errors.desc}
                helperText={errors.desc ? errors.desc.message : ""}
              />
            )}
          />
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <Rating
                {...field}
                precision={0.5}
                onChange={(event, value) => {
                  setValue("rating", value);
                }}
              />
            )}
          />
          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <InputFileUpload field={field} setValue={setValue} />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              alignSelf: "center",
              width: "fit-content",
              mt: 1,
            }}
          >
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
