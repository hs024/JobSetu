const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, loading }) => (
  <div className="flex items-center gap-2 mb-6">
    <input
      type="text"
      placeholder="Search for jobs..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border border-gray-300 rounded-lg p-2 w-full"
    />
    <button
      onClick={handleSearch}
      disabled={loading}
      className={`px-4 py-2 rounded-lg text-white ${
        loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {loading ? "Searching..." : "Search"}
    </button>
  </div>
);

export default SearchBar;
