import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Home.css'; // Ensure this matches your updated CSS

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const navigate = useNavigate();

  // Fetch job roles
  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vi/assessment/getAllJobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
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
      alert('Please select a job role');
    }
  };

  return (
    <div className="home-container">
      <h1>Start Your Career Assessment</h1>

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
      </div>
    </div>
  );
};

export default Home;
