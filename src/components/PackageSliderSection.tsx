import { localizedData } from "@/constants/locales";
import { localizeObject } from "@/utils/site.utils";
import { Package } from "graphql/generated/hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// interface Package {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// }

// const packages:  = [
//   {
//     id: 1,
//     name: "PAKEJ TRIAL",
//     price: 59,
//     image: "/images/packej-image.png",
//     description: "1 Botol 500ML",
//   },
//   {
//     id: 2,
//     name: "PAKEJ COMBO",
//     price: 79,
//     image: "/images/packej-image.png",
//     description: "2 BOTOL 500ML + GLOVE",
//   },
//   {
//     id: 3,
//     name: "PAKEJ COMBO",
//     price: 79,
//     image: "/images/packej-image.png",
//     description: "2 BOTOL 500ML + GLOVE",
//   },
//   {
//     id: 4,
//     name: "PAKEJ COMBO",
//     price: 79,
//     image: "/images/packej-image.png",
//     description: "2 BOTOL 500ML + GLOVE",
//   },
//   {
//     id: 5,
//     name: "PAKEJ COMBO",
//     price: 79,
//     image: "/images/packej-image.png",
//     description: "2 BOTOL 500ML + GLOVE",
//   },
//   // Add more packages as needed
// ];

const PackageSliderSection: React.FC<{
  packages: Package[];
  color: string;
}> = ({ packages, color }) => {
  const swiperRef = useRef<SwiperType>();
  const params = useParams();
  const lang = params.lang as string;

  return (
    <div
      className="px-10 md:px-0 md:pb-32 pb-10 py-20"
      style={{ backgroundColor: color ? color : "white" }}
    >
      <div className="max-w-[1276px] mx-auto  ">
        <h2 className="text-3xl md:text-6xl font-bold mb-10">
          {
            localizeObject(localizedData.metadata.packageSlider, lang)
              .heading as string
          }
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            className="relative"
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {packages &&
              packages?.map((pkg, index) => (
                <SwiperSlide key={index}>
                  <div className="border-[#D9D9D9] md:max-h-[800px] max-h-[500px] flex flex-col items-center justify-center border bg-white rounded-lg p-6">
                    <Image
                      src={pkg.image as string}
                      alt={pkg.name as string}
                      width={526}
                      height={526}
                      className=" rounded-t-lg"
                    />
                    <div className="p-4 text-center">
                      <h3 className="text-3xl md:text-6xl font-bold ">
                        {pkg.name as string}
                      </h3>
                      <p className="text-[#1E282A] text-xl md:text-2xl font-normal mt-3 mb-3 line-through">
                        {pkg.description as string}
                      </p>
                      <p className="text-3xl md:text-6xl font-bold ">
                        RM{pkg.price}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageSliderSection;
