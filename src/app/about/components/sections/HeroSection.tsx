"use client";

import { AboutBg } from "@/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "@/app/components/NavBar";

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      if (!hero) return;
      const heroBottom = hero.getBoundingClientRect().bottom;
      setScrolled(heroBottom <= 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero-section" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          className="w-full h-2/3 object-cover"
          src={AboutBg}
          alt="hero background"
        />
        <div className="absolute inset-0 bg-hero-gradient"></div>
      </div>

      {/* Content and Navbar */}
      <div id="hero-section" className="relative z-10 h-full flex flex-col">
        <NavBar scrolled={scrolled} />

        {/* Centered Content */}
        <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
          <div className="bg-white p-4 md:p-12 max-w-7xl mx-auto rounded-xl">
            <div className="flex flex-col items-center justify-center text-center gap-6 w-full lg:w-2/3 mx-auto">
              <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px] bebas-neue text-black uppercase leading-none">
                ABOUT <span className="text-yellow">ROYAL TRANSFERS</span>
              </h2>
              <p className="text-md md:text-lg text-gray w-full">
                We provide reliable executive car services tailored to the
                unique needs of corporate and individual clients in London.
                Whether for airport transfers, comfortable journeys, or business
                meetings, our fleet and chauffeurs offer top-tier service with
                meticulous attention to detail. Trust us to deliver a premium
                travel experience in the vibrant city.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
