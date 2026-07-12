function JobDetailsSkeleton() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 animate-pulse">
      <div className="mx-auto max-w-4xl">

        {/* Top Card */}
        <div className="relative rounded-2xl bg-white p-8 shadow-sm">

          {/* Close */}
          <div className="absolute right-6 top-6 h-10 w-10 rounded-full bg-gray-200" />

          <div className="flex flex-col items-center">

            {/* Logo */}
            <div className="h-24 w-24 rounded-2xl bg-gray-200" />

            {/* Title */}
            <div className="mt-6 h-8 w-72 rounded bg-gray-200" />

            {/* Company */}
            <div className="mt-4 h-5 w-40 rounded bg-gray-200" />

            {/* Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">

              <div className="h-10 w-36 rounded-full bg-gray-200" />

              <div className="h-10 w-32 rounded-full bg-gray-200" />

              <div className="h-10 w-28 rounded-full bg-gray-200" />

              <div className="h-10 w-36 rounded-full bg-gray-200" />

            </div>

          </div>
        </div>

        {/* Bottom Card */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">

          {/* Description */}
          <div>

            <div className="h-8 w-52 rounded bg-gray-200" />

            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>

          </div>

          {/* Benefits */}
          <div className="mt-10">

            <div className="h-8 w-36 rounded bg-gray-200" />

            <div className="mt-5 flex flex-wrap gap-3">

              <div className="h-10 w-28 rounded-full bg-gray-200" />
              <div className="h-10 w-24 rounded-full bg-gray-200" />
              <div className="h-10 w-32 rounded-full bg-gray-200" />

            </div>

          </div>

          {/* Info Cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">

            <div className="rounded-xl border p-5">

              <div className="h-6 w-28 rounded bg-gray-200" />

              <div className="mt-5 h-4 w-40 rounded bg-gray-200" />

              <div className="mt-4 h-4 w-32 rounded bg-gray-200" />

            </div>

            <div className="rounded-xl border p-5">

              <div className="h-6 w-44 rounded bg-gray-200" />

              <div className="mt-5 h-4 w-36 rounded bg-gray-200" />

              <div className="mt-4 h-4 w-44 rounded bg-gray-200" />

            </div>

          </div>

          {/* Apply Button */}
          <div className="mt-10 h-14 w-full rounded-xl bg-gray-200" />

        </div>

      </div>
    </section>
  );
}

export default JobDetailsSkeleton;