import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../ResultScreen.css';  // Import ResultScreen-specific CSS
import { useUser } from "../UserContext";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const ResultScreen = ({...props}) => {
  const { state } = useLocation();
  const { score } = state || {};
  const navigate = useNavigate();
    const { user } = useUser();
  // const query = useQuery();
  // const username = query.get("username");
  // const userId = query.get("userId");
  // Handle NaN case (no score found)
  if (isNaN(score)) {
    return (
      <div className="error-container">
        <h2>No Questions Found</h2>
        <p>Sorry, we couldn't find any questions for your test.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  // Determine animation class and emoji based on score
  let animationClass = '';
  let emojiClass = '';
  if (score < 50) {
    animationClass = 'red-black-3d-animation'; // Red and black 3D animation
    emojiClass = 'upset-emoji'; // Upset emoji for less than 50%
  } else if (score >= 50 && score <= 80) {
    animationClass = 'yellow-golden-3d-animation'; // Yellow and golden 3D animation
    emojiClass = 'good-emoji'; // Good emoji for 50-80%
  } else {
    animationClass = 'green-3d-animation'; // Green 3D animation
    emojiClass = 'excellent-emoji'; // Excellent emoji for above 80%
  }

  return (
    <div className={`result-container ${animationClass}`}>
      <div className={`emoji-background ${emojiClass}`}></div>
      <h2>Test Completed!</h2>
      <p>Your Score: {score}%</p>
      <p>Your name: {user.username}</p>
      <p>Your Id: {user.userId}</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
};

export default ResultScreen;
