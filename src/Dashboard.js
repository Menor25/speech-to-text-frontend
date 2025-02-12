import React, { useState, useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:5000";

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [search, setSearch] = useState("");

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
      fetchReviews(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  // 🔹 Filter reviews based on search query
  const filteredReviews = reviews.filter((review) =>
    (review.transcript || "").toLowerCase().includes(search) ||
    (review.feedback || "").toLowerCase().includes(search) ||
    String(review.rating || "").includes(search)
  );

  return (
    <div>
      <h2>Dashboard - User Reviews</h2>
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
    </div>
  );
};

export default Dashboard;
