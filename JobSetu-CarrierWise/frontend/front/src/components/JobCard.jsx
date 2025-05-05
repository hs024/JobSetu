import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return !!localStorage.getItem("token");
  };

  const handleJobDetailClick = () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    navigate(`/job-detail/${job.id}`, { state: { job } });
  };

  const handleApplyClick = () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    window.open(job.url, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-all">
      <h2 className="text-xl font-bold mb-2 text-blue-700">{job.title}</h2>
      <h3 className="text-lg font-semibold mb-1">{job.company}</h3>
      <p className="text-gray-600 mb-2">{job.location}</p>
      <p className="text-sm text-gray-500 mb-2">{job.source}</p>
      <p className="text-gray-700 mb-4">{job.description.slice(0, 100)}...</p>
      <div className="flex justify-between items-center">
        <button
          onClick={handleApplyClick}
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-sm"
        >
          Apply Job
        </button>

        <button
          onClick={handleJobDetailClick}
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl text-sm"
        >
          Job Detail
        </button>

        <p className="text-xs text-gray-400">{job.posted_date}</p>
      </div>
    </div>
  );
};

export default JobCard;
