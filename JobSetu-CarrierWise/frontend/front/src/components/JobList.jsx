import JobCard from "./JobCard";

const JobList = ({ jobs, noResults, searchTerm }) => (
  <>
    {noResults && (
      <div className="text-center text-red-600 text-xl mb-4">
        No jobs found for "{searchTerm}"
      </div>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  </>
);

export default JobList;
