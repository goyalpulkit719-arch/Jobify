import { useEffect, useState } from "react";
import { toast } from "sonner";
import CreateCompanyModal from "./CreateCompanyModal";
import CompanyDashboard from "./CompanyDashboard";
import EditCompanyModal from "./EditCompanyModal";
import api from "../../api/axios";

function CompanyProfile() {
  const [loading, setLoading] = useState(true);
  const [hasCompany, setHasCompany] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/company/dashboard");
      if (!res.data.hasCompany) {
        setHasCompany(false);
      } else {
        setHasCompany(true);
        setDashboard(res.data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center text-gray-700 text-1xl">
        Loading...
      </div>
    );

  if (!hasCompany) {
    return (
      <>
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome to Jobify!
          </h2>

          <p className="mt-4 text-gray-500">
            Before posting jobs, create your company profile.
          </p>

          <button
            onClick={() => setCreateOpen(true)}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create Company
          </button>
        </div>

        {createOpen && (
          <CreateCompanyModal
            close={() => setCreateOpen(false)}
            refreshDashboard={fetchDashboard}
          />
        )}
      </>
    );
  }

  return (
    <>
      <CompanyDashboard data={dashboard} open={() => setEditOpen(true)} />;
      {editOpen && <EditCompanyModal
        close={() => setEditOpen(false)}
        company={dashboard.company}
        refreshDashboard={fetchDashboard}
      />}
    </>
  );
}

export default CompanyProfile;
