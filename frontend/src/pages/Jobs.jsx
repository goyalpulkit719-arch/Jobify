import { useEffect, useState } from "react";
import JobCard from "../components/jobs/JobCard";
import JobCardSkeleton from "../components/jobs/JobCardSkeleton";
import JobSearchBar from "../components/jobs/JobSearchBar";
import JobFilters from "../components/jobs/JobFilters";
import FilterDrawer from "../components/jobs/FilterDrawer";
import api from "../api/axios";
import { useSearchParams } from "react-router-dom";

function Jobs() {

  const [searchParams] = useSearchParams();
  const company = searchParams.get("company");


  const [filters, setFilters] = useState({
    search: company||"",
    sort: "salary_desc",
    workMode: [],
    employmentType: [],
    salary: "",
  });
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {

    const fetchJobs = async () => {
      const params = {
        limit: 30,
        ...filters,
        workMode: filters.workMode.join(","),
        employmentType: filters.employmentType.join(","),
      }

      try{
        const res = await api.get("/job/all", { params });
      
        setJobs(res.data.data);
      }
      catch (err) {
        console.log("aaya", err);
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

  }, [filters]);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Find Your Dream Job
          </h1>

          <p className="mt-2 text-gray-600">
            Discover thousands of opportunities from top companies.
          </p>
        </div>

        {/* Search + Sort */}
        <JobSearchBar openFilters={() => setDrawerOpen(true)} filters={filters} setFilters={setFilters} salaryGroup="desktop-salary" />

        <div className="mt-8 flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <JobFilters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Jobs */}
          <main className="flex-1">
            {/* Jobs Count */}
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                {jobs.length} Jobs Found
              </h2>
            </div>

            {/* Loading */}
            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 12 }).map((_, index) => (
                  <JobCardSkeleton key={index} />
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No Jobs Found
                </h3>

                <p className="mt-3 text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen&&<FilterDrawer open={drawerOpen} close={() => setDrawerOpen(false)} filters={filters} setFilters={setFilters} salaryGroup="mobile-salary" />}
    </section>
  );
}

export default Jobs;
