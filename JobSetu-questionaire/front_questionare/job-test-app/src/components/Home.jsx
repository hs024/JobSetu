import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Home.css"; // Ensure this matches your updated CSS
import { useLocation } from "react-router-dom";
import { useUser } from "../UserContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const UserContext = createContext();

const Home = ({ ...props }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const navigate = useNavigate();
  const query = useQuery();
  const username = query.get("username");
  const userId = query.get("userId");

  const { setUser } = useUser();

  useEffect(() => {
    const userId = query.get("userId");
    const username = query.get("username");
    setUser({ userId, username });
  }, []);

  // Fetch job roles
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/vi/assessment/getAllJobs"
      );
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle test start
  const handleStartTest = () => {
    if (selectedJobId) {
      navigate(`/test/${selectedJobId}`);
    } else {
      alert("Please select a job role");
    }
  };

  // Navigate to response list page
  const handleGoToResponses = () => {
    // navigate(`/responses?userId=${user.userId}&username=${user.username}`);
    navigate(`/responses`);
  };

  return (
    <div className="home-container">
      <h1>Start Your Career Assessment</h1>
      <h1>Welcome {username} ....</h1>

      <div className="select-container">
        <select
          className="select-dropdown"
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
        >
          <option value="">-- Select Job Role --</option>
          {jobs.map((job) => (
            <option key={job.job_id} value={job.job_id}>
              {job.job_role}
            </option>
          ))}
        </select>

        <button className="start-button" onClick={handleStartTest}>
          <span>Start Test</span>
        </button>

        {/* Response List Button */}
        <button
          className="response-list-button start-button"
          onClick={handleGoToResponses}
        >
          <span>View Response List</span>
        </button>

        <button
          className="response-list-button start-button"
          onClick={() => (window.location.href = "http://localhost:5174")}
        >
          <span>HOME</span>
        </button>
        <br />
      </div>
    </div>
  );
};

export default Home;
