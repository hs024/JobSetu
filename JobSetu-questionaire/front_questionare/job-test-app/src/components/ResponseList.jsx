import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../UserContext";

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
      setResponses((prev) => prev.filter((r) => r.result_id !== responseId)); // Use `result_id` here
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-8 text-gray-500">Loading responses...</p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Your Past Test Responses
      </h1>
      {responses.length === 0 ? (
        <p className="text-center text-gray-500">No responses found.</p>
      ) : (
        // ! table start
        <div className="w-full flex justify-center">
          <center>

          <table className="w-auto bg-white border border-gray-200 shadow rounded-lg border-separate border-spacing-6">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-6 px-8 text-left">Response ID</th>
                <th className="py-6 px-8 text-left">Job Role</th>
                <th className="py-6 px-8 text-left">Result</th>
                <th className="py-6 px-8 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response) => (
                <tr key={response.result_id} className="hover:bg-gray-50">
                  <td className="py-6 px-8 bg-white">{response.result_id}</td>
                  <td className="py-6 px-8 bg-white">
                    {response.job_name || "N/A"}
                  </td>
                  <td className="py-6 px-8 bg-white">{response.result}</td>
                  <td className="py-6 px-8 bg-white">
                    <button
                      onClick={() => handleDelete(response.result_id)}
                      className="text-red-600 hover:underline"
                      >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </center>
        </div>
      )}
    </div>
  );
};

export default ResponseList;
