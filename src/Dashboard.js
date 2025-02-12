import React, { useState, useEffect } from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Button, IconButton, AppBar, Toolbar, Typography, Box, Drawer,
  List, ListItem, ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";

const BACKEND_URL = "https://speech-to-text-server-jos6.onrender.com";

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // ✅ Detect screen size
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/get-reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${BACKEND_URL}/delete-review/${index}`);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const filteredReviews = reviews.filter((review) =>
    (review.transcript || "").toLowerCase().includes(search) ||
    (review.feedback || "").toLowerCase().includes(search) ||
    String(review.rating || "").includes(search)
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", link: "/" },
    { text: "Transcription", link: "/transcription" }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* ✅ Only one navigation bar will appear at a time */}
      {isMobile ? (
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

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

      {/* ✅ Main Content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          User Reviews
        </Typography>

        <TextField
          label="Search Reviews"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />

        <TableContainer component={Paper} sx={{ boxShadow: 3, border: "1px solid #ddd", borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Transcript</strong></TableCell>
                <TableCell><strong>Feedback</strong></TableCell>
                <TableCell><strong>Rating</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review, index) => (
                  <TableRow key={index} sx={{ borderBottom: "1px solid #ddd" }}>
                    <TableCell>{review.transcript || "N/A"}</TableCell>
                    <TableCell>{review.feedback || "N/A"}</TableCell>
                    <TableCell>{review.rating !== undefined ? review.rating : "N/A"}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: "center", fontStyle: "italic" }}>
                    No reviews found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" sx={{ mt: 2 }} onClick={fetchReviews}>
          Refresh Reviews
        </Button>
      </Box>
    </Box>
  );
};

export default Dashboard;
