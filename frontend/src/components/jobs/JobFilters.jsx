import { useEffect } from "react";

function JobFilters({ filters, setFilters, salaryGroup }) {

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
      workMode: [],
      employmentType: [],
      salary: "",
    }));
  };

  const handleSalaryChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      salary: e.target.value,
    }));
  };

  return (
    <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Heading */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Filters</h2>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700"
          onClick={handleClearFilters}
        >
          Clear
        </button>
      </div>

      {/* Work Mode */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="mb-4 font-semibold text-gray-800">Work Mode</h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Remote"
              checked={filters.workMode.includes("Remote")}
              onChange={(e) => handleCheckboxChange(e, "workMode")}
              className="h-4 w-4 accent-blue-600"
            />
            <span>Remote</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Hybrid"
              checked={filters.workMode.includes("Hybrid")}
              onChange={(e) => handleCheckboxChange(e, "workMode")}
              className="h-4 w-4 accent-blue-600"
            />
            <span>Hybrid</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="On-site"
              checked={filters.workMode.includes("On-site")}
              onChange={(e) => handleCheckboxChange(e, "workMode")}
              className="h-4 w-4 accent-blue-600"
            />
            <span>On-site</span>
          </label>
        </div>
      </div>

      {/* Employment Type */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="mb-4 font-semibold text-gray-800">Employment Type</h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Full-time"
              checked={filters.employmentType.includes("Full-time")}
              onChange={(e) => handleCheckboxChange(e, "employmentType")}
              className="h-4 w-4 accent-blue-600"
            />
            <span>Full-time</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Part-time"
              checked={filters.employmentType.includes("Part-time")}
              onChange={(e) => handleCheckboxChange(e, "employmentType")}
              className="h-4 w-4 accent-blue-600"
            />
            <span>Part-time</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Internship"
              checked={filters.employmentType.includes("Internship")}
              onChange={(e) => handleCheckboxChange(e, "employmentType")}
              className="h-4 w-4 accent-blue-600"
            />
            <span>Internship</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value="Contract"
              checked={filters.employmentType.includes("Contract")}
              onChange={(e) => handleCheckboxChange(e, "employmentType")}
              className="h-4 w-4 accent-blue-600"
            />
            <span>Contract</span>
          </label>
        </div>
      </div>

      {/* Salary */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="mb-4 font-semibold text-gray-800">Salary (LPA)</h3>

        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name={salaryGroup}
              value="0"
              checked={filters.salary==="0"}
              onChange={handleSalaryChange}
              className="accent-blue-600"
            />
            <span>0 - 5 LPA</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name={salaryGroup}
              value="5"
              checked={filters.salary==="5"}
              onChange={handleSalaryChange}
              className="accent-blue-600"
            />
            <span>5 - 9 LPA</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name={salaryGroup}
              value="9"
              checked={filters.salary==="9"}
              onChange={handleSalaryChange}
              className="accent-blue-600"
            />
            <span>9 - 15 LPA</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name={salaryGroup}
              value="15"
              checked={filters.salary==="15"}
              onChange={handleSalaryChange}
              className="accent-blue-600"
            />
            <span>15 - 20 LPA</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name={salaryGroup}
              value="20"
              checked={filters.salary==="20"}
              onChange={handleSalaryChange}
              className="accent-blue-600"
            />
            <span>20+ LPA</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default JobFilters;
