"use client";

import { StaticImageData } from "next/image";
import { StarRating } from "./StarRating";
import Image from "next/image";
import {
  LargeSeatIcon,
  OneWayActive,
  OneWayNotActive,
  TwoWayActive,
  TwoWayNotActive,
  PassengerIcon,
  SmallSeatIcon,
} from "@/assets";
import { useState } from "react";

interface RideOptionCardProps {
  type: string;
  star: number;
  carImage: StaticImageData;
  noOfPassengers: number;
  noOfLargeSeats: number;
  noOfSmallSeats: number;
  oneWayPrice: number;
  roundTripPrice: number;
}
export default function RideOptionCard(props: RideOptionCardProps) {
  const [tourType, setTourType] = useState<"one-way" | "two-way">("one-way");

  return (
    <div className="w-full bg-[#F8F8F8] px-5 lg:px-3 xl:px-5 py-7 md:pb-0 xl:pb-0 xl:pt-10 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-2 2xl:gap-10 justify-between rounded-xl">
      <div className="flex flex-col gap-2">
        <div className="flex  justify-between">
          <div className="felx flex-col gap-2">
            <h3 className="text-3xl xl:text-[40px] bebas-neue leading-none text-black">
              {props.type}
            </h3>
            <StarRating rating={props.star} />
          </div>
          <div className="flex md:hidden flex-col items-center md:items-end gap-8">
            <div className=" flex flex-col gap-2 items-center justify-center">
              <p className="text-2xl uppercase bebas-neue leading-none text-black">
                Trip type
              </p>
              <div className="flex gap-2 items-center justify-center">
                {tourType === "one-way" ? (
                  <Image
                    src={OneWayActive}
                    alt="One Way Active Icon"
                    width={34}
                    height={34}
                    className="cursor-pointer"
                  />
                ) : (
                  <Image
                    src={OneWayNotActive}
                    alt="One Way Not Active Icon"
                    width={34}
                    height={34}
                    className="cursor-pointer"
                    onClick={() => setTourType("one-way")}
                  />
                )}
                {tourType === "two-way" ? (
                  <Image
                    src={TwoWayActive}
                    alt="Two Way Active Icon"
                    width={34}
                    height={34}
                    className="cursor-pointer"
                  />
                ) : (
                  <Image
                    src={TwoWayNotActive}
                    alt="Two Way Not Active Icon"
                    width={34}
                    height={34}
                    className="cursor-pointer"
                    onClick={() => setTourType("two-way")}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <Image
          src={props.carImage}
          alt={`${props.carImage}-image`}
          className="w-52 h-52 lg:w-40 lg:h-40 xl:w-52 xl:h-52 object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 be-vietnam-pro text-black">
        <div className="flex gap-1">
          <Image
            src={PassengerIcon}
            alt="Passenger Icon"
            width={24}
            height={24}
          />
          <span className="text-[#283543] whitespace-nowrap">
            {props.noOfPassengers} Passengers
          </span>
        </div>
        <div className="flex gap-1">
          <Image
            src={LargeSeatIcon}
            alt="Large Seat Icon"
            width={24}
            height={24}
          />
          <span className="text-[#283543] whitespace-nowrap">
            {props.noOfLargeSeats} Large
          </span>
        </div>
        <div className="flex gap-1">
          <Image
            src={SmallSeatIcon}
            alt="Small Seat Icon"
            width={24}
            height={24}
          />
          <span className="text-[#283543] whitespace-nowrap">
            {props.noOfSmallSeats} Small
          </span>
        </div>
      </div>
      <div className="flex  flex-col items-center md:items-end gap-4 md:gap-8">
        <div className="hidden md:flex flex-row lg:flex-col xl:flex-row  gap-3 items-center justify-center">
          <p className="text-3xl lg:text-2xl xl:text-2xl uppercase bebas-neue leading-none text-black">
            Trip type
          </p>
          <div className="flex gap-3 items-center justify-center">
            {tourType === "one-way" ? (
              <Image
                src={OneWayActive}
                alt="One Way Active Icon"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src={OneWayNotActive}
                alt="One Way Not Active Icon"
                width={40}
                height={40}
                className="cursor-pointer"
                onClick={() => setTourType("one-way")}
              />
            )}
            {tourType === "two-way" ? (
              <Image
                src={TwoWayActive}
                alt="Two Way Active Icon"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            ) : (
              <Image
                src={TwoWayNotActive}
                alt="Two Way Not Active Icon"
                width={40}
                height={40}
                className="cursor-pointer"
                onClick={() => setTourType("two-way")}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-1 be-vietnam-pro text-black text-end w-[max-content]">
          <p className="text-xl lg:text-lg xl:text-xl font-semibold whitespace-nowrap">
            {tourType === "one-way"
              ? "Total One way Price"
              : "Total Two way Price"}
          </p>
          <p className="text-xl lg:text-xl xl:text-2xl font-semibold">
            ${" "}
            {tourType === "one-way" ? props.oneWayPrice : props.roundTripPrice}
            .00
          </p>
        </div>

        <button className="bg-blue text-white font-semibold px-8 lg:px-5 xl:px-8 py-3 rounded-full w-fit cursor-pointer poppins ">
          Confirm Ride
        </button>
      </div>
    </div>
  );
}
