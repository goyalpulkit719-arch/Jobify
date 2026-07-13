import ApplicationCardCompany from "./ApplicationCardCompany";

function JobApplicationsCard({ job, refresh }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {job.title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {job.applications.length}{" "}
            {job.applications.length === 1
              ? "Application"
              : "Applications"}
          </p>
        </div>
      </div>

      {/* Applications */}

      <div className="divide-y">
        {job.applications.map((application) => (
          <ApplicationCardCompany
            key={application._id}
            application={application}
            refresh={refresh}
          />
        ))}
      </div>
    </div>
  );
}

export default JobApplicationsCard;