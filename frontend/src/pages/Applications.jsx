import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api/axios";
import JobApplicationsCard from "../components/application/JobApplicationCard";

function CompanyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const url = statusFilter
        ? `/application/companyApplications?status=${statusFilter}`
        : "/application/companyApplications";

      const { data } = await api.get(url);

      setApplications(data.data.applications);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch applications.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Applications</h1>

      {/* Filters */}

      <div className="flex flex-wrap gap-3 mb-8">
        {["", "Applied", "Shortlisted", "Interview", "Rejected", "Hired"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-full border transition
            ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            >
              {status || "All"}
            </button>
          ),
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <div className="text-center py-16 border rounded-xl">
          No applications found.
        </div>
      ) : (
        <div className="space-y-8">
          {applications.map((job) => (
            <JobApplicationsCard
              key={job.jobId}
              job={job}
              refresh={fetchApplications}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CompanyApplications;
