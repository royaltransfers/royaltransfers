"use client";
import {
  BirminghamImage,
  CentralLondonImage,
  GreaterManchesterImage,
  HeathrowImage,
  MinltonKeynesImage,
  OxfordImage,
  ReadingImage,
} from "@/assets";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination } from "swiper/modules";
import Image from "next/image";

const SLIDER_DATA = [
  {
    title: "oxford",
    image: OxfordImage,
  },
  {
    title: "central london",
    image: CentralLondonImage,
  },
  {
    title: "Greater Manchester",
    image: GreaterManchesterImage,
  },
  {
    title: "Heathrow",
    image: HeathrowImage,
  },
  {
    title: "Birmingham",
    image: BirminghamImage,
  },
  {
    title: "reading",
    image: ReadingImage,
  },
  {
    title: "milton keynes",
    image: MinltonKeynesImage,
  },
];

export default function MultipleLocationSection() {
  return (
    <section id="cities" className="scroll-mt-20 py-20 poppins">
      <div className=" flex flex-col justify-between items-center gap-20 px-3 md:px-0 md:w-11/12 xl:w-10/12 mx-auto">
        <div className="flex flex-col gap-6 justify-center items-center text-center">
          <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px] bebas-neue text-black uppercase leading-none">
            Serving <span className="text-yellow">Multiple Localities</span>
          </h2>
          <p className="text-md md:text-lg text-gray">
            Royal Transfers proudly serves towns, villages, and cities
            throughout the UK.
          </p>
        </div>

        <div className="overflow-hidden w-full">
          <Swiper
            spaceBetween={24}
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            mousewheel={{ forceToAxis: true }}
            modules={[Autoplay, Pagination, Mousewheel]}
            className="w-full px-6"
          >
            {SLIDER_DATA.map((data, index) => (
              <SwiperSlide
                key={index}
                className="!w-[300px] md:!w-[400px] lg:!w-[500px] flex-shrink-0"
              >
                <div className="h-[240px] md:h-[270px] lg:h-[310px] rounded-2xl bg-[#F3F3F3] flex items-end justify-center">
                  <div className="flex flex-col gap-2 mb-2">
                    <h3 className="text-black text-2xl lg:text-3xl font-semibold uppercase bebas-neue leading-none ml-4">
                      {data.title}
                    </h3>
                    <div className="w-[270px] md:w-[360px] lg:w-[460px] h-[140px] md:h-[170px] lg:h-[200px] relative mb-4">
                      <Image
                        src={data.image}
                        alt={data.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
