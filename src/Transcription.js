import React, { useState, useRef } from "react";
import axios from "axios";
import { 
  Paper, Button, Typography, TextField, IconButton, 
  Rating, Card 
} from "@mui/material";
import { CloudUpload, Mic } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = "https://speech-to-text-server-jos6.onrender.com";

const Transcription = () => {
  const [audio, setAudio] = useState(null);
  const [transcript, setTranscript] = useState("");  // ✅ Editable
  const [recording, setRecording] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [audioName, setAudioName] = useState("");

  const navigate = useNavigate();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudio(file);
      setAudioName(file.name);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setRecording(true);
      setAudioName("Recording in progress...");

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });
        setAudio(file);
        setAudioName("Recorded audio (ready to transcribe)");
      };

      mediaRecorder.start();
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    } else {
      console.error("No active mediaRecorder instance.");
    }
  };

  const handleTranscribe = async () => {
    if (!audio) {
      alert("Please upload or record an audio file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audio);

    try {
      const response = await axios.post(`${BACKEND_URL}/transcribe`, formData);
      setTranscript(response.data.transcript);  // ✅ Set transcribed text
    } catch (error) {
      console.error("Error transcribing:", error);
      setTranscript("Failed to transcribe.");
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/submit-review`, {
        rating: rating || "",
        feedback: feedback || "",
        transcript: transcript || ""
      });

      console.log("Feedback submitted:", response.data);
      navigate("/");  // ✅ Redirect to Dashboard
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <Typography variant="h4">Speech-to-Text Model</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        {/* File Upload Button */}
        <input type="file" accept="audio/*" onChange={handleFileUpload} style={{ display: "none" }} id="file-upload" />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span" startIcon={<CloudUpload />}>
            Upload Audio
          </Button>
        </label>

        {audioName && (
          <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
            {audioName}
          </Typography>
        )}

        {/* Recording Controls */}
        <div style={{ margin: "20px 0" }}>
          <IconButton onClick={startRecording} disabled={recording} color="primary">
            <Mic />
          </IconButton>
          <Button variant="contained" onClick={stopRecording} disabled={!recording} sx={{ ml: 2 }}>
            Stop Recording
          </Button>
        </div>

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleTranscribe}>
          Transcribe
        </Button>

        {/* Transcription Output in Card */}
        {transcript && (
          <Card sx={{ p: 3, mt: 2, boxShadow: 3 }}>  {/* ✅ Card with shadow */}
            <Typography variant="h6">Transcription:</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}  // ✅ Editable text
            />

            <Typography variant="h6" sx={{ mt: 2 }}>Rate the transcription:</Typography>
            <Rating
              name="star-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              sx={{ mt: 2 }}
              variant="outlined"
              label="Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmitFeedback}>
              Submit Feedback
            </Button>
          </Card>
        )}
      </Paper>
    </div>
  );
};

export default Transcription;
