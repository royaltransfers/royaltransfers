import { ArrowLeft } from "@/assets";
import Image from "next/image";

export default function RidePickingSectionSkeleton() {
  return (
    <section
      id="ride-section"
      className="h-[170vh] flex flex-col justify-center items-center"
    >
      <div className="h-10/12 md:w-11/12 lg:w-[98%] xl:w-11/12 2xl:w-10/12 mx-auto flex flex-col gap-20 animate-pulse">
        {/* Back Button */}
        <div className="w-full flex justify-end">
          <button className="cursor-default border-2 border-gray-300 bg-gray-200 text-gray-400 rounded-lg px-3 py-4 flex gap-4 items-center">
            <Image src={ArrowLeft} alt="arrow-left" width={28} height={5} />
            <div className="h-6 w-48 bg-gray-300 rounded" />
          </button>
        </div>

        {/* Heading Section */}
        <div className="flex w-full lg:w-11/12 mx-auto xl:w-full justify-between">
          <div className="h-16 w-2/3 bg-gray-300 rounded" />
          <div className="flex flex-col gap-2 text-end">
            <div className="h-6 w-48 bg-gray-300 rounded" />
            <div className="h-6 w-40 bg-gray-300 rounded" />
            <div className="h-6 w-56 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Cards + Driver Ratings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 xl:gap-6">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl p-6 h-60 w-full"
            />
          ))}

          {/* Driver Ratings */}
          <div className="flex w-full flex-col items-end justify-end">
            <div className="flex flex-col gap-5 w-10/12">
              <div className="h-10 w-60 bg-gray-300 rounded self-end" />
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="px-5 py-6 flex justify-between items-center bg-gray-100 rounded-lg"
                >
                  <div className="flex flex-row gap-4 items-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full" />
                    <div className="h-6 w-40 bg-gray-300 rounded" />
                  </div>
                  <div className="h-6 w-24 bg-gray-300 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
