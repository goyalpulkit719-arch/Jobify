import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api/axios";

import CompanyCard from "../components/companies/CompanyCard";
import CompanyCardSkeleton from "../components/companies/CompanyCardSkeleton";
import CompanySearchBar from "../components/companies/CompanySearch";
import CompanyFilters from "../components/companies/CompanyFilters";
import CompanyFilterDrawer from "../components/companies/CompanyFilterDrawer";

function Companies() {
  const [filters, setFilters] = useState({
    search: "",
    workModes: [],
    jobTypes: [],
    size: "",
  });

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      const params = {
        limit: 30,
        ...filters,
        workModes: filters.workModes.join(","),
        jobTypes: filters.jobTypes.join(","),
      };

      try {
        setLoading(true);

        const res = await api.get("/company/all", {
          params,
        });

        setCompanies(res.data.data);
      } catch (err) {
        console.log(err);

        const message =
          err.response?.data?.message ||
          "Unable to load companies.";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [filters]);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Find Your Dream Company
          </h1>

          <p className="mt-2 text-gray-600">
            Discover top companies that match your career goals.
          </p>
        </div>

        {/* Search */}
        <CompanySearchBar
          filters={filters}
          setFilters={setFilters}
          openFilters={() => setDrawerOpen(true)}
        />

        <div className="mt-8 flex gap-8">
          {/* Desktop Filters */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <CompanyFilters
              filters={filters}
              setFilters={setFilters}
            />
          </aside>

          {/* Companies */}
          <main className="flex-1">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-gray-800">
                {companies.length} Companies Found
              </h2>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Array.from({ length: 12 }).map((_, index) => (
                  <CompanyCardSkeleton key={index} />
                ))}
              </div>
            ) : companies.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {companies.map((company) => (
                  <CompanyCard
                    key={company._id}
                    company={company}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white p-12 text-center shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No Companies Found
                </h3>

                <p className="mt-3 text-gray-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <CompanyFilterDrawer
          open={drawerOpen}
          close={() => setDrawerOpen(false)}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </section>
  );
}

export default Companies;