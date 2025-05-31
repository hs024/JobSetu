import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import JobCard from "./JobCard"; // Import JobCard component
import RecommendedJob from "./RecommendedJob";
const UserDetail = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [favoriteJobs, setFavoriteJobs] = useState([]); // To store favorite jobs
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user details
      fetch("http://localhost:8000/api/user-details/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserDetails(data))
        .catch((error) => console.error("Error fetching user details:", error));

      // Fetch favorite jobs (update endpoint to /api/favorites/list/)
      fetch("http://localhost:8000/api/favorites/list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Assuming 'data' contains a list of jobs directly
          setFavoriteJobs(data);
        })
        .catch((error) =>
          console.error("Error fetching favorite jobs:", error)
        );
    } else {
      navigate("/login"); // Redirect if no token
    }
  }, [navigate]);

  if (!userDetails) {
    return (
      <>
        <Navbar />
        <div className="p-8 bg-gray-100 min-h-screen">
          <div className="text-center text-xl text-gray-600">
            Loading user details...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar username={userDetails.username} handleLogout={handleLogout} />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
            {userDetails.full_name || "No Name Provided"}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <strong className="text-lg">Username:</strong>
              <span>{userDetails.username}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg">Email:</strong>
              <span>{userDetails.email || "Not mentioned"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg">Role:</strong>
              <span>{userDetails.role || "Not assigned"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg">First Name:</strong>
              <span>{userDetails.first_name || "Not available"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg">Last Name:</strong>
              <span>{userDetails.last_name || "Not available"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg">Date Joined:</strong>
              <span>{userDetails.date_joined || "Not available"}</span>
            </div>
            <div className="flex justify-between">
              <strong className="text-lg">Last Login:</strong>
              <span>{userDetails.last_login || "Not available"}</span>
            </div>
          </div>

          {/* Display favorite jobs below the user details */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
              Your Favorite Jobs
            </h3>
            {favoriteJobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteJobs.map((favorite) => (
                  <JobCard key={favorite.id} job={favorite} /> // Pass job details to JobCard
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                You have no favorite jobs yet.
              </div>
            )}
          </div>
          <div className="mt-10">
            {userDetails && userDetails.user_id ? (
              <RecommendedJob
                userId={userDetails.user_id}
                username={userDetails.username}
              />
            ) : (
              <div className="text-center text-xl text-gray-600">
                Loading recommended jobs...
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
