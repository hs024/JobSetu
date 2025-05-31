import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const RecommendedJob = ({ userId, username }) => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topJobRole, setTopJobRole] = useState(null);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        console.log("userId received in RecommendedJob:", userId);
        if (!userId) {
          console.warn("No userId provided.");
          return;
        }

        // Step 1: Get assessment responses
        const res = await axios.get(
          `http://localhost:8080/api/v1/assessment/getAllResponse/${userId}`
        );
        const responses = res.data;
        console.log("Assessment responses:", responses);

        if (!Array.isArray(responses) || responses.length === 0) {
          console.warn("No assessment responses found.");
          setRecommendedJobs([]);
          return;
        }

        const jobStats = {};

        responses.forEach(({ job_name, result }) => {
          const job = job_name || "N/A";
          if (!jobStats[job]) {
            jobStats[job] = {
              count: 0,
              highestScore: Number(result),
            };
          }
          jobStats[job].count += 1;
          jobStats[job].highestScore = Math.max(
            jobStats[job].highestScore,
            Number(result)
          );
        });

        // Find the top job role
        let top = null;
        for (const [job, data] of Object.entries(jobStats)) {
          if (
            !top ||
            data.count > top.count ||
            (data.count === top.count && data.highestScore > top.highestScore)
          ) {
            top = { job, ...data };
          }
        }

        if (!top) {
          console.warn("No top job role found.");
          setRecommendedJobs([]);
          return;
        }

        setTopJobRole(top.job);
        console.log("Top job role computed:", top.job);

        // Step 2: Fetch matching jobs from Django backend
        const jobListRes = await axios.get(
          `http://localhost:8000/api/job-listings/?search_term=${encodeURIComponent(
            top.job
          )}`
        );

        console.log("Job listings received:", jobListRes.data);

        setRecommendedJobs(jobListRes.data);
      } catch (err) {
        console.error(
          "Error fetching recommended jobs:",
          err.response?.data || err.message || err
        );
        setRecommendedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    // Trigger fetch if userId is defined
    if (userId) {
      console.log("Calling fetchRecommendedJobs()");
      fetchRecommendedJobs();
    } else {
      console.warn("userId is not defined, skipping fetch");
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center mt-6 text-gray-500">
        Fetching recommended jobs...
      </div>
    );
  }

  if (!recommendedJobs.length) {
    return (
      <div className="text-center mt-6 text-gray-500">
        No recommended jobs found.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
        Hi {username}, Recommended Jobs for You ({topJobRole})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedJobs.map((job) => (
          <div key={job.id}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJob;
