import {
  LocationMark,
  LocationPin,
  PassengerIcon,
  LargeSeatIcon,
  OneWayActive,
  TwoWayNotActive,
} from "@/assets";
import Image from "next/image";

export default function LocationQuoteFormSkeleton() {
  return (
    <div className="lg:w-2/5 2xl:w-[35%] flex items-end justify-center h-full lg:pb-8 xl:pb-16">
      <div className="w-full 2xl:w-11/12 px-4 py-6 xl:px-8 lg:py-10 bg-white z-10 rounded-2xl flex flex-col gap-4 xl:gap-6 poppins animate-pulse">
        {/* Pickup */}
        <div className="flex flex-col gap-1 lg:gap-3">
          <label className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none">
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
            <div className="w-full h-12 lg:h-14 bg-gray-200 rounded-lg px-8 py-2 cursor-not-allowed" />
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

        {/* Arrival */}
        <div className="flex flex-col gap-1 lg:gap-3">
          <label className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none">
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
            <div className="w-full h-12 lg:h-14 bg-gray-200 rounded-lg px-8 py-2 cursor-not-allowed" />
          </div>
        </div>

        {/* Passengers & Luggage */}
        <div className="flex gap-5 justify-between">
          <div className="flex-1 flex flex-col gap-1 lg:gap-3">
            <label className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none">
              No Of Passengers
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Image
                  src={PassengerIcon}
                  alt="Passenger Icon"
                  width={20}
                  height={20}
                />
              </div>
              <div className="w-full h-12 lg:h-14 bg-gray-200 rounded-lg px-8 py-2 cursor-not-allowed" />
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-1 lg:gap-3">
            <label className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none">
              No Of Luggage
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Image
                  src={LargeSeatIcon}
                  alt="Luggage Icon"
                  width={20}
                  height={20}
                />
              </div>
              <div className="w-full h-12 lg:h-14 bg-gray-200 rounded-lg px-8 py-2 cursor-not-allowed" />
            </div>
          </div>
        </div>

        {/* Trip Type */}
        <div className="flex flex-col items-start gap-2 my-2">
          <p className="text-lg lg:text-xl uppercase bebas-neue">Trip Type</p>
          <div className="flex gap-4 items-center">
            <Image
              src={OneWayActive}
              alt="One Way Active"
              className="w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] 2xl:w-[40px] 2xl:h-[40px]"
            />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <Image
              src={TwoWayNotActive}
              alt="Two Way Not Active"
              className="w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] 2xl:w-[40px] 2xl:h-[40px]"
            />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="h-12 lg:h-14 bg-gray-300 rounded-full w-full" />
      </div>
    </div>
  );
}
