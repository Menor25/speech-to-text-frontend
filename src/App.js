// // import React, { useState, useRef } from "react";
// // import axios from "axios";
// // import { Container, Button, Typography, Paper, IconButton } from "@mui/material";
// // import { CloudUpload, Mic } from "@mui/icons-material";

// // const App = () => {
// //   const [audio, setAudio] = useState(null);
// //   const [audioName, setAudioName] = useState(""); // Track file name
// //   const [transcript, setTranscript] = useState("");
// //   const [recording, setRecording] = useState(false);
// //   const mediaRecorderRef = useRef(null);
// //   const audioChunksRef = useRef([]);

// //   const handleFileUpload = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       setAudio(file);
// //       setAudioName(file.name);
// //     }
// //   };

// //   const startRecording = async () => {
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
// //       const mediaRecorder = new MediaRecorder(stream);
// //       mediaRecorderRef.current = mediaRecorder;
// //       audioChunksRef.current = [];
// //       setRecording(true);
// //       setAudioName("Recording in progress...");

// //       mediaRecorder.ondataavailable = (event) => {
// //         audioChunksRef.current.push(event.data);
// //       };

// //       mediaRecorder.onstop = () => {
// //         const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
// //         const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });
// //         setAudio(file);
// //         setAudioName("Recorded audio (ready to transcribe)");
// //       };

// //       mediaRecorder.start();
// //     } catch (error) {
// //       console.error("Error starting recording:", error);
// //     }
// //   };

// //   const stopRecording = () => {
// //     if (mediaRecorderRef.current) {
// //       mediaRecorderRef.current.stop();
// //       setRecording(false);
// //     } else {
// //       console.error("No active mediaRecorder instance.");
// //     }
// //   };

// //   const handleTranscribe = async () => {
// //     if (!audio) {
// //       alert("Please upload or record an audio file first.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("file", audio);

// //     try {
// //       const response = await axios.post("https://speech-to-text-server-jos6.onrender.com/transcribe", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       setTranscript(response.data.transcript);
// //     } catch (error) {
// //       console.error("Error transcribing:", error);
// //       setTranscript("Failed to transcribe.");
// //     }
// //   };

// //   return (
// //     <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
// //       <Typography variant="h4" gutterBottom>
// //         Speech-to-Text Model
// //       </Typography>
// //       <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={3}>
// //         <input
// //           type="file"
// //           accept="audio/*"
// //           onChange={handleFileUpload}
// //           style={{ display: "none" }}
// //           id="file-upload"
// //         />
// //         <label htmlFor="file-upload">
// //           <Button variant="contained" component="span" startIcon={<CloudUpload />}>
// //             Upload Audio
// //           </Button>
// //         </label>

// //         {audioName && (
// //           <Typography variant="body2" style={{ marginTop: "10px", fontStyle: "italic" }}>
// //             {audioName}
// //           </Typography>
// //         )}

// //         <div style={{ margin: "20px 0" }}>
// //           <IconButton onClick={startRecording} disabled={recording} color="primary">
// //             <Mic />
// //           </IconButton>
// //           {/* <IconButton onClick={stopRecording} disabled={!recording} color="secondary">
// //             <Stop />
// //           </IconButton> */}
// //           <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
// //         </div>

// //         <Button variant="contained" color="success" onClick={handleTranscribe}>
// //           Transcribe
// //         </Button>

// //         {transcript && (
// //           <Paper style={{ marginTop: "20px", padding: "15px", background: "#f5f5f5" }}>
// //             <Typography variant="h6">Transcription:</Typography>
// //             <Typography variant="body1">{transcript}</Typography>
// //           </Paper>
// //         )}
// //       </Paper>
// //     </Container>
// //   );
// // };

// // export default App;


// import React, { useState, useRef } from "react";
// import axios from "axios";
// import { Container, Button, Typography, Paper, IconButton, TextField, MenuItem, Rating } from "@mui/material";
// import { CloudUpload, Mic, Star } from "@mui/icons-material";

// const App = () => {
//   const [audio, setAudio] = useState(null);
//   const [audioName, setAudioName] = useState(""); 
//   const [transcript, setTranscript] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [recording, setRecording] = useState(false);
//   const [feedbackScreen, setFeedbackScreen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [feedback, setFeedback] = useState("");
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setAudio(file);
//       setAudioName(file.name);
//     }
//   };

  // const startRecording = async () => {
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //     const mediaRecorder = new MediaRecorder(stream);
  //     mediaRecorderRef.current = mediaRecorder;
  //     audioChunksRef.current = [];
  //     setRecording(true);
  //     setAudioName("Recording in progress...");

  //     mediaRecorder.ondataavailable = (event) => {
  //       audioChunksRef.current.push(event.data);
  //     };

  //     mediaRecorder.onstop = () => {
  //       const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
  //       const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });
  //       setAudio(file);
  //       setAudioName("Recorded audio (ready to transcribe)");
  //     };

  //     mediaRecorder.start();
  //   } catch (error) {
  //     console.error("Error starting recording:", error);
  //   }
  // };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setRecording(false);
