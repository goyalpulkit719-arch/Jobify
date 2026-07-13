import { useEffect, useState } from "react";
import { toast } from "sonner";

import api from "../api/axios";
import CompanyJobCard from "../components/application/CompanyJobCard";
import JobModal from "../components/jobs/JobModal";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [ShowModal, setShowModal] = useState(false);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/company/myJobs");

      setJobs(data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleEdit = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelectedJob(null);
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Jobs</h1>

        <button 
            onClick={handleCreate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition">
          + Create Job
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No jobs posted yet
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first job posting to start receiving applications.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <CompanyJobCard
              key={job._id}
              job={job}
              onEdit={handleEdit}
              onStatusChanged={fetchMyJobs}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {ShowModal && (
        <JobModal
          job={selectedJob}
          onClose={closeModal}
          onJobUpdated={() => {
            closeModal();
            fetchMyJobs();
          }}
        />
      )}
    </div>
  );
}

export default MyJobs;
