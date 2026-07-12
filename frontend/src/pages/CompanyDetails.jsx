import {
  X,
  Globe,
  Users,
  MapPin,
  Building2,
  Calendar,
  UserRound,
  Mail,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useEffect, useState } from "react";

function CompanyDetails() {

    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        const fetchCompanyDetails = async() => {
            try{

                const res = await api.get(`/company/details/${id}`);
                
                setCompany(res.data.data);
            }
            catch(err) {
                console.log(err);
                const message =
                err.response?.data?.message ||
                "Unable to load featured jobs.";

                toast.error(message);
            }
            finally{
                setLoading(false);
            }
        }
        
        fetchCompanyDetails();

    }, [id]);

    if(loading) {
        return <h1> Hello</h1>
    }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="relative rounded-2xl bg-white p-8 shadow-sm">
          {/* Close */}
          <Link
            to="/companies"
            className="absolute right-6 top-6 rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </Link>

          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="h-28 w-28 rounded-2xl border object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-blue-600 text-5xl font-bold text-white">
                {company.name.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Name */}
            <h1 className="mt-6 text-3xl font-bold text-gray-900">
              {company.name}
            </h1>

            <p className="mt-2 text-lg text-gray-600">
              {company.industry}
            </p>

            {/* Website */}
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
            >
              <Globe size={18} />
              Visit Website
            </a>

            {/* Quick Info */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <MapPin size={18} />
                {company.location}
              </span>

              <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <Users size={18} />
                {company.employees.toLocaleString()} Employees
              </span>

              <span className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
                <Calendar size={18} />
                Founded {company.founded}
              </span>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Company Information
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="flex items-start gap-4">
              <UserRound className="mt-1 text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Owner
                </p>

                <p className="font-semibold text-gray-900">
                  {company.owner.name}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1 text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="break-all font-semibold text-gray-900">
                  {company.owner.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Building2 className="mt-1 text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Industry
                </p>

                <p className="font-semibold text-gray-900">
                  {company.industry}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="mt-1 text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="font-semibold text-gray-900">
                  {company.location}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="mt-1 text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Employees
                </p>

                <p className="font-semibold text-gray-900">
                  {company.employees.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="mt-1 text-blue-600" />

              <div>
                <p className="text-sm text-gray-500">
                  Founded
                </p>

                <p className="font-semibold text-gray-900">
                  {company.founded}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Types */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Employment Types
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {company.jobTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Work Modes */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">
            Work Modes
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            {company.workModes.map((mode) => (
              <span
                key={mode}
                className="rounded-full bg-gray-100 px-4 py-2 font-medium text-gray-700"
              >
                {mode}
              </span>
            ))}
          </div>
        </div>

        {/* Button */}
        <button className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            onClick={() => navigate(`/jobs?company=${encodeURIComponent(company.name)}`)}
        >
          Explore Jobs at {company.name}
        </button>
      </div>
    </section>
  );
}

export default CompanyDetails;