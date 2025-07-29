import {
  EconomyCar,
  EstateCar,
  ExecutiveCar,
  MiniBusCar,
  MpvCar,
} from "@/assets";
import CarTypesCard from "../CarTpesCard";

const CAR_TYPES = [
  {
    type: "ECONOMY",
    star: 4,
    carImage: EconomyCar,
    noOfPassengers: 3,
    noOfLargeSeats: 2,
    noOfSmallSeats: 1,
  },
  {
    type: "ESTATE",
    star: 5,
    carImage: EstateCar,
    noOfPassengers: 4,
    noOfLargeSeats: 4,
    noOfSmallSeats: 0,
  },
  {
    type: "EXECUTIVE",
    star: 5,
    carImage: ExecutiveCar,
    noOfPassengers: 3,
    noOfLargeSeats: 2,
    noOfSmallSeats: 2,
  },
  {
    type: "MPV",
    star: 5,
    carImage: MpvCar,
    noOfPassengers: 5,
    noOfLargeSeats: 3,
    noOfSmallSeats: 2,
  },
  {
    type: "MINIBUS",
    star: 5,
    carImage: MiniBusCar,
    noOfPassengers: 8,
    noOfLargeSeats: 8,
    noOfSmallSeats: 0,
  },
];

export default function CarTypesSection() {
  return (
    <section
      id="car-types"
      className="scroll-mt-20 py-20 mb-10 bg-[#F9F9F9] poppins"
    >
      <div className="h-9/12 flex flex-col justify-between items-center gap-5 px-3 md:px-0 md:w-11/12 xl:w-10/12 mx-auto">
        <div className="hidden lg:flex items-start lg:gap-3 xl:gap-5 w-full h-2/3">
          <div className="flex-1 flex flex-col gap-6 ">
            <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px] uppercase bebas-neue leading-none text-black ">
              Car Types <span className="text-yellow">Available </span>
            </h2>
            <p className="text-sm md:text-lg text-gray w-11/12">
              Various car types available for rides include economy, Estate,
              Executive, MVP and Minibus, catering to different passenger needs
              and preferences. These options ensure comfort, affordability, and
              style for all travelers.
            </p>
          </div>
          {CAR_TYPES.slice(0, 2).map((option, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col item-end h-full w-full"
            >
              <div className="flex-1/3"></div>
              <CarTypesCard
                type={option.type}
                star={option.star}
                carImage={option.carImage}
                noOfPassengers={option.noOfPassengers}
                noOfLargeSeats={option.noOfLargeSeats}
                noOfSmallSeats={option.noOfSmallSeats}
              />
            </div>
          ))}
        </div>
        <div className="hidden lg:flex  items-center lg:gap-3 xl:gap-5 w-full">
          {CAR_TYPES.slice(2).map((option, index) => (
            <CarTypesCard
              key={index}
              type={option.type}
              star={option.star}
              carImage={option.carImage}
              noOfPassengers={option.noOfPassengers}
              noOfLargeSeats={option.noOfLargeSeats}
              noOfSmallSeats={option.noOfSmallSeats}
            />
          ))}
        </div>
        <div className="flex-1 flex lg:hidden flex-col gap-6 ">
          <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px] uppercase bebas-neue leading-none text-black ">
            Car Types <span className="text-yellow">Available </span>
          </h2>
          <p className="text-md md:text-lg text-gray w-11/12">
            Various car types available for rides include economy, Estate,
            Executive, MVP and Minibus, catering to different passenger needs
            and preferences. These options ensure comfort, affordability, and
            style for all travelers.
          </p>
        </div>
        <div className=" grid lg:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6 md:gap-3 xl:gap-5 w-full">
          {CAR_TYPES.map((option, index) => (
            <CarTypesCard
              key={index}
              type={option.type}
              star={option.star}
              carImage={option.carImage}
              noOfPassengers={option.noOfPassengers}
              noOfLargeSeats={option.noOfLargeSeats}
              noOfSmallSeats={option.noOfSmallSeats}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
