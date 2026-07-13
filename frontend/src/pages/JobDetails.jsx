import {
  X,
  Building2,
  MapPin,
  IndianRupee,
  BriefcaseBusiness,
  Calendar,
  Gift,
} from "lucide-react";
import { toast } from "sonner";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import JobDetailsSkeleton from "../components/jobs/JobDetailsSkeleton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addApplication } from "../store/application";

function JobDetails() {
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const applications = useSelector((state) => state.application.applications);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState({});

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const res = await api.get(`/job/details/${id}`);

        setJob(res.data.data);
      } catch (err) {
        console.log(err);
        const message =
          err.response?.data?.message || "Unable to load featured jobs.";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const isApplied = applications.some(
    (application) => application.job._id === job._id,
  );

  const onApply = async () => {
    if (!isLoggedIn) {
      logInReq();
      return;
    }

    try {
      const res = await api.post(`/application/apply/${job._id}`);

      dispatch(addApplication(res.data.data));

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to apply.");
    }
  };



  if (loading) {
    return(<section className="min-h-screen bg-gray-50 py-10 px-4">
      <JobDetailsSkeleton></JobDetailsSkeleton>
    </section>)
  }


  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Top Card */}
        <div className="relative rounded-2xl bg-white p-8 shadow-sm">
          {/* Close */}
          <Link
            to="/jobs"
            className="absolute right-6 top-6 rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </Link>

          {job.isActive!==undefined && <span
            className={`absolute left-6 top-7 rounded-full px-3 py-1 text-sm font-medium ${job.isActive? "bg-green-300 text-gray-600" : "bg-red-300 text-gray-600"}`}
          >
            {job.isActive? "Active": "In-Active"}
          </span>}

          <div className="flex flex-col items-center text-center">
            {job.company.logo ? (
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="h-24 w-24 rounded-2xl border object-cover"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-600 text-4xl font-bold text-white">
                {job.company.name.charAt(0)}
              </div>
            )}

            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              {job.title}
            </h1>

            <p className="mt-2 text-lg text-gray-600">{job.company.name}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-700">
                <IndianRupee size={18} />
                {job.maxSalary===0? "Not disclosed"  :`${job.minSalary} - {job.maxSalary} LPA`}
              </span>

              <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <MapPin size={18} />
                {job.location}
              </span>

              <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <Building2 size={18} />
                {job.workMode}
              </span>

              <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <BriefcaseBusiness size={18} />
                {job.employmentType}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold">Job Description</h2>

            <p className="mt-4 leading-8 text-gray-600">{job.description}</p>
          </div>

          {/* Benefits */}

          <div className="mt-10">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <Gift size={24} />
              Benefits
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {job.benefits.length ? (
                job.benefits.map((benefit) => (
                  <span
                    key={benefit}
                    className="rounded-full bg-green-100 px-4 py-2 text-green-700"
                  >
                    {benefit}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No benefits mentioned.</p>
              )}
            </div>
          </div>

          {/* Company */}

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border p-5">
              <h3 className="font-semibold text-gray-900">Company</h3>

              <p className="mt-3 text-gray-600">{job.company.name}</p>

              <a
                href={`https://${job.company.website}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                Visit Website
              </a>
            </div>

            <div className="rounded-xl border p-5">
              <h3 className="font-semibold text-gray-900">
                Additional Information
              </h3>

              <div className="mt-3 space-y-3 text-gray-600">
                <p>
                  <strong>Created By:</strong> {job.createdBy.name}
                </p>

                <p className="flex items-center gap-2">
                  <Calendar size={18} />

                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Apply */}

          {(!isLoggedIn || role === "candidate") && (
            <button
              onClick={onApply}
              disabled={isApplied}
              className={`mt-10 w-full rounded-xl py-4 text-lg font-semibold text-white transition ${
                isApplied
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isApplied ? "Applied" : "Apply Now"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default JobDetails;
