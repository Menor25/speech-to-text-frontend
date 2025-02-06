import React, { useState, useRef } from "react";
import axios from "axios";
import { Container, Button, Typography, Paper, IconButton } from "@mui/material";
import { CloudUpload, Mic, Stop } from "@mui/icons-material";

const App = () => {
  const [audio, setAudio] = useState(null);
  const [audioName, setAudioName] = useState(""); // Track file name
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

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
      const response = await axios.post("https://speech-to-text-server-jos6.onrender.com/transcribe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTranscript(response.data.transcript);
    } catch (error) {
      console.error("Error transcribing:", error);
      setTranscript("Failed to transcribe.");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Speech-to-Text Model
      </Typography>
      <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={3}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="contained" component="span" startIcon={<CloudUpload />}>
            Upload Audio
          </Button>
        </label>

        {audioName && (
          <Typography variant="body2" style={{ marginTop: "10px", fontStyle: "italic" }}>
            {audioName}
          </Typography>
        )}

        <div style={{ margin: "20px 0" }}>
          <IconButton onClick={startRecording} disabled={recording} color="primary">
            <Mic />
          </IconButton>
          {/* <IconButton onClick={stopRecording} disabled={!recording} color="secondary">
            <Stop />
          </IconButton> */}
          <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
        </div>

        <Button variant="contained" color="success" onClick={handleTranscribe}>
          Transcribe
        </Button>

        {transcript && (
          <Paper style={{ marginTop: "20px", padding: "15px", background: "#f5f5f5" }}>
            <Typography variant="h6">Transcription:</Typography>
            <Typography variant="body1">{transcript}</Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default App;