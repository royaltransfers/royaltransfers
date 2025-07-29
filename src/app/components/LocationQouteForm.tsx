"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocationMark, LocationPin } from "@/assets";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const locationSchema = z.object({
  pickup: z.string().min(1, "Pickup location is required."),
  arrival: z.string().min(1, "Arrival location is required."),
});

type LocationFormData = z.infer<typeof locationSchema>;

export default function LocationQuoteForm() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
  });

  const onSubmit = (data: LocationFormData) => {
    const params = new URLSearchParams(searchParams);
    params.set("pickup", data.pickup);
    params.set("arrival", data.arrival);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="lg:w-2/5 2xl:w-[35%] flex items-end justify-center h-full lg:pb-8 xl:pb-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full 2xl:w-11/12  px-4 py-6 xl:px-8 lg:py-14 bg-white z-10 rounded-2xl flex flex-col gap-4 xl:gap-6 poppins"
      >
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
              name="pickup"
              type="text"
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

        {/* Arrival Field */}
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
              name="arrival"
              type="text"
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
