import { useNavigate } from "react-router-dom";

const Header = ({ username, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mb-6">
      <div>
        {username ? (
          <div className="flex items-center">
            <span className="mr-4 text-xl">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
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
              className="ml-4 px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700"
            >
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
