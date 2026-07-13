import {
  Building2,
  Globe,
  MapPin,
  Users,
  Briefcase,
  CheckCircle2,
  Ban,
  ClipboardList,
  UserCheck,
  Clock3,
  UserRoundCheck,
  XCircle,
  ArrowRight,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";

function CompanyDashboard({ data, open }) {
  const { company, overview, applicationStats, recentJobs } = data;

  return (
    <div className="space-y-8">
      {/* Company Information */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.name}
              className="h-28 w-28 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-blue-600 text-white">
              <Building2 size={50} />
            </div>
          )}

          <h2 className="mt-5 text-3xl font-bold">{company.name}</h2>

          <p className="mt-2 text-gray-500">{company.industry}</p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-6 text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              {company.location}
            </div>

            <div className="flex items-center gap-2">
              <Users size={18} />
              {company.employees || "Not Added Yet"}
            </div>

            <div>Founded {company.founded || "Not Added Yet"}</div>
          </div>

          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
            >
              <Globe size={18} />
              {company.website}
            </a>
          )}

          {company.description && (
            <p className="mt-6 max-w-3xl text-center text-gray-600">
              {company.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {company.jobTypes.length ? (
              company.jobTypes.map((job) => (
                <span
                  key={job}
                  className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700"
                >
                  {job}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-500">
                No Job Types
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {company.workModes.length ? (
              company.workModes.map((mode) => (
                <span
                  key={mode}
                  className="rounded-full bg-green-100 px-4 py-2 text-sm text-green-700"
                >
                  {mode}
                </span>
              ))
            ) : (
              <span className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-500">
                No Work Modes
              </span>
            )}
          </div>

          <button
            onClick={open}
            className="mt-8 flex items-center gap-2 rounded-xl border border-blue-600 px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <Pencil size={18} />
            Edit Company Profile
          </button>
        </div>
      </div>

      {/* Overview */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Overview</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border p-6">
            <Briefcase className="mb-3 text-blue-600" />
            <p className="text-gray-500">Total Jobs</p>

            <h3 className="mt-2 text-3xl font-bold">{overview.totalJobs}</h3>
          </div>

          <div className="rounded-xl border p-6">
            <CheckCircle2 className="mb-3 text-green-600" />
            <p className="text-gray-500">Active Jobs</p>

            <h3 className="mt-2 text-3xl font-bold">{overview.activeJobs}</h3>
          </div>

          <div className="rounded-xl border p-6">
            <Ban className="mb-3 text-red-500" />
            <p className="text-gray-500">Inactive Jobs</p>

            <h3 className="mt-2 text-3xl font-bold">{overview.inactiveJobs}</h3>
          </div>

          <div className="rounded-xl border p-6">
            <Users className="mb-3 text-purple-600" />
            <p className="text-gray-500">Applications</p>

            <h3 className="mt-2 text-3xl font-bold">
              {overview.totalApplications}
            </h3>
          </div>
        </div>
      </div>
      {/* Application Pipeline */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Application Pipeline</h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-xl border p-5 text-center">
            <ClipboardList className="mx-auto text-blue-600" />
            <p className="mt-3 text-sm text-gray-500">Applied</p>
            <h3 className="mt-2 text-2xl font-bold">
              {applicationStats.applied}
            </h3>
          </div>

          <div className="rounded-xl border p-5 text-center">
            <UserCheck className="mx-auto text-yellow-500" />
            <p className="mt-3 text-sm text-gray-500">Shortlisted</p>
            <h3 className="mt-2 text-2xl font-bold">
              {applicationStats.shortlisted}
            </h3>
          </div>

          <div className="rounded-xl border p-5 text-center">
            <Clock3 className="mx-auto text-orange-500" />
            <p className="mt-3 text-sm text-gray-500">Interview</p>
            <h3 className="mt-2 text-2xl font-bold">
              {applicationStats.interview}
            </h3>
          </div>

          <div className="rounded-xl border p-5 text-center">
            <UserRoundCheck className="mx-auto text-green-600" />
            <p className="mt-3 text-sm text-gray-500">Hired</p>
            <h3 className="mt-2 text-2xl font-bold">
              {applicationStats.hired}
            </h3>
          </div>

          <div className="rounded-xl border p-5 text-center">
            <XCircle className="mx-auto text-red-500" />
            <p className="mt-3 text-sm text-gray-500">Rejected</p>
            <h3 className="mt-2 text-2xl font-bold">
              {applicationStats.rejected}
            </h3>
          </div>
        </div>
      </div>

      {/* Recent Jobs */}

      <div className="rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Jobs</h2>

          <Link
            to="/my-jobs"
            className="flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View All Jobs
            <ArrowRight size={18} />
          </Link>
        </div>

        {recentJobs.length ? (
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div
                key={job._id}
                className="flex items-center justify-between rounded-xl border p-5"
              >
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Posted on{" "}
                    {new Date(job.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    job.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {job.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <Briefcase size={45} className="mx-auto text-gray-400" />

            <h3 className="mt-4 text-xl font-semibold">No Jobs Posted Yet</h3>

            <p className="mt-2 text-gray-500">
              Create your first job posting to start hiring.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDashboard;
