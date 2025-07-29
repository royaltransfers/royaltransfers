import {
  FacebookIcon,
  InstagramIcon,
  Logo,
  PhoneVector,
  MailVector,
  LocationVector,
  TikTokIcon,
} from "@/assets";
import Image from "next/image";
import EmailBox from "../EmailBox";
import Link from "next/link";

const CONTACT_DETAILS = [
  { image: PhoneVector, text: "+44 20 8004 9990" },
  {
    image: MailVector,
    text: "info@royaltransfers.co.uk",
  },
  {
    image: LocationVector,
    text: "450 Bath Road Heathrow Longford UB7 0EB",
  },
];

const SOCIAL_ICONS = [
  { icon: FacebookIcon, link: "https://www.facebook.com/royaltransfersuk/" },
  { icon: InstagramIcon, link: "https://www.instagram.com/royal_transfersuk/" },
  { icon: TikTokIcon, link: "https://www.tiktok.com/@royaltransfersuk" },
];
export default function FooterSection() {
  return (
    <footer className="bg-blue h-[800px] md:h-[700px]   text-white flex flex-col justify-center">
      <div className="h-11/12 px-3 md:px-0 md:w-11/12 xl:w-10/12 mx-auto flex flex-col justify-between items-center ">
        <div className=" flex flex-col  items-center gap-12">
          <Link href="/" className="cursor-pointer">
            <Image
              src={Logo}
              alt="Royal Transfer Logo"
              width={150}
              height={60}
            />
          </Link>
          <h2 className="text-4xl md:text-[44px] lg:text-[52px] 2xl:text-[64px] bebas-neue text-white uppercase leading-none text-center">
            Your Journey Begins with Royal Transfers
          </h2>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between gap-10">
          <div className="flex flex-col gap-8 order-1">
            <p className="bebas-neue leading-none text-3xl lg:text-4xl text-yellow uppercase">
              Contact Details
            </p>
            <div className="flex flex-col gap-6 poppins">
              {CONTACT_DETAILS.map((detail, index) => (
                <div key={index} className="flex gap-3">
                  <Image
                    src={detail.image}
                    alt="Contact Icon"
                    width={24}
                    height={24}
                  />
                  <p className="text-md lg:text-lg 4xl:text-2xl ">
                    {detail.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="h-4/5 lg:h-full flex xl:hidden  flex-col justify-between gap-8 order-2 ">
            <div className="flex flex-col gap-4 items-center md:items-end justify-center poppins">
              <EmailBox />
              <div className="flex justify-end gap-3">
                {SOCIAL_ICONS.map((icon, index) => (
                  <a
                    key={index}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={icon.icon}
                      alt={icon.icon}
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden xl:flex flex-col gap-4 items-end justify-center poppins order-3">
            <EmailBox />
            <div className="flex gap-3">
              {SOCIAL_ICONS.map((icon, index) => (
                <a
                  key={index}
                  href={icon.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={icon.icon}
                    alt={icon.icon}
                    className="w-4 h-4 md:w-6 md:h-6"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm lg:text-md 4xl:text-xl text-center md:text-start poppins">
          Copyright © 2025 Go Royal Transfers - All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
