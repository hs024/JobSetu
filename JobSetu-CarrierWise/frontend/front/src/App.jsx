import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";
import Footer from "./components/Footer";
function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  let userId;
  const fetchJobs = (searchTerm = "") => {
    let url = "http://localhost:8000/api/job-listings/";
    if (searchTerm) {
      url += `?search_term=${searchTerm}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setNoResults(data.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setNoResults(true);
      });
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const scrapeResponse = await fetch(
        "http://localhost:8000/api/scrape-jobs/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ search_term: searchTerm }),
        }
      );

      if (scrapeResponse.ok) {
        fetchJobs(searchTerm);
      } else {
        alert("Error scraping jobs");
      }
    } catch (error) {
      console.error("Error scraping jobs:", error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  useEffect(() => {
    fetchJobs();
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);
  }, []);

  return (
    <>
      <Navbar username={username} handleLogout={handleLogout} />
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-6">Latest Job Listings</h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          loading={loading}
        />
        {loading ? (
          <div className="text-center text-blue-600 text-xl">
            Searching for jobs, please wait...
          </div>
        ) : (
          <JobList jobs={jobs} noResults={noResults} searchTerm={searchTerm} />
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
