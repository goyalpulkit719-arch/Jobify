import { Link } from "react-router-dom";
import heroIllustration from "../../assets/hero-illustration.png";

function HeroSection() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-12 text-center md:flex-row md:justify-between md:px-6 lg:px-8">
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="text-4xl font-extrabold leading-tight text-gray-900 lg:text-5xl">
            Find Your Dream Job Today
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-600 md:mx-0 mx-auto">
            Discover thousands of opportunities from top companies and build
            your career with Jobify.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <Link
              to="/jobs"
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
            >
              Browse Jobs
            </Link>

            <Link
              to="/companies"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100"
            >
              Explore Companies
            </Link>
          </div>

          <div className="mt-8">
            <p className="mb-4 font-medium text-gray-700">Popular Searches</p>

            <div className="flex flex-wrap justify-center gap-3 md:justify-start">
              <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                Frontend
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                Backend
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                Remote
              </span>

              <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 shadow-sm">
                Internship
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={heroIllustration}
            alt="Hero Illustration"
            className="w-72 sm:w-80 md:w-96 lg:w-102.5"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
