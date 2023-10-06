import {
  Box,
  Button,
  Rating,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const Walr = ({ selectedWalr, setSelectedWalr, setWalrs }) => {
  return (
    <Dialog
      onClose={() => setSelectedWalr(null)}
      open={!!selectedWalr}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <Box component="div" width="100%">
          <Typography variant="h6">{selectedWalr.title}</Typography>
          <Rating readOnly value={selectedWalr.rating} />
          <Typography variant="body2" mb={2}>
            {selectedWalr.desc}
          </Typography>
          {selectedWalr.photo && (
            <img
              src={`${import.meta.env.VITE_API_URL}/${selectedWalr.photo}`}
              alt={selectedWalr.title}
              width={"100%"}
            />
          )}
          <Typography variant="caption" display="block">
            Last updated {dayjs(selectedWalr.updatedAt).fromNow()}
          </Typography>
          <Typography variant="caption" display="block">
            Created {dayjs(selectedWalr.createdAt).fromNow()}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={async () => {
            const response = await axios.delete(`/walrs/${selectedWalr._id}`, {
              withCredentials: true,
            });
            setSelectedWalr(null);
            setWalrs((prev) =>
              prev.filter((walr) => walr._id !== selectedWalr._id)
            );
          }}
          variant="text"
          color="error"
        >
          Delete
        </Button>
        <Button onClick={() => setSelectedWalr(null)} variant="text">
          Edit
        </Button>
        <Button onClick={() => setSelectedWalr(null)} variant="text">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
