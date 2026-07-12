import { Search, SlidersHorizontal } from "lucide-react";

function CompanySearchBar({ openFilters, filters, setFilters }) {
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
            placeholder="Search by company name or location..."
            className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            onChange={(e) => {
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }));
            }}
          />
        </div>

        {/* Mobile Filters */}
        <button
          onClick={openFilters}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 transition hover:bg-gray-100 lg:hidden"
        >
          <SlidersHorizontal size={18} />
          <span>Filters</span>
        </button>
      </div>
    </div>
  );
}

export default CompanySearchBar;