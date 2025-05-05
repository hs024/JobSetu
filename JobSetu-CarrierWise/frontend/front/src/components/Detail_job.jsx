import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Detail_Job = () => {
  const { state } = useLocation();
  const job = state?.job;
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null); // For deleting the favorite later

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  // Check user authentication and fetch job details
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8000/api/user-details/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserDetails(data);
          if (job) {
            // Check if the job is already in the favorites
            fetch(
              `http://localhost:8000/api/favorites/check/?url=${encodeURIComponent(
                job.url
              )}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
              .then((res) => res.json())
              .then((favData) => {
                if (favData.is_favorite) {
                  setIsFavorite(true);
                  setFavoriteId(favData.id); // Backend returns the favorite ID
                }
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
          navigate("/login");
        });
    } else {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate, job]);

  // Function to toggle favorite status
  const toggleFavorite = () => {
    const token = localStorage.getItem("token");

    if (!isFavorite) {
      // Add to favorites
      fetch("http://localhost:8000/api/favorites/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: job.title,
          company: job.company,
          url: job.url,
          source: job.source,
          location: job.location,
          description: job.description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsFavorite(true);
          setFavoriteId(data.id); // Save the favorite ID for later removal
        });
    } else {
      // Remove from favorites
      fetch(`http://localhost:8000/api/favorites/${favoriteId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        setIsFavorite(false);
        setFavoriteId(null); // Clear the favorite ID
      });
    }
  };

  // If user is not logged in or user details are still loading
  if (!userDetails) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-center text-gray-600">
          Checking authentication...
        </div>
      </>
    );
  }

  // If no job data exists, show a "No job" message
  if (!job) {
    return (
      <>
        <Navbar username={userDetails.username} handleLogout={handleLogout} />
        <div className="p-8 text-center text-gray-600">
          No job data found.{" "}
          <button
            onClick={() => navigate(-1)}
            className="text-blue-500 underline"
          >
            Go Back
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar username={userDetails.username} handleLogout={handleLogout} />
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">
            {job.title}
          </h2>
          <h3 className="text-xl font-semibold mb-2">{job.company}</h3>
          <p className="text-gray-700 mb-2">{job.location}</p>
          <p className="text-sm text-gray-500 mb-4">{job.source}</p>
          <p className="text-gray-800 mb-4">{job.description}</p>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Apply Now
          </a>

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className={`ml-4 px-4 py-2 rounded-lg ${
              isFavorite
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail_Job;
