import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "sonner";

import api from "../api/axios";
import ApplicationCardCompany from "../components/application/ApplicationCardCompany";

function JobApplications() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/application/job/${jobId}`);

      setJobTitle(data.data.jobTitle);
      setApplications(data.data.applications);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <FaArrowLeft />

        Back
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{jobTitle}</h1>

        {!loading && (
          <p className="text-gray-500 mt-2">
            {applications.length}{" "}
            {applications.length === 1
              ? "Application"
              : "Applications"}
          </p>
        )}
      </div>

      {/* Body */}

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 py-16 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No applications yet
          </h2>

          <p className="text-gray-500 mt-2">
            Candidates who apply for this job will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y">
          {applications.map((application) => (
            <ApplicationCardCompany
              key={application._id}
              application={application}
              refresh={fetchApplications}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobApplications;