import { useState } from "react";
import CompanyCard from "../companies/CompanyCard";
import { useEffect } from "react";
import api from "../../api/axios";
import CompanyCardSkeleton from "../companies/CompanyCardSkeleton";

const TopCompanies = () => {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);    

  useEffect(() => {
    const fetchTopCompanies = async () => {
      try {
        const res = await api.get("/company/all", {
          params: {
            limit: 4,
          },
        });

        setCompanies(res.data.data);
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
          "Unable to load companies."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopCompanies();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <CompanyCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          Top Companies
        </h2>
        <p className="mt-2 text-gray-600">
          Discover companies hiring talented professionals.
        </p>
      </div>

      {/* Companies */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {companies.length > 0 ? (
          companies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
            />
          ))
        ) : (
          <div>No companies available.</div>
        )}
      </div>
    </section>
  );
};

export default TopCompanies;