//     } else {
//       console.error("No active mediaRecorder instance.");
//     }
//   };

//   const handleTranscribe = async () => {
//     if (!audio) {
//       alert("Please upload or record an audio file first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", audio);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/transcribe", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setTranscript(response.data.transcript);
//       setSuggestions(response.data.suggestions || []);
//     } catch (error) {
//       console.error("Error transcribing:", error);
//       setTranscript("Failed to transcribe.");
//     }
//   };

//   const handleSubmitFeedback = async () => {
//     try {
//       await axios.post("http://127.0.0.1:5000/feedback", {
//         rating,
//         feedback,
//         transcript
//       });
//       alert("Feedback submitted successfully!");
//       setFeedbackScreen(false);
//       setTranscript("");
//       setFeedback("");
//       setRating(0);
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       alert("Failed to submit feedback.");
//     }
//   };

//   return (
//     <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
//       {!feedbackScreen ? (
//         <>
//           <Typography variant="h4" gutterBottom>
//             Speech-to-Text Model
//           </Typography>
//           <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={3}>
//             <input
//               type="file"
//               accept="audio/*"
//               onChange={handleFileUpload}
//               style={{ display: "none" }}
//               id="file-upload"
//             />
//             <label htmlFor="file-upload">
//               <Button variant="contained" component="span" startIcon={<CloudUpload />}>
//                 Upload Audio
//               </Button>
//             </label>

//             {audioName && (
//               <Typography variant="body2" style={{ marginTop: "10px", fontStyle: "italic" }}>
//                 {audioName}
//               </Typography>
//             )}

//             <div style={{ margin: "20px 0" }}>
//               <IconButton onClick={startRecording} disabled={recording} color="primary">
//                 <Mic />
//               </IconButton>
//               <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
//             </div>

//             <Button variant="contained" color="success" onClick={handleTranscribe}>
//               Transcribe
//             </Button>

//             {transcript && (
//               <Paper style={{ marginTop: "20px", padding: "15px", background: "#f5f5f5" }}>
//                 <Typography variant="h6">Transcription:</Typography>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={4}
//                   value={transcript}
//                   onChange={(e) => setTranscript(e.target.value)}
//                 />

//                 <Typography variant="h6" style={{ marginTop: "10px" }}>Word Suggestions:</Typography>
//                 {Object.keys(suggestions).length > 0 ? (
//                 Object.entries(suggestions).map(([originalWord, wordOptions], index) => (
//                   <div key={index}>
//                     <Typography variant="body2">{originalWord}:</Typography>
//                     {wordOptions.map((suggestedWord, i) => (
//                       <Button
//                         key={i}
//                         variant="outlined"
//                         style={{ margin: "5px" }}
//                         onClick={() =>
//                           setTranscript((prev) =>
//                             prev.replace(new RegExp(`\\b${originalWord}\\b`), suggestedWord)
//                           )
//                         }
//                       >
//                         {suggestedWord}
//                       </Button>
//                     ))}
//                   </div>
//                 ))
//               ) : (
//                 <Typography variant="body2">No suggestions available</Typography>
//               )}

//               </Paper>
//             )}

//             {transcript && (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={() => setFeedbackScreen(true)}
//                 style={{ marginTop: "20px" }}
//               >
//                 Provide Feedback
//               </Button>
//             )}
//           </Paper>
//         </>
//       ) : (
//         <>
//           <Typography variant="h4" gutterBottom>
//             Feedback
//           </Typography>
//           <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={3}>
//             <Typography variant="h6">Rate the transcription:</Typography>
//             <Rating
//               name="star-rating"
//               value={rating}
//               onChange={(event, newValue) => setRating(newValue)}
//             />

//             <Typography variant="h6" style={{ marginTop: "10px" }}>Comments:</Typography>
//             <TextField
//               fullWidth
//               multiline
//               rows={3}
//               variant="outlined"
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//             />

//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmitFeedback}
//               style={{ marginTop: "20px" }}
//             >
//               Submit Feedback
//             </Button>

//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={() => setFeedbackScreen(false)}
//               style={{ marginTop: "10px" }}
//             >
//               Back to Transcription
//             </Button>
//           </Paper>
//         </>
//       )}
//     </Container>
//   );
// };

// export default App;

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Dashboard from "./Dashboard";
import Transcription from "./Transcription";

const App = () => {
  return (
    <Router>
      <Container>
        <AppBar position="static" sx={{ mb: 3 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Speech-to-Text Dashboard
            </Typography>
            <Button color="inherit" component={Link} to="/">Dashboard</Button>
            <Button color="inherit" component={Link} to="/transcription">Transcription</Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transcription" element={<Transcription />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;


















