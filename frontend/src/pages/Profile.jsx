import UserDetails from "../components/profile/UserDetails";
import CandidateProfile from "../components/profile/CandidateProfile";
import CompanyProfile from "../components/profile/CompanyProfile";

import { useSelector } from "react-redux";

function Profile() {
  const { isLoggedIn, role, id, name, avatar } = useSelector((state) => state.auth);

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your account information and profile details.
          </p>
        </div>

        {/* User Information */}
        <UserDetails />

        {/* Role Specific Section */}
        <div className="mt-8">
          {role === "candidate" ? (
            <CandidateProfile />
          ) : (
            <CompanyProfile />
          )}
        </div>

      </div>
    </section>
  );
}

export default Profile;