function CompanyFilters({ filters, setFilters }) {
  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleClearFilters = () => {
    setFilters((prev) => ({
      ...prev,
      workModes: [],
      jobTypes: [],
      size: "",
    }));
  };

  const handleSizeChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      size: e.target.value,
    }));
  };

  return (
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Heading */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Filters
        </h2>

        <button
          onClick={handleClearFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Clear
        </button>
      </div>

      {/* Work Mode */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="mb-4 font-semibold text-gray-800">
          Work Mode
        </h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Remote"
              checked={filters.workModes.includes("Remote")}
              onChange={(e) =>
                handleCheckboxChange(e, "workModes")
              }
              className="h-4 w-4 accent-blue-600"
            />
            <span>Remote</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Hybrid"
              checked={filters.workModes.includes("Hybrid")}
              onChange={(e) =>
                handleCheckboxChange(e, "workModes")
              }
              className="h-4 w-4 accent-blue-600"
            />
            <span>Hybrid</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="On-site"
              checked={filters.workModes.includes("On-site")}
              onChange={(e) =>
                handleCheckboxChange(e, "workModes")
              }
              className="h-4 w-4 accent-blue-600"
            />
            <span>On-site</span>
          </label>
        </div>
      </div>

      {/* Job Types */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="mb-4 font-semibold text-gray-800">
          Job Types
        </h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Full-time"
              checked={filters.jobTypes.includes("Full-time")}
              onChange={(e) =>
                handleCheckboxChange(e, "jobTypes")
              }
              className="h-4 w-4 accent-blue-600"
            />
            <span>Full-time</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Part-time"
              checked={filters.jobTypes.includes("Part-time")}
              onChange={(e) =>
                handleCheckboxChange(e, "jobTypes")
              }
              className="h-4 w-4 accent-blue-600"
            />
            <span>Part-time</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Internship"
              checked={filters.jobTypes.includes("Internship")}
              onChange={(e) =>
                handleCheckboxChange(e, "jobTypes")
              }
              className="h-4 w-4 accent-blue-600"
            />
            <span>Internship</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Contract"
              checked={filters.jobTypes.includes("Contract")}
              onChange={(e) =>
                handleCheckboxChange(e, "jobTypes")
              }
              className="h-4 w-4 accent-blue-600"
            />
            <span>Contract</span>
          </label>
        </div>
      </div>

      {/* Company Size */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="mb-4 font-semibold text-gray-800">
          Company Size
        </h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="company-size"
              value="startup"
              checked={filters.size === "startup"}
              onChange={handleSizeChange}
              className="accent-blue-600"
            />
            <span>Startup</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="company-size"
              value="medium"
              checked={filters.size === "medium"}
              onChange={handleSizeChange}
              className="accent-blue-600"
            />
            <span>Medium</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name="company-size"
              value="large"
              checked={filters.size === "large"}
              onChange={handleSizeChange}
              className="accent-blue-600"
            />
            <span>Large</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default CompanyFilters;