import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";

const guestNav = [
  { name: "Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "Login", path: "/login" },
  { name: "Signup", path: "/signup" },
];
const candidateNav = [
  { name: "Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "Applied", path: "/applied" },
];
const companyNav = [
  { name: "Jobs", path: "/jobs" },
  { name: "Companies", path: "/companies" },
  { name: "My Jobs", path: "/my-jobs" },
  { name: "Applications", path: "/applications" },
];

function NoLoginHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoggedIn, role, name, avatar } = useSelector((state) => state.auth);

  let navLinks;
  if (!isLoggedIn) navLinks = guestNav;
  else if (role === "candidate") navLinks = candidateNav;
  else navLinks = companyNav;

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex h-full justify-between items-center px-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-2xl font-extrabold text-blue-600">
            Jobify
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-medium text-gray-700 transition-colors hover:text-blue-600 text-lg"
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn && (
              <Link
                className="font-medium flex justify-center items-center gap-1 text-gray-700 transition-colors hover:text-blue-600 text-lg"
                to={"/profile"}
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <FaRegCircleUser className="text-4xl" />
                )}
                <div>Profile</div>
              </Link>
            )}
          </nav>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-gray-200 bg-white p-4 md:hidden">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="font-medium text-gray-700 hover:text-blue-600"
              >
                {item.name}
              </Link>
            ))}
            <Link
              key={"/profile"}
              to={"/profile"}
              onClick={() => setMenuOpen(false)}
              className="font-medium text-gray-700 hover:text-blue-600"
            >
              Profile
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}

export default NoLoginHeader;
