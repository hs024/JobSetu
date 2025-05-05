import { useNavigate, Link } from "react-router-dom";
import { useState,useEffect } from "react";
const Navbar = ({ username, handleLogout }) => {
  const navigate = useNavigate();
const [userId, setUserId] = useState(null)
const [error, setError] = useState(null);
  useEffect(() => {
    if (!username) return;

    fetch(
      `http://localhost:8000/api/user-id/?username=${username}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("User not found or error fetching");
        }
        return res.json();
      })
      .then((data) => {
        setUserId(data.user_id);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [username]);
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-2 rounded-lg mb-4 shadow-md m-3">
      <div className="flex justify-between items-center">
        {/* App name link to home */}
        <Link to="/" className="text-white text-2xl font-bold">
          Jobsetu
        </Link>

        <div className="flex items-center space-x-3">
          {username ? (
            <>
              <span className="text-white">Welcome, {username}</span>
              <button
                onClick={() => navigate("/user-detail")}
                className="px-4 py-2 rounded-lg text-white bg-yellow-600 hover:bg-yellow-700"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
              <button
                onClick={() =>
                  (window.location.href = `http://localhost:5173?userId=${userId}&username=${username}`)
                }
              >
                Questionaire
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
