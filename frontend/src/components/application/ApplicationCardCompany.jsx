import { useState } from "react";
import { toast } from "sonner";
import api from "../../api/axios";
import { useNavigate, useNavigationType } from "react-router-dom";

function ApplicationCard({ application, refresh }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(application.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      setLoading(true);

      const { data } = await api.patch(
        `/application/updateStatus/${application._id}`,
        {
          status: newStatus,
        },
      );

      toast.success(data.message);

      setStatus(newStatus);

      refresh();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
      {/* Candidate */}

      <div className="flex items-center gap-4">
        {application.candidate.avatar ? (
          <img
            onClick={() =>
              navigate(`/company/candidate/${application.candidate._id}`)
            }
            src={application.candidate.avatar}
            alt={application.candidate.name}
            className="w-14 h-14 rounded-full object-cover border"
          />
        ) : (
          <div
            className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-4xl font-bold"
            onClick={() =>
              navigate(`/company/candidate/${application.candidate._id}`)
            }
          >
            {application.candidate.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h3
            className="font-semibold text-lg"
            onClick={() =>
              navigate(`/company/candidate/${application.candidate._id}`)
            }>
            {application.candidate.name}
          </h3>

          <p className="text-sm text-gray-600">{application.candidate.email}</p>

          <p className="text-sm text-gray-500">
            📍 {application.candidate.location || "Location not provided"}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Applied on {new Date(application.appliedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Status */}

      <div className="flex flex-col">
        <label className="text-sm text-gray-500 mb-1">Status</label>

        <select
          value={status}
          disabled={loading}
          onChange={handleStatusChange}
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlisted</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Hired">Hired</option>
        </select>
      </div>
    </div>
  );
}

export default ApplicationCard;
