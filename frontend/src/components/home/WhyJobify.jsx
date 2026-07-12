import { Link } from "react-router-dom";

const WhyJobify = () => {
  const features = [
    {
      title: "Verified Companies",
      description:
        "Apply with confidence by exploring jobs from trusted and verified companies.",
    },
    {
      title: "Smart Job Discovery",
      description:
        "Quickly find jobs that match your skills, preferred location, and work style.",
    },
    {
      title: "Remote & On-site Opportunities",
      description:
        "Whether you prefer remote, hybrid, or office work, Jobify has opportunities for everyone.",
    },
    {
      title: "Simple & Fast",
      description:
        "A clean and intuitive experience that helps you focus on finding your next career.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-6">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900">
          Why Choose <span className="text-blue-600">Jobify?</span>
        </h2>

        <p className="mt-4 text-gray-600">
          Everything you need to discover great companies and land your dream
          job—all in one place.
        </p>
      </div>

      {/* Features */}
      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 font-bold text-xl">
              ✓
            </div>

            <h3 className="mt-5 text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-6">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 rounded-3xl bg-blue-600 px-8 py-10 text-center text-white">
        <h3 className="text-3xl font-bold">Ready to Find Your Dream Job?</h3>

        <p className="mt-3 text-blue-100">
          Join thousands of job seekers and explore opportunities from top
          companies today.
        </p>
        <button className="mt-6 rounded-xl bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-gray-100">
          <Link to="/jobs">Get Started</Link>
        </button>
      </div>
    </section>
  );
};

export default WhyJobify;
