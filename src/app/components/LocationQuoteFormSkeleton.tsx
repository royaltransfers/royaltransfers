import { LocationMark, LocationPin } from "@/assets";
import Image from "next/image";

export default function LocationQuoteFormSkeleton() {
  return (
    <div className="w-2/5 flex items-end justify-center h-full">
      <div className="w-11/12 px-4 py-6 xl:px-8 xl:py-14 bg-white z-10 rounded-2xl flex flex-col gap-4 xl:gap-6 poppins animate-pulse">
        {/* Pickup Field */}
        <div className="flex flex-col gap-1 xl:gap-3">
          <label className="text-lg xl:text-2xl uppercase bebas-neue leading-none">
            Pick Up Location
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <Image
                src={LocationPin}
                alt="Location Pin"
                width={15}
                height={15}
              />
            </div>
            <input
              disabled
              type="text"
              placeholder="Loading..."
              className="w-full px-8 py-2 xl:py-4 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
              <Image
                src={LocationMark}
                alt="Location Mark"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        {/* Arrival Field */}
        <div className="flex flex-col gap-1 xl:gap-3">
          <label className="text-lg xl:text-2xl uppercase bebas-neue leading-none">
            Arrival Location
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
              <Image
                src={LocationPin}
                alt="Location Pin"
                width={15}
                height={15}
              />
            </div>
            <input
              disabled
              type="text"
              placeholder="Loading..."
              className="w-full px-8 py-2 xl:py-4 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled
          className="bg-gray-300 text-white text-xl font-semibold px-8 py-3 rounded-full w-full cursor-not-allowed"
        >
          Loading...
        </button>
      </div>
    </div>
  );
}
