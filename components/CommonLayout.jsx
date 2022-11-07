import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AlertMessage from "./AlertMessage";
import { makeStyles } from "@mui/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { amber, grey } from "@mui/material/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "calc(100vh - 64px)",
  },
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

const CommonLayout = (props) => {
  const classes = useStyles();
  const { push } = useRouter();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          ...(mode === "light"
            ? {
                // palette values for light mode
                // primary: amber,
                // divider: amber[200],
                // text: {
                //   primary: grey[900],
                //   secondary: grey[800],
                // },
              }
            : {
                // palette values for dark mode
                primary: grey,
                divider: grey[500],
                background: {
                  default: grey[900],
                  paper: grey[900],
                },
                text: {
                  primary: "#fff",
                  secondary: grey[500],
                },
              }),
        },
      }),
    [mode]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            setMobileOpen(!mobileOpen);
            push("/");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="All Users" />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={() => {
            setMobileOpen(!mobileOpen);
            push({
              pathname: "/user/add",
              // query: { userId: null },
            });
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Add User" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <div className="flex justify-between items-center w-full">
              <Typography variant="h6" noWrap component="div">
                User Handler
              </Typography>
              <div className="flex items-center">
                {theme.palette.mode}
                <IconButton
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <AlertMessage />
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

CommonLayout.propTypes = {
  window: PropTypes.func,
};

export default CommonLayout;
