function CompanyCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Logo */}
      <div className="mx-auto mb-5 h-20 w-20 rounded-full bg-gray-300"></div>

      {/* Company Name */}
      <div className="mx-auto mb-3 h-6 w-40 rounded bg-gray-300"></div>

      {/* Industry */}
      <div className="mx-auto mb-2 h-4 w-28 rounded bg-gray-200"></div>

      {/* Location */}
      <div className="mx-auto mb-5 h-4 w-24 rounded bg-gray-200"></div>

      {/* Stats / Jobs */}
      <div className="mb-6 flex justify-center gap-3">
        <div className="h-4 w-20 rounded bg-gray-200"></div>
        <div className="h-4 w-16 rounded bg-gray-200"></div>
      </div>

      {/* Button */}
      <div className="h-10 w-full rounded-lg bg-gray-300"></div>

    </div>
  );
}

export default CompanyCardSkeleton;