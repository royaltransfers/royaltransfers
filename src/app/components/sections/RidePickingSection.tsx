"use client";

import {
  ArrowLeft,
  Driver1,
  Driver2,
  EconomyCar,
  EstateCar,
  ExecutiveCar,
  MpvCar,
} from "@/assets";
import RideOptionCard from "../RideOptionCard";
import Image from "next/image";
import { StarRating } from "../StarRating";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RIDE_OPTIONS = [
  {
    type: "ECONOMY",
    star: 4,
    carImage: EconomyCar,
    noOfPassengers: 3,
    noOfLargeSeats: 2,
    noOfSmallSeats: 1,
    oneWayPrice: 138,
    roundTripPrice: 138 * 2,
  },
  {
    type: "ESTATE",
    star: 5,
    carImage: EstateCar,
    noOfPassengers: 4,
    noOfLargeSeats: 4,
    noOfSmallSeats: 0,
    oneWayPrice: 238,
    roundTripPrice: 238 * 2,
  },
  {
    type: "EXECUTIVE",
    star: 5,
    carImage: ExecutiveCar,
    noOfPassengers: 3,
    noOfLargeSeats: 2,
    noOfSmallSeats: 2,
    oneWayPrice: 338,
    roundTripPrice: 338 * 2,
  },
  {
    type: "MPV",
    star: 5,
    carImage: MpvCar,
    noOfPassengers: 5,
    noOfLargeSeats: 3,
    noOfSmallSeats: 2,
    oneWayPrice: 438,
    roundTripPrice: 438 * 2,
  },
  {
    type: "MINIBUS",
    star: 5,
    carImage: MpvCar,
    noOfPassengers: 8,
    noOfLargeSeats: 8,
    noOfSmallSeats: 0,
    oneWayPrice: 538,
    roundTripPrice: 538 * 2,
  },
];

const DRIVERS = [
  {
    name: "Herry John luis",
    image: Driver1,
    star: 4.5,
  },
  {
    name: "Martin Kane Jane",
    image: Driver2,
    star: 5,
  },
];

export default function RidePickingSection() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleBackClick = () => {
    router.replace("/");
    document
      .getElementById("hero-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const pickup = searchParams.get("pickup");
  const arrival = searchParams.get("arrival");

  useEffect(() => {
    if (pickup && arrival) {
      document
        .getElementById("ride-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pickup, arrival]);

  if (!pickup || !arrival) return null;

  return (
    <section id="ride-section" className="py-20 mb-10 poppins">
      <div className="h-full px-3 md:px-0 md:w-11/12 xl:w-10/12  mx-auto flex flex-col gap-20">
        <div className="w-full flex justify-end">
          <button
            className="cursor-pointer border-2 border-black bg-transparent text-black rounded-lg  px-3 py-2 flex gap-2 lg:gap-4 "
            onClick={handleBackClick}
          >
            <Image
              src={ArrowLeft}
              alt="arrow-left"
              className="w-4 md:w-5 lg:w-6"
            />
            <p className="text-md md:text-lg lg:text-xl xl:text-2xl be-vietnam-pro">
              Back to Get Quotes
            </p>
          </button>
        </div>
        <div className="flex w-full mx-auto xl:w-full justify-between">
          <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px] uppercase bebas-neue leading-none text-black">
            Pick Your Ride, Your Way
          </h2>
          <div className="flex flex-col gap-2 text-end be-vietnam-pro">
            <p className="text-red-500 text-md lg:text-lg xl:text-2xl">
              No Hidden Cost
            </p>
            <p className="text-md lg:text-lg xl:text-2xl">Free Cancelation</p>
            <p className="text-md lg:text-lg xl:text-2xl">
              All Prices Include Fees and Tolls
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-2 xl:gap-6">
          {RIDE_OPTIONS.map((option, index) => (
            <RideOptionCard
              key={index}
              type={option.type}
              star={option.star}
              carImage={option.carImage}
              noOfPassengers={option.noOfPassengers}
              noOfLargeSeats={option.noOfLargeSeats}
              noOfSmallSeats={option.noOfSmallSeats}
              oneWayPrice={option.oneWayPrice}
              roundTripPrice={option.roundTripPrice}
            />
          ))}
          <div className="flex w-full flex-col items-end justify-end md:mt-3 lg:m-0">
            <div className="flex flex-col gap-5 w-[97%] md:w-8/12  lg:w-10/12">
              <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px]  uppercase bebas-neue leading-none text-end text-black">
                Our Drivers Rating
              </h2>
              {DRIVERS.map((driver, index) => (
                <div
                  key={index}
                  className="px-5 py-6 flex justify-between items-center bg-[#F8F8F8] rounded-lg "
                >
                  <div className="flex flex-row gap-4 items-center">
                    <Image
                      src={driver.image}
                      alt={`${driver.name}-image`}
                      width={64}
                      height={64}
                    />
                    <span className="text-lg md:text-xl xl:text-2xl">
                      {driver.name}
                    </span>
                  </div>
                  <StarRating rating={driver.star} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
