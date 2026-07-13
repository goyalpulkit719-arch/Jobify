import { Link } from "react-router-dom";
import {
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineHomeModern,
  HiOutlineCurrencyRupee,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { logInReq, jobApplied } from "../../utils/toast";
import api from "../../api/axios";
import { toast } from "sonner";
import { addApplication } from "../../store/application";

function JobCard({ job }) {
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const applications = useSelector((state) => state.application.applications);
  const {
    title,
    company,
    location,
    employmentType,
    workMode,
    minSalary,
    maxSalary,
  } = job;
  const isApplied = applications.some(
    (application) => application.job._id === job._id,
  );

  const onApply = async () => {
    if (!isLoggedIn) logInReq();
    else {
      try {
        const response = await api.post(`/application/apply/${job._id}`);

        dispatch(addApplication(response.data.data));

        toast.success(response.data.message);
      } catch (err) {
        toast.error(err.response?.data?.message || "Unable to apply.");
      }
    }
  };

  const salary =
    minSalary === 0 && maxSalary === 0
      ? "Salary Not Disclosed"
      : `₹${minSalary} - ₹${maxSalary} LPA`;

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="h-14 w-14 rounded-lg border object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-gray-300 text-gray-500 flex items-center justify-center text-4xl font-bold">
            {company.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex-1">
          <h2 className="line-clamp-2 text-xl font-semibold text-gray-900">
            {title}
          </h2>

          <p className="mt-1 text-gray-600">{company.name}</p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-3 text-gray-700">
        <div className="flex items-center gap-2">
          <HiOutlineMapPin className="text-lg text-blue-600" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineBriefcase className="text-lg text-blue-600" />
          <span>{employmentType}</span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineHomeModern className="text-lg text-blue-600" />
          <span>{workMode}</span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineCurrencyRupee className="text-lg text-blue-600" />
          <span>{salary}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        <Link
          to={`/job/${job._id}`}
          className="flex-1 rounded-lg border border-gray-300 py-2 text-center font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100"
        >
          Details
        </Link>

        {(!isLoggedIn || role === "candidate") && (
          <button
            onClick={() => onApply()}
            disabled={isApplied}
            className={`flex-1 rounded-lg py-2 font-medium text-white transition-colors duration-200 ${
              isApplied
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isApplied ? "Applied" : "Apply"}
          </button>
        )}
      </div>
    </div>
  );
}

export default JobCard;
