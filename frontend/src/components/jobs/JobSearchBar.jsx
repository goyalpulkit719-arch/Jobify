import { Search, SlidersHorizontal } from "lucide-react";

function JobSearchBar({ openFilters, filters, setFilters }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={filters.search}
            placeholder="Search by job title, company or location..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }));
            }}
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Sort */}
          <select
            value={filters.sort}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                sort: e.target.value,
              }));
            }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="salary_desc">Highest Salary</option>
            <option value="salary_asc">Lowest Salary</option>
          </select>

          {/* Mobile Filters */}
          <button
            onClick={openFilters}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-3 transition hover:bg-gray-100 lg:hidden"
          >
            <SlidersHorizontal size={18} />

            <span>Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobSearchBar;
