import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 p-6">
      {/* Logo */}
      <div className="flex justify-center">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-2xl border object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-gray-300 text-gray-500 flex items-center justify-center text-4xl font-bold">
            {company.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Company Name */}
      <div className="mt-5 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>

        <p className="text-gray-500 mt-1">{company.industry}</p>
      </div>

      {/* Company Details */}
      <div className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Location</span>
          <span className="text-gray-600">{company.location}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Employees</span>
          <span className="text-gray-600">
            {company.employees.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Founded</span>
          <span className="text-gray-600">{company.founded}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">Website</span>

          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline truncate max-w-37.5"
          >
            Visit
          </a>
        </div>
      </div>

      {/* Employment Types */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Employment Types
        </h3>

        <div className="flex flex-wrap gap-2">
          {company.jobTypes.map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Work Modes */}
      <div className="mt-5">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Work Modes</h3>

        <div className="flex flex-wrap gap-2">
          {company.workModes.map((mode) => (
            <span
              key={mode}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
            >
              {mode}
            </span>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        <Link
          to={`/company/${company._id}`}
          className="flex-1 flex justify-center py-2.5 rounded-xl border border-gray-300 font-medium hover:border-blue-600 hover:text-blue-600 transition"
        >
          View Details
        </Link>

        <a
          href={`https://${company.website}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex justify-center py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default CompanyCard;
