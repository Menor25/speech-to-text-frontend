import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Button, useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // ✅ Detect mobile screens

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", link: "/" },
    { text: "Transcription", link: "/transcription" }
  ];

  return (
    <Box>
      {/* ✅ Only ONE Navigation Bar Appears */}
      <AppBar position="static">
        <Toolbar>
          {isMobile && ( // ✅ Show hamburger menu ONLY on mobile
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Speech-to-Text App
          </Typography>
          {!isMobile && ( // ✅ Show normal menu on desktop ONLY
            <Box sx={{ display: "flex", gap: 2 }}>
              {menuItems.map((item, index) => (
                <Button key={index} color="inherit" href={item.link}>
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* ✅ Sidebar Drawer for Mobile */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={handleDrawerToggle}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navigation;
