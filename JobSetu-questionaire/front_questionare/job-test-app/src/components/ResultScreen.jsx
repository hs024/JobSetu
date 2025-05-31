import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../ResultScreen.css";
import { useUser } from "../UserContext";

const ResultScreen = () => {
  const { state } = useLocation();
  const { score, jobId } = state || {}; // Updated to use only score and jobId
  const navigate = useNavigate();
  const { user } = useUser(); // { userId, username }

  const [isResponseSaved, setIsResponseSaved] = useState(false);

  const saveResponse = async () => {
    // Log values for debugging
    console.log("Score:", score);
    console.log("Job ID:", jobId);
    console.log("User ID:", user?.userId);

    // Make sure the required values are present
    if (!score || !jobId || !user?.userId) {
      alert("Missing required data!");
      return;
    }

    const payload = {
      user_id: user.userId,
      job_id: parseInt(jobId),
      result: score.toFixed(1) + "%", // Format score as string with percentage
    };

    try {
      console.log("Sending payload:", payload); // Log the payload being sent
      const response = await axios.post(
        "http://localhost:8080/api/vi/assessment/saveResponse",
        payload
      );
      console.log("Response saved successfully:", response.data);
      alert("Response saved successfully!"); // Show alert after saving
      setIsResponseSaved(true); // Mark as saved
    } catch (error) {
      console.error("Error saving response:", error);
      alert("Error saving response. Please try again."); // Show alert if error occurs
    }
  };

  if (isNaN(score)) {
    return (
      <div className="error-container">
        <h2>No Questions Found</h2>
        <p>Sorry, we couldn't find any questions for your test.</p>
        <button onClick={() => navigate("/")}>Go to Home</button>
      </div>
    );
  }

  let animationClass = "";
  let emojiClass = "";
  if (score < 50) {
    animationClass = "red-black-3d-animation";
    emojiClass = "upset-emoji";
  } else if (score <= 80) {
    animationClass = "yellow-golden-3d-animation";
    emojiClass = "good-emoji";
  } else {
    animationClass = "green-3d-animation";
    emojiClass = "excellent-emoji";
  }

  return (
    <div className={`result-container ${animationClass}`}>
      <div className={`emoji-background ${emojiClass}`}></div>
      <h2>Test Completed!</h2>
      <p>Your Score: {score}%</p>
      {/* <p>Your name: {user.username}</p> */}
      {/* <p>Your Id: {user.userId}</p> */}

      {/* Remove Save Button after saving */}
      {!isResponseSaved && (
        <button onClick={saveResponse}>Save Response</button>
      )}

      <button
        onClick={() =>
          navigate(`/?userId=${user.userId}&username=${user.username}`)
        }
      >
        Go to Home
      </button>
    </div>
  );
};

export default ResultScreen;
