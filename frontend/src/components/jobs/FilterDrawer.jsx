import { X } from "lucide-react";
import JobFilters from "./JobFilters";

function FilterDrawer({ open, close, filters, setFilters, salaryGroup }) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-80 bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5">
          <h2 className="text-xl font-semibold">Filters</h2>

          <button
            onClick={close}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="h-[calc(100vh-80px)] overflow-y-auto p-5">
          <JobFilters filters={filters} setFilters={setFilters} salaryGroup={salaryGroup}/>
        </div>
      </aside>
    </>
  );
}

export default FilterDrawer;
