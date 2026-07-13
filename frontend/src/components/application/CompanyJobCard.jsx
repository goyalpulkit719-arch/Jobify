import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaEdit } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import api from "../../api/axios";
import { toast } from "sonner";

function CompanyJobCard({ job, onEdit, onStatusChanged }) {
  const navigate = useNavigate();

  const handleToggleStatus = async () => {
    try {
      const { data } = await api.patch(`/job/toggleStatus/${job._id}`);

      toast.success(data.message);

      onStatusChanged();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleApplications = () => {
    navigate(`/company/jobs/${job._id}/applications`);
    console.log(job.title);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col gap-5">
      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {job.title}
        </h2>

        <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
          <span>{job.employmentType}</span>

          <span>•</span>

          <span>{job.workMode}</span>

          <span>•</span>

          <span className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-xs" />
            {job.location}
          </span>
        </div>
      </div>

      {/* Salary */}
      <div className="flex items-center gap-2 text-gray-700">
        <MdWork size={18} />

        <span className="font-medium">
          {job.minSalary === 0 && job.maxSalary === 0
            ? "Salary Not Disclosed"
            : `₹${job.minSalary} - ₹${job.maxSalary} LPA`}
        </span>
      </div>

      {/* Status + Applications */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleToggleStatus}
          className={`rounded-full px-3 py-1 text-sm font-medium transition
            ${
              job.isActive
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-red-100 text-red-700 hover:bg-red-200"
            }`}
        >
          {job.isActive ? "Active" : "Inactive"}
        </button>

        <div className="flex items-center gap-2 text-gray-600">
          <HiUsers />

          <span>{job.applications} Applicants</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleApplications}
          className="rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-100 transition"
        >
          Applications
        </button>

        <button
          onClick={() => onEdit(job)}
          className="rounded-lg bg-blue-600 text-white py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition"
        >
          <FaEdit />

          Edit
        </button>
      </div>
    </div>
  );
}

export default CompanyJobCard;