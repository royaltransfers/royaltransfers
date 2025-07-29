"use client";
import { useState } from "react";
import { MinusIcon, PlusIcon } from "@/assets";
import Image from "next/image";

const TERMS = [
  {
    title: "Acceptance of Terms",
    description:
      "By accessing and using the website, you agree to comply with all applicable laws and these Terms. If you are using the website on behalf of a company or organization, you represent that you have the authority to bind such entity to these Terms.",
  },
  {
    title: "Registration and Account Security",
    description: `
      <ul>
        <li>You may need to create an account to access certain features.</li>
        <li>You agree to provide accurate, current, and complete information during registration.</li>
        <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</li>
      </ul>`,
  },
  {
    title: "Services Offered",
    description: `
      <ul>
        <li>Our platform connects riders with drivers for transportation services.</li>
        <li>Availability of rides is subject to geographic location, demand, and other factors.</li>
        <li>We do not guarantee ride availability or specific service quality.</li>
      </ul>`,
  },
  {
    title: "Payment and Fees",
    description: `
      <ul>
        <li>Fare estimates are provided but may vary based on actual conditions.</li>
        <li>Payments are processed through the platform using accepted payment methods.</li>
        <li>You agree to pay all applicable fees for services rendered.</li>
      </ul>`,
  },
  {
    title: "Cancellations and Refunds",
    description: `
      <ul>
        <li>Cancellation policies and fees are detailed within the platform.</li>
        <li>Refunds, if applicable, will be processed according to our refund policy.</li>
      </ul>`,
  },
  {
    title: "Liability and Disclaimers",
    description: `
      <ul>
        <li>We are not responsible for the conduct of drivers or riders.</li>
        <li>Use of the service is at your own risk; we do not guarantee safety or reliability.</li>
        <li>To the maximum extent permitted by law, we disclaim all warranties and liabilities.</li>
      </ul>`,
  },
];

export default function TermsConditionSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="terms-and-condition" className="scroll-mt-20 py-20  poppins">
      <div className="flex flex-col gap-5 px-3 md:px-0 md:w-11/12 xl:w-10/12 mx-auto">
        <div className="flex items-start lg:gap-3 xl:gap-5 w-full">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-4xl md:text-[44px] xl:text-[52px] 2xl:text-[64px] uppercase bebas-neue leading-none text-black">
              Terms & <span className="text-yellow">conditions</span>
            </h2>
            <p className="text-md md:text-lg text-gray lg:w-1/2 xl:w-2/5">
              Terms and Conditions for the ride website outline user
              responsibilities and service limitations to ensure safe and fair
              usage. Please review and agree before booking rides.
            </p>
          </div>
        </div>

        <div className="flex w-11/12 2xl:w-10/12 3xl:w-9/12 5xl:w-3/5  mx-auto flex-col lg:flex-row gap-5 xl:gap-5 items-start justify-between mt-10">
          <div className="flex flex-col gap-5 w-full  md:w-[500px] xl:w-[550px] 2xl:w-[600px]">
            {TERMS.filter((_, index) => index % 2 === 0).map(
              (term, originalIndex) => {
                const actualIndex = originalIndex * 2;
                return (
                  <div
                    key={actualIndex}
                    className="bg-[#F9F9F9] px-4 py-5 cursor-pointer rounded-2xl transition-all duration-300 self-start"
                    onClick={() => toggle(actualIndex)}
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className={`bebas-neue leading-none text-3xl transition-colors ${
                          openIndex === actualIndex
                            ? "text-yellow"
                            : "text-black"
                        }`}
                      >
                        {term.title}
                      </h3>
                      <div className="flex items-center">
                        <Image
                          src={openIndex === actualIndex ? MinusIcon : PlusIcon}
                          width={14}
                          height={4}
                          alt="toggle-icon"
                        />
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === actualIndex
                          ? "max-h-96 mt-3"
                          : "max-h-0 mt-0"
                      }`}
                    >
                      <div
                        className="prose text-gray poppins"
                        dangerouslySetInnerHTML={{ __html: term.description }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <div className="flex flex-col gap-5 w-full md:w-[500px] xl:w-[550px] 2xl:w-[600px]">
            {TERMS.filter((_, index) => index % 2 === 1).map(
              (term, originalIndex) => {
                const actualIndex = originalIndex * 2 + 1;
                return (
                  <div
                    key={actualIndex}
                    className="bg-[#F9F9F9] px-4 py-5 cursor-pointer rounded-2xl transition-all duration-300 self-start"
                    onClick={() => toggle(actualIndex)}
                  >
                    <div className="flex justify-between items-center">
                      <h3
                        className={`bebas-neue leading-none text-3xl transition-colors ${
                          openIndex === actualIndex
                            ? "text-yellow"
                            : "text-black"
                        }`}
                      >
                        {term.title}
                      </h3>
                      <div className="flex items-center">
                        <Image
                          src={openIndex === actualIndex ? MinusIcon : PlusIcon}
                          width={14}
                          height={4}
                          alt="toggle-icon"
                        />
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openIndex === actualIndex
                          ? "max-h-96 mt-3"
                          : "max-h-0 mt-0"
                      }`}
                    >
                      <div
                        className="prose text-gray poppins"
                        dangerouslySetInnerHTML={{ __html: term.description }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
