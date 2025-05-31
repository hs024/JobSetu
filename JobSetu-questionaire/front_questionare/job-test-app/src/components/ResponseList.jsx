import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";
import "../ResponseList.css";

const ResponseList = () => {
  const { user } = useUser(); // assumes user has userId
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all responses on mount
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/vi/assessment/getAllResponse/${user.userId}`
        );
        setResponses(res.data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchResponses();
    }
  }, [user]);

  // Delete a specific response
  const handleDelete = async (responseId) => {
    if (!window.confirm("Are you sure you want to delete this response?"))
      return;

    try {
      await axios.delete(
        `http://localhost:8080/api/vi/assessment/deleteResponse/${responseId}`
      );
      setResponses((prev) => prev.filter((r) => r.result_id !== responseId));
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-8 text-gray-500">Loading responses...</p>
    );

  return (
    <div className="response-table-container">
      <h1 className="response-heading">Your Past Test Responses</h1>
      {responses.length === 0 ? (
        <p className="no-responses">No responses found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="response-table">
            <thead>
              <tr>
                <th>Response ID</th>
                <th>Job Role</th>
                <th>Result</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response) => (
                <tr key={response.result_id}>
                  <td>{response.result_id}</td>
                  <td>{response.job_name || "N/A"}</td>
                  <td>{response.result}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(response.result_id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResponseList;
