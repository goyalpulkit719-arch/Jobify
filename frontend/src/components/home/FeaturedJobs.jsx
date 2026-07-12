import { Link } from "react-router-dom";
import JobCard from "../jobs/JobCard.jsx";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../api/axios.js";
import JobCardSkeleton from "../jobs/JobCardSkeleton.jsx";
import { toast } from "sonner";

function FeaturedJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchJobs = async () => {
      try{
        const res = await api.get("/job/all", {
          params: {
            limit: 6, 
            sort: "salary_desc",
          },
        });

        setJobs(res.data.data);
      }
      catch (err) {
        const message =
          err.response?.data?.message ||
          "Unable to load featured jobs.";

        toast.error(message);
      }
      finally{
        setLoading(false);
      }
    }
    fetchJobs();
  }, [])


  const handleApply = (job) => {
    console.log(job);
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Jobs
            </h2>

            <p className="mt-2 text-gray-600">
              Explore some of the highest paying opportunities.
            </p>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onApply={handleApply}
              />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-lg text-gray-500">
              No featured jobs available.
            </div>
          )}
        </div>

        {/* View All Button */}
        {jobs.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              to="/jobs"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              View All Jobs
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}

export default FeaturedJobs;