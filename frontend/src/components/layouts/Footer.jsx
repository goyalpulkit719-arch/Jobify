import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900 text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-12 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-500"
        >
          Jobify
        </Link>

        {/* Description */}
        <p className="mt-4 max-w-md text-center text-gray-400">
          Find your next opportunity. Hire the right talent.
        </p>

        {/* Links */}
        <nav className="mt-8 flex flex-wrap justify-center gap-8">
          <Link
            to="/jobs"
            className="transition-colors duration-200 hover:text-blue-400"
          >
            Jobs
          </Link>

          <Link
            to="/companies"
            className="transition-colors duration-200 hover:text-blue-400"
          >
            Companies
          </Link>

          <Link
            to="/about"
            className="transition-colors duration-200 hover:text-blue-400"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="transition-colors duration-200 hover:text-blue-400"
          >
            Contact
          </Link>
        </nav>

        {/* Copyright */}
        <p className="mt-8 text-center text-sm text-gray-500">
          © 2026 Jobify. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;