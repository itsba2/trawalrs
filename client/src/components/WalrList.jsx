import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const WalrList = ({
  show,
  toggle,
  walrs,
  setSelectedWalr,
  setViewport,
}) => {
  return (
    <Dialog
      onClose={() => toggle((prev) => ({ ...prev, walrList: false }))}
      open={show}
      fullWidth
      maxWidth="sm"
    >
      <DialogContent>
        <List>
          {walrs?.map((walr) => (
            <ListItem
              key={`walr-list-item-${walr._id}`}
              onClick={() => {
                toggle((prev) => ({ ...prev, walrList: false }));
                setViewport((prev) => ({
                  ...prev,
                  latitude: walr.lat,
                  longitude: walr.lng,
                }));
                setSelectedWalr(walr);
              }}
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                transition: "ease-in",
                transitionDuration: "200ms",
                bgcolor: "#f0f0f0",
                my: 1,
              }}
            >
              <ListItemText
                primary={walr.title}
                secondary={walr.desc || "No description for this Walr."}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => toggle((prev) => ({ ...prev, walrList: false }))}
          variant="text"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
