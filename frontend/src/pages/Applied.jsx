import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";
import { removeApplication } from "../store/application";
import ApplicationCard from "../components/application/ApplicationCard";

function Applied() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const applications = useSelector(
    (state) => state.application.applications
  );

  const handleWithdraw = async (applicationId) => {
    try {
      const res = await api.delete(
        `/application/withdraw/${applicationId}`
      );

      dispatch(removeApplication(applicationId));

      toast.success(res.data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to withdraw application."
      );
    }
  };

  if (applications.length === 0) {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          No Applications Yet
        </h2>

        <p className="mt-3 text-gray-500">
          You haven't applied for any jobs yet.
        </p>

        <button
          onClick={() => navigate("/jobs")}
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Browse Jobs
        </button>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          My Applications
        </h1>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {applications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              onWithdraw={handleWithdraw}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Applied;