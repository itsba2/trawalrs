import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useAuth } from "../providers/AuthProvider";

export const Register = ({ show, toggle }) => {
  const { register } = useAuth();

  // Register Form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submit
  const handleFormSubmit = async (data) => {
    const response = await register(data.username, data.password);
    if (response.status === 201)
      toggle((prev) => ({ ...prev, register: false }));
  };

  return (
    <Dialog
      open={show}
      onClose={() => toggle((prev) => ({ ...prev, register: false }))}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Create a Trawalrs account</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2, my: 2 }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Username"
                size="small"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                required
                label="Password"
                size="small"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
          <Button variant="contained" type="submit" sx={{ mx: "auto" }}>
            Register
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() =>
            toggle((prev) => ({ ...prev, login: true, register: false }))
          }
        >
          Already have an account?
        </Button>
      </DialogActions>
    </Dialog>
  );
};
