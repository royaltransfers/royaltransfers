"use client";

export default function CarTypesSkeleton() {
  return (
    <section
      id="car-types"
      className="scroll-mt-20 py-20 mb-10 bg-[#F9F9F9] poppins"
    >
      <div className="h-9/12 flex flex-col justify-between items-center gap-5 px-3 md:px-0 md:w-11/12 xl:w-10/12 mx-auto animate-pulse">
        {/* Heading Skeleton */}
        <div className="w-full flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div className="h-10 md:h-12 xl:h-16 w-2/3 bg-gray-300 rounded" />
            <div className="h-5 md:h-6 w-11/12 bg-gray-300 rounded" />
            <div className="h-5 md:h-6 w-3/4 bg-gray-300 rounded" />
          </div>

          {/* Top 2 cards (desktop only) */}
          <div className="hidden lg:flex gap-4 flex-1">
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-[230px] bg-gray-200 rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* Bottom cards (desktop only) */}
        <div className="hidden lg:grid grid-cols-3 gap-4 w-full">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="h-[230px] bg-gray-200 rounded-xl" />
          ))}
        </div>

        {/* Mobile/Tablet layout */}
        <div className="lg:hidden flex flex-col gap-4 w-full">
          <div className="h-10 md:h-12 xl:h-16 w-2/3 bg-gray-300 rounded" />
          <div className="h-5 md:h-6 w-11/12 bg-gray-300 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-[200px] bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
