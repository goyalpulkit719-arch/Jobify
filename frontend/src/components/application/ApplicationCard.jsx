import { Link } from "react-router-dom";
import {
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineHomeModern,
  HiOutlineCurrencyRupee,
} from "react-icons/hi2";

function ApplicationCard({ application, onWithdraw }) {
  const { _id, company, job, status, createdAt } = application;

  const statusColor = {
    Applied: "bg-blue-100 text-blue-700",
    Shortlisted: "bg-purple-100 text-purple-700",
    Interview: "bg-orange-100 text-orange-700",
    Hired: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const salary =
    job.minSalary === 0 && job.maxSalary === 0
      ? "Salary Not Disclosed"
      : `₹${job.minSalary} - ₹${job.maxSalary} LPA`;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="h-14 w-14 rounded-lg border object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-300 text-3xl font-bold text-gray-600">
            {company.name.charAt(0)}
          </div>
        )}

        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {job.title}
          </h2>

          <p className="mt-1 text-gray-600">{company.name}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            statusColor[status]
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-6 space-y-3 text-gray-700">

        <div className="flex items-center gap-2">
          <HiOutlineMapPin className="text-blue-600" />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineBriefcase className="text-blue-600" />
          <span>{job.employmentType}</span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineHomeModern className="text-blue-600" />
          <span>{job.workMode}</span>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineCurrencyRupee className="text-blue-600" />
          <span>{salary}</span>
        </div>

        <p className="pt-2 text-sm text-gray-500">
          Applied on{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>

      </div>

      <div className="mt-8 flex gap-3">

        <Link
          to={`/job/${job._id}`}
          className="flex-1 rounded-lg border border-gray-300 py-2 text-center font-medium text-gray-700 transition hover:bg-gray-100"
        >
          View Job
        </Link>

        {(status === "Applied" || status === "Shortlisted") && (
          <button
            onClick={() => onWithdraw(_id)}
            className="flex-1 rounded-lg bg-red-600 py-2 font-medium text-white transition hover:bg-red-700"
          >
            Withdraw
          </button>
        )}

      </div>
    </div>
  );
}

export default ApplicationCard;