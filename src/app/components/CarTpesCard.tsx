import { StaticImageData } from "next/image";
import { StarRating } from "./StarRating";
import Image from "next/image";
import { LargeSeatIcon, PassengerIcon, SmallSeatIcon } from "@/assets";

interface CarTypesCardProps {
  type: string;
  star: number;
  carImage: StaticImageData;
  noOfPassengers: number;
  noOfLargeSeats: number;
  noOfSmallSeats: number;
}
export default function CarTypesCard({ ...props }: CarTypesCardProps) {
  return (
    <div className="w-full  bg-white px-3 xl:px-5 py-6 flex gap-6 md:gap-0 2xl:gap-6 justify-center md:justify-between rounded-xl text-black">
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl xl:text-[40px] bebas-neue leading-none ">
          {props.type}
        </h3>
        <StarRating rating={props.star} />
        <Image
          src={props.carImage}
          alt={`${props.carImage}-image`}
          className="w-32 h-32  md:w-52 md:h-52 lg:w-40 lg:h-40 xl:w-52 xl:h-52 object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 be-vietnam-pro">
        <div className="flex gap-1">
          <Image
            src={PassengerIcon}
            alt="Passenger Icon"
            width={20}
            height={20}
          />
          <span className="text-[#283543] whitespace-nowrap">
            {props.noOfPassengers} Passengers
          </span>
        </div>
        <div className="flex gap-1">
          <Image
            src={LargeSeatIcon}
            alt="Large Seat Icon"
            width={20}
            height={20}
          />
          <span className="text-[#283543] whitespace-nowrap">
            {props.noOfLargeSeats} Large
          </span>
        </div>
        <div className="flex gap-1">
          <Image
            src={SmallSeatIcon}
            alt="Small Seat Icon"
            width={20}
            height={20}
          />
          <span className="text-[#283543] whitespace-nowrap">
            {props.noOfSmallSeats} Small
          </span>
        </div>
      </div>
    </div>
  );
}
