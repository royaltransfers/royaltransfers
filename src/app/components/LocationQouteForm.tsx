"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Response } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LocationMark,
  LocationPin,
  PassengerIcon,
  LugageIconSVG,
  OneWayActive,
  OneWayNotActive,
  TwoWayActive,
  TwoWayNotActive,
} from "@/assets";
import Image from "next/image";
// import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getCurrentLocation } from "@/services/GetCurrentLocation";
import { getSuggestions } from "@/services/GetSuggestions";
import { getDistanceInfo } from "@/services/GetDistanceInfo";
import { showToast } from "@/utils/defaultToastOption";

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
    "passengers" | "luggage" | "pickup" | "arrival" | null
  >(null);
  const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<{
    pickup: boolean;
    arrival: boolean;
  }>({
    pickup: false,
    arrival: false,
  });

  const passengersRef = useRef<HTMLDivElement>(null);
  const luggageRef = useRef<HTMLDivElement>(null);
  const pickupRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();

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
  const pickupValue = watch("pickup");
  const arrivalValue = watch("arrival");

  const debouncedFetchSuggestions = useCallback(
    (input: string, type: "pickup" | "arrival") => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        // if (input.trim().length < 1) {
        //   if (type === "pickup") setPickupSuggestions([]);
        //   if (type === "arrival") setArrivalSuggestions([]);
        //   return;
        // }

        setLoadingSuggestions((prev) => ({ ...prev, [type]: true }));

        try {
          const response = await getSuggestions(input.trim());
          if (response.status && response.data?.suggestions) {
            if (type === "pickup") {
              setPickupSuggestions(response.data.suggestions);
            } else {
              setArrivalSuggestions(response.data.suggestions);
            }
          } else {
            if (type === "pickup") setPickupSuggestions([]);
            if (type === "arrival") setArrivalSuggestions([]);
          }
        } catch (error) {
          console.error(`Error fetching ${type} suggestions:`, error);
          if (type === "pickup") setPickupSuggestions([]);
          if (type === "arrival") setArrivalSuggestions([]);
        } finally {
          setLoadingSuggestions((prev) => ({ ...prev, [type]: false }));
        }
      }, 300);
    },
    []
  );

  // Effect to handle pickup suggestions
  useEffect(() => {
    if (pickupValue && openDropdown === "pickup") {
      debouncedFetchSuggestions(pickupValue, "pickup");
    } else {
      setPickupSuggestions([]);
    }
  }, [pickupValue, openDropdown, debouncedFetchSuggestions]);

  // Effect to handle arrival suggestions
  useEffect(() => {
    if (arrivalValue && openDropdown === "arrival") {
      debouncedFetchSuggestions(arrivalValue, "arrival");
    } else {
      setArrivalSuggestions([]);
    }
  }, [arrivalValue, openDropdown, debouncedFetchSuggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isInsideAnyRef = [
        passengersRef,
        luggageRef,
        pickupRef,
        arrivalRef,
      ].some((ref) => ref.current?.contains(event.target as Node));

      if (!isInsideAnyRef) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // const onSubmit = useCallback(
  //   async (data: LocationFormData) => {
  //     const params = new URLSearchParams(searchParams);

  //     try {
  //       const distanceResponse: Response<{
  //         distance: { distanceMeters: string; duration: string };
  //       }> = await getDistanceInfo(data.pickup, data.arrival);

  //       if (distanceResponse.status && distanceResponse.data.distance) {
  //         const distanceMeters = distanceResponse.data.distance.distanceMeters;
  //         params.set("distance", distanceMeters);
  //       } else {
  //         showToast(
  //           "error",
  //           distanceResponse?.message || "Failed to calculate distance."
  //         );
  //         return;
  //       }

  //       params.set("pickup", data.pickup);
  //       params.set("arrival", data.arrival);
  //       params.set("passengers", data.passengers.toString());
  //       params.set("luggage", data.luggage.toString());
  //       params.set("tourType", data.tourType);

  //       router.replace(`${pathname}?${params.toString()}`);
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //       showToast(
  //         "error",
  //         "Unexpected error occurred while calculating distance."
  //       );
  //     }
  //   },
  //   [searchParams, pathname, router]
  // );

  const onSubmit = useCallback(async (data: LocationFormData) => {
    try {
      const distanceResponse: Response<{
        distance: { distanceMeters: string; duration: string };
      }> = await getDistanceInfo(data.pickup, data.arrival);

      if (!distanceResponse.status || !distanceResponse.data.distance) {
        showToast(
          "error",
          distanceResponse?.message || "Failed to calculate distance."
        );
        return;
      }

      const message = `New Ride Request:%0A
Pickup: ${data.pickup}%0A
Arrival: ${data.arrival}%0A
Passengers: ${data.passengers}%0A
Luggage: ${data.luggage}%0A
Trip Type: ${data.tourType}`;

      const phoneNumber = "923134911933";

      // Open WhatsApp
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast(
        "error",
        "Unexpected error occurred while preparing WhatsApp message."
      );
    }
  }, []);

  const handleTourType = useCallback(
    (type: "one-way" | "two-way") => {
      setTourType(type);
      setValue("tourType", type);
    },
    [setValue]
  );

  const handleDropdownToggle = useCallback(
    (dropdown: "passengers" | "luggage" | "pickup" | "arrival") => {
      setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
    },
    []
  );

  const handlePassengerSelect = useCallback(
    (num: number) => {
      setValue("passengers", num);
      setOpenDropdown(null);
    },
    [setValue]
  );

  const handleLuggageSelect = useCallback(
    (num: number) => {
      setValue("luggage", num);
      setOpenDropdown(null);
    },
    [setValue]
  );

  const handleSuggestionSelect = useCallback(
    (suggestion: string, type: "pickup" | "arrival") => {
      setValue(type, suggestion);
      setOpenDropdown(null);
    },
    [setValue]
  );

  const handleCurrentLocation = useCallback(async () => {
    const response: Response<{ address: string }> = await getCurrentLocation();
    if (response.status) {
      setValue("pickup", response.data.address);
      showToast("success", "Location fetched successfully!");
    } else {
      showToast("error", response.message);
    }
  }, [setValue]);

  // Memoized passenger options
  const passengerOptions = useMemo(
    () => Array.from({ length: 8 }, (_, i) => i + 1),
    []
  );

  // Memoized luggage options
  const luggageOptions = useMemo(
    () => Array.from({ length: 9 }, (_, i) => i),
    []
  );

  return (
    <div className="lg:w-2/5 2xl:w-[35%] flex items-end justify-center h-full lg:pb-4 lg:[@media(min-height:800px)]:pb-8 xl:[@media(min-height:800px)]:pb-14">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full 2xl:w-11/12 px-4 py-6 xl:px-6 lg:py-8  lg:[@media(min-height:800px)]:py-8  bg-white z-10 rounded-2xl flex flex-col gap-3 [@media(minh-height:680px)]:gap-4 xl:[@media(min-height:800px)]:gap-6 poppins"
      >
        {/* Pickup */}
        <div
          className="flex flex-col gap-1 lg:gap-2 lg:[@media(min-height:800px)]:gap-3"
          ref={pickupRef}
        >
          <label className="text-lg lg:text-xl xl:text-xl xl:[@media(min-height:800px)]:text-2xl uppercase bebas-neue leading-none">
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
              onFocus={() => handleDropdownToggle("pickup")}
              className={`w-full px-8 py-2 lg:py-3 xl:[@media(min-height:800px)]:py-4 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.pickup
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue"
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Image
                src={LocationMark}
                alt="Location Mark"
                className="cursor-pointer"
                width={20}
                height={20}
                onClick={handleCurrentLocation}
              />
            </div>

            {/* Pickup Suggestions Dropdown */}
            {openDropdown === "pickup" && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto z-50 shadow-lg">
                {loadingSuggestions.pickup ? (
                  <div className="px-4 py-3 text-gray-500">
                    Loading suggestions...
                  </div>
                ) : pickupSuggestions.length > 0 ? (
                  pickupSuggestions.map((suggestion, index) => (
                    <div
                      key={`pickup-${index}`}
                      onClick={() =>
                        handleSuggestionSelect(suggestion, "pickup")
                      }
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                      {suggestion}
                    </div>
                  ))
                ) : pickupValue && pickupValue.length >= 2 ? (
                  <div className="px-4 py-3 text-gray-500">
                    No suggestions found
                  </div>
                ) : null}
              </div>
            )}
          </div>
          {errors.pickup && (
            <p className="text-red-500 text-sm">{errors.pickup.message}</p>
          )}
        </div>

        {/* Arrival */}
        <div
          className="flex flex-col gap-1 lg:gap-2 lg:[@media(min-height:800px)]:gap-3"
          ref={arrivalRef}
        >
          <label className="text-lg lg:text-xl xl:text-xl xl:[@media(min-height:800px)]:text-2xl uppercase bebas-neue leading-none">
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
              onFocus={() => handleDropdownToggle("arrival")}
              className={`w-full px-8 py-2 lg:py-3 xl:[@media(min-height:800px)]:py-4 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.arrival
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue"
              }`}
            />

            {/* Arrival Suggestions Dropdown */}
            {openDropdown === "arrival" && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto z-50 shadow-lg">
                {loadingSuggestions.arrival ? (
                  <div className="px-4 py-3 text-gray-500">
                    Loading suggestions...
                  </div>
                ) : arrivalSuggestions.length > 0 ? (
                  arrivalSuggestions.map((suggestion, index) => (
                    <div
                      key={`arrival-${index}`}
                      onClick={() =>
                        handleSuggestionSelect(suggestion, "arrival")
                      }
                      className="px-4 py-3 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    >
                      {suggestion}
                    </div>
                  ))
                ) : arrivalValue && arrivalValue.length >= 2 ? (
                  <div className="px-4 py-3 text-gray-500">
                    No suggestions found
                  </div>
                ) : null}
              </div>
            )}
          </div>
          {errors.arrival && (
            <p className="text-red-500 text-sm">{errors.arrival.message}</p>
          )}
        </div>

        <div className="flex gap-5 justify-between">
          {/* Passengers Dropdown */}
          <div
            className="flex-1 flex flex-col gap-1 lg:gap-2 lg:[@media(min-height:800px)]:gap-3"
            ref={passengersRef}
          >
            <label className="text-lg lg:text-xl xl:text-xl xl:[@media(min-height:800px)]:text-2xl uppercase bebas-neue leading-none">
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
                className="w-full px-8 lg:px-10 py-2 lg:py-3 xl:[@media(min-height:800px)]:py-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue cursor-pointer flex items-center justify-between bg-white"
              >
                <span>{String(passengers).padStart(2, "0")}</span>
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
                  {passengerOptions.map((num) => (
                    <div
                      key={num}
                      onClick={() => handlePassengerSelect(num)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        passengers === num ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      {String(num).padStart(2, "0")}
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
          <div
            className="flex-1 flex flex-col gap-1 lg:gap-2 lg:[@media(min-height:800px)]:gap-3"
            ref={luggageRef}
          >
            <label className="text-lg lg:text-xl xl:text-xl xl:[@media(min-height:800px)]:text-2xl uppercase bebas-neue leading-none">
              No Of Luggage
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Image
                  src={LugageIconSVG}
                  alt="Luggage Icon"
                  width={20}
                  height={20}
                />
              </div>
              <div
                onClick={() => handleDropdownToggle("luggage")}
                className="w-full px-8 lg:px-10 py-2 lg:py-3 xl:[@media(min-height:800px)]:py-4 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue cursor-pointer flex items-center justify-between bg-white"
              >
                <span>{luggage === 0 ? "None" : luggage}</span>
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
                  {luggageOptions.map((num) => (
                    <div
                      key={num}
                      onClick={() => handleLuggageSelect(num)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        luggage === num ? "bg-blue-50 text-blue-600" : ""
                      }`}
                    >
                      {num === 0 ? "0  (No bags)" : num}
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
        <div className="flex flex-col items-start gap-1 [@media(minh-height:680px)]:gap-2   my-0 [@media(minh-height:680px)]:my-2 lg:my-1 lg:[@media(min-height:800px)]:my-2">
          <p className="text-lg lg:text-xl uppercase bebas-neue">Trip Type</p>
          <div className="flex gap-4 items-center">
            {tourType === "one-way" ? (
              <>
                <Image
                  src={OneWayActive}
                  alt="One Way Active"
                  className="cursor-pointer w-[28px] h-[28px] lg:w-[34px] lg:h-[34px]"
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
                  className="cursor-pointer w-[28px] h-[28px] lg:w-[34px] lg:h-[34px]"
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
                  className="cursor-pointer w-[28px] h-[28px] lg:w-[34px] lg:h-[34px]"
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
                  className="cursor-pointer w-[28px] h-[28px] lg:w-[34px] lg:h-[34px]"
                  onClick={() => handleTourType("two-way")}
                />
                <p className="text-lg lg:text-xml xl:text-2xl uppercase bebas-neue leading-none -ml-2">
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
