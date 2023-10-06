import {
  Typography,
  Avatar,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import {
  Person as AccountIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
  HowToReg as RegisterIcon,
  ListAlt as ListIcon,
  InfoOutlined as ReadmeIcon,
  LightModeOutlined as LightIcon,
  DarkModeOutlined as DarkIcon,
  PersonOutline as ProfileIcon,
} from "@mui/icons-material";
import { Fragment, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useColorMode } from "../providers/ColorModeProvider";

export const Account = ({ toggle }) => {
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const colorMode = useColorMode();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "account-menu" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    // Do not close the menu if username is clicked
    if (event.target.id === "menu-item-username") return;
    setAnchorEl(null);
  };

  const stringToColor = (string, colorMode) => {
    // Generate a hash code from the input string
    let hashCode = 0;
    for (let i = 0; i < string.length; i++) {
      hashCode = (hashCode << 5) - hashCode + string.charCodeAt(i);
    }

    // Convert the hash code to a positive number
    hashCode = Math.abs(hashCode);

    // Calculate the base color based on the colorMode
    let baseColor;
    if (colorMode === "dark") {
      baseColor = 0xffffff; // White for dark theme
    } else {
      baseColor = 0x000000; // Black for light theme
    }

    // Mix the base color with the hash code to create a unique color
    const mixedColor = baseColor ^ hashCode;

    // Convert the color to a HEX string and pad it to 6 characters
    const colorCode = "#" + mixedColor.toString(16).padStart(6, "0");

    return colorCode;
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account">
          <IconButton onClick={handleClick}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                bgcolor: user
                  ? stringToColor(user?.username, theme.palette.mode)
                  : theme.palette.primary.main,
              }}
              children={
                user ? (
                  <Typography variant="h5" textTransform="uppercase">
                    {user?.username[0]}
                  </Typography>
                ) : (
                  <AccountIcon fontSize="medium" />
                )
              }
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {/* User Profile */}
        <MenuItem
          id="menu-item-username"
          disableRipple
          disableTouchRipple
          divider={true}
          sx={{
            display: !user && "none",
            cursor: "default",
            ":hover, :focus": { backgroundColor: "transparent" },
          }}
          onClick={() => {}}
        >
          <Typography variant="body2">{user?.username}</Typography>
        </MenuItem>
        {/* TODO: Profile component */}
        <MenuItem sx={{ display: !user && "none" }}>
          <ListItemIcon>
            <ProfileIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        {/* Color Mode Toggler */}
        <MenuItem onClick={colorMode.toggleColorMode}>
          <ListItemIcon>
            {!isDark ? (
              <DarkIcon fontSize="small" />
            ) : (
              <LightIcon fontSize="small" />
            )}
          </ListItemIcon>
          {!isDark ? "Dark" : "Light"} Mode
        </MenuItem>
        {/* TODO: AboutTrawalrs component */}
        <MenuItem divider={true}>
          <ListItemIcon>
            <ReadmeIcon fontSize="small" />
          </ListItemIcon>
          About Trawalrs
        </MenuItem>
        {/* Walr List */}
        <MenuItem
          sx={{ display: !user && "none" }}
          onClick={() => toggle((prev) => ({ ...prev, walrList: true }))}
        >
          <ListItemIcon>
            <ListIcon fontSize="small" />
          </ListItemIcon>
          Walr List
        </MenuItem>
        {/* Logout */}
        <MenuItem
          sx={{ display: !user && "none" }}
          onClick={async () => await logout()}
        >
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        {/* Login */}
        <MenuItem
          sx={{ display: user && "none" }}
          onClick={() => toggle((prev) => ({ ...prev, login: true }))}
        >
          <ListItemIcon>
            <LoginIcon fontSize="small" />
          </ListItemIcon>
          Login
        </MenuItem>
        {/* Register */}
        <MenuItem
          sx={{ display: user && "none" }}
          onClick={() => toggle((prev) => ({ ...prev, register: true }))}
        >
          <ListItemIcon>
            <RegisterIcon fontSize="small" />
          </ListItemIcon>
          Register
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
