"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LocationMark,
  LocationPin,
  PassengerIcon,
  LargeSeatIcon,
  OneWayActive,
  OneWayNotActive,
  TwoWayActive,
  TwoWayNotActive,
} from "@/assets";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const locationSchema = z.object({
  pickup: z.string().min(1, "Pickup location is required."),
  arrival: z.string().min(1, "Arrival location is required."),
  passengers: z.number().min(1, "Please select passengers."),
  luggage: z.number().min(0),
  tourType: z.enum(["one-way", "two-way"]),
});

type LocationFormData = z.infer<typeof locationSchema>;

export default function LocationQuoteForm() {
  const [tourType, setTourType] = useState<"one-way" | "two-way">("one-way");
  const [openDropdown, setOpenDropdown] = useState<
    "passengers" | "luggage" | null
  >(null);

  const passengersRef = useRef<HTMLDivElement>(null);
  const luggageRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      passengers: 1,
      luggage: 0,
      tourType: "one-way",
    },
  });

  const passengers = watch("passengers");
  const luggage = watch("luggage");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        passengersRef.current &&
        !passengersRef.current.contains(event.target as Node) &&
        luggageRef.current &&
        !luggageRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = (data: LocationFormData) => {
    const params = new URLSearchParams(searchParams);
    params.set("pickup", data.pickup);
    params.set("arrival", data.arrival);
    params.set("passengers", data.passengers.toString());
    params.set("luggage", data.luggage.toString());
    params.set("tourType", data.tourType);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleTourType = (type: "one-way" | "two-way") => {
    setTourType(type);
    setValue("tourType", type);
  };

  const handleDropdownToggle = (dropdown: "passengers" | "luggage") => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handlePassengerSelect = (num: number) => {
    setValue("passengers", num);
    setOpenDropdown(null);
  };

  const handleLuggageSelect = (num: number) => {
    setValue("luggage", num);
    setOpenDropdown(null);
  };

  return (
    <div className="lg:w-2/5 2xl:w-[35%] flex items-end justify-center h-full lg:pb-8 xl:pb-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full 2xl:w-11/12 px-4 py-6 xl:px-8 lg:py-10  bg-white z-10 rounded-2xl flex flex-col gap-4 xl:gap-6 poppins"
      >
        {/* Pickup */}
        <div className="flex flex-col gap-1 lg:gap-3">
          <label className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none">
            Pick Up Location
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Image
                src={LocationPin}
                alt="Location Pin"
                width={15}
                height={15}
              />
            </div>
            <input
              {...register("pickup")}
              placeholder="City, Address"
              className={`w-full px-8 py-2 lg:py-3 xl:py-4 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.pickup
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue"
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Image
                src={LocationMark}
                alt="Location Mark"
                width={20}
                height={20}
              />
            </div>
          </div>
          {errors.pickup && (
            <p className="text-red-500 text-sm">{errors.pickup.message}</p>
          )}
        </div>

        {/* Arrival */}
        <div className="flex flex-col gap-1 lg:gap-3">
          <label className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none">
            Arrival Location
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Image
                src={LocationPin}
                alt="Location Pin"
                width={15}
                height={15}
              />
            </div>
            <input
              {...register("arrival")}
              placeholder="City, Address"
              className={`w-full px-8 py-2 lg:py-3 xl:py-4 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.arrival
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue"
              }`}
            />
          </div>
          {errors.arrival && (
            <p className="text-red-500 text-sm">{errors.arrival.message}</p>
          )}
        </div>

        <div className="flex gap-5 justify-between">
          {/* Passengers Dropdown */}
          <div
            className="flex-1 flex flex-col gap-1 lg:gap-3"
            ref={passengersRef}
          >
            <label className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none">
              No Of Passengers
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Image
                  src={PassengerIcon}
                  alt="Passengers"
                  width={20}
                  height={20}
                />
              </div>
              <div
                onClick={() => handleDropdownToggle("passengers")}
                className="w-full px-8 lg:px-10 py-2 lg:py-6 xl:py-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue cursor-pointer flex items-center justify-between bg-white"
              >
                <span>{passengers}</span>
                {openDropdown === "passengers" ? (
                  <ChevronUp
                    size={16}
                    className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                  />
                )}
              </div>

              {openDropdown === "passengers" && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto z-50 shadow-lg">
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                    <div
                      key={num}
                      onClick={() => handlePassengerSelect(num)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        passengers === num ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.passengers && (
              <p className="text-red-500 text-sm">
                {errors.passengers.message}
              </p>
            )}
          </div>

          {/* Luggage Dropdown */}
          <div className="flex-1 flex flex-col gap-1 lg:gap-3" ref={luggageRef}>
            <label className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none">
              No Of Luggage
            </label>
            <div className="relative">
              <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2">
                <Image
                  src={LargeSeatIcon}
                  alt="Luggage Icon"
                  width={20}
                  height={20}
                />
              </div>
              <div
                onClick={() => handleDropdownToggle("luggage")}
                className="w-full px-8 lg:px-10 py-2 lg:py-3 xl:py-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue cursor-pointer flex items-center justify-between bg-white"
              >
                <span>{luggage === 0 ? "0" : luggage}</span>
                {openDropdown === "luggage" ? (
                  <ChevronUp
                    size={16}
                    className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                  />
                ) : (
                  <ChevronDown
                    size={16}
                    className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2"
                  />
                )}
              </div>

              {openDropdown === "luggage" && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto z-50 shadow-lg">
                  {Array.from({ length: 9 }, (_, i) => i).map((num) => (
                    <div
                      key={num}
                      onClick={() => handleLuggageSelect(num)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        luggage === num ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      {num === 0 ? "0 (No bags)" : num}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.luggage && (
              <p className="text-red-500 text-sm">{errors.luggage.message}</p>
            )}
          </div>
        </div>

        {/* One-way / Two-way */}
        <div className="flex flex-col items-start gap-2 my-2">
          <p className="text-lg lg:text-xl uppercase bebas-neue">Trip Type</p>
          <div className="flex gap-4 items-center">
            {tourType === "one-way" ? (
              <>
                <Image
                  src={OneWayActive}
                  alt="One Way Active"
                  className="cursor-pointer w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] 2xl:w-[40px] 2xl:h-[40px]"
                />
                <p className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none -ml-2">
                  one way
                </p>
              </>
            ) : (
              <>
                <Image
                  src={OneWayNotActive}
                  alt="One Way Not Active"
                  className="cursor-pointer w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] 2xl:w-[40px] 2xl:h-[40px]"
                  onClick={() => handleTourType("one-way")}
                />
                <p className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none -ml-2">
                  one way
                </p>
              </>
            )}
            {tourType === "two-way" ? (
              <>
                <Image
                  src={TwoWayActive}
                  alt="Two Way Active"
                  className="cursor-pointer w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] 2xl:w-[40px] 2xl:h-[40px]"
                />
                <p className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none -ml-2">
                  round trip
                </p>
              </>
            ) : (
              <>
                <Image
                  src={TwoWayNotActive}
                  alt="Two Way Not Active"
                  className="cursor-pointer w-[28px] h-[28px] lg:w-[34px] lg:h-[34px] 2xl:w-[40px] 2xl:h-[40px]"
                  onClick={() => handleTourType("two-way")}
                />
                <p className="text-lg lg:text-xl xl:text-2xl uppercase bebas-neue leading-none -ml-2">
                  round trip
                </p>
              </>
            )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue text-white text-md lg:text-xl font-semibold px-8 py-2 md:py-3 rounded-full w-full cursor-pointer"
        >
          Get Quote
        </button>
      </form>
    </div>
  );
}
