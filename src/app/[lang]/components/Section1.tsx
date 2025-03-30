import Image from "next/image";
import React from "react";

export default function Section1() {
  return (
    <>
      <div>
        <div className="text-center max-w-[80%] mx-auto font-bold uppercase mt-2">
          <h1 className="text-2xl">pernah tak hadapi situasi di mana </h1>
          <h1 className="text-2xl text-red-600 underline">
            kotoran degil melekat pada fabrik{" "}
            <span className="text-black no-underline">?</span>
          </h1>
        </div>
        <div>
          <Image
            src="/images/store/lady.png"
            alt="lady image"
            width={500}
            height={500}
            sizes="(max-width: 768px) 90vw, 500px" // Responsive optimization
            quality={80} // Improves performance by reducing file size
            className=" h-auto mt-2 object-contain"
          />
        </div>
        <div className=" bg-black mt-3 max-w-[100%] text-center text-white p-2">
          <h1 className="px-3 py-3 text-xl font-semibold ">
            Rendam, gosok, tapi tetap tak bersih sepenuhnya. Akhirnya, perabot
            nampak kusam dan tak menarik lagi.
          </h1>
        </div>
        <div>
          <Image
            src={"/images/store/ladysofa.png"}
            alt="lady sofa image"
            width={520}
            height={500}
            sizes="(max-width: 790px) 100vw, 520px" // Responsive optimization
            quality={80} // Improves performance by reducing file size
            className=" h-auto object-contain"
          />
        </div>
        <div className="max-w-[95%] mx-auto mt-3 text-center  p-2">
          <h1 className="px-3 py-3 text-xl font-bold ">
            Bayangkan anda sedang bersiap untuk tetamu datang, tapi sofa penuh
            dengan kesan kotoran
          </h1>
        </div>
        <div>
          <div className="bg-black text-white px-2 py-3 ">
            <h1 className="font-bold text-2xl text-center">
              MempperKenalkan <br />{" "}
              <span className="underline uppercase py-4 text-yellow-200">
                Fabric Cleaner
              </span>{" "}
              <br />
              adalah penyelesaian mudah dan cepat untuk anda!
            </h1>
          </div>
          <div>
            <Image
              src={"/images/store/cleaning.png"}
              alt="fabric cleaner image"
              width={500}
              height={500}
              sizes="(max-width: 500px) 90vw, 300px" // Responsive optimization
              quality={80} // Improves performance by reducing file size
              className="h-auto object-contain mx-auto"
            />
          </div>
        </div>
        <div className="bg-black text-white text-2xl ">
          <h1 className="uppercase text-center font-bold max-w-[80%] mx-auto py-3">
            jom tengok macam mana ia bergungis
          </h1>
        </div>
        <div className="py-2">
          <iframe
            width="560"
            height="310"
            src="https://www.youtube.com/embed/ufaQuuuvqyw?si=1VUYX4dceegrtoQt"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="max-w-[100%] h-[240px] mx-auto "
            loading="lazy"
          />
        </div>
        <div className="bg-black text-white text-2xl  py-2">
          <h1 className="text-center font-bold  max-w-[80%]  uppercase mx-auto">
            Ramai dah cuba dan berpuas hat!
          </h1>
        </div>
        <div>
          <h1 className="text-center font-bold text-3xl uppercase bg-black text-white py-7 border-t-8 border-gray-400">
            Testimoni pelanggan
          </h1>
          <div className="relative w-full h-[350px]">
            <Image
              src="/images/store/reviews.png"
              alt="reviews image"
              fill // Automatically resizes inside parent div
              sizes="(max-width: 500px) 90vw, 300px"
              quality={80}
            />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-3xl text-center py-2 max-w-[85%] leading-relaxed mx-auto">
            Terima kasih atas sokongan luar biasa anda!
          </h1>
        </div>
        <div className="relative w-full h-[350px]">
          <Image
            src="/images/store/parcel.png"
            alt="reviews image"
            fill // Automatically resizes inside parent div
            sizes="(max-width: 500px) 90vw, 300px"
            loading="lazy"
          />
        </div>
        <div>
          <h1 className="font-extrabold text-3xl text-center py-2 max-w-[85%] leading-relaxed mx-auto">
            <div>
              <h1 className="font-extrabold text-2xl text-center py-2 leading-relaxed mx-auto">
                berpuluh-puluh parcel keluar untuk <br />
                penghantaran ke seluruh Malaysia!
              </h1>
            </div>{" "}
          </h1>
        </div>
        <div className="bg-black text-white text-2xl  py-2">
          <h1 className="text-center font-bold  max-w-[80%] leading-relaxed  uppercase mx-auto">
            potongan harga dan pakej berbalo!
          </h1>
        </div>
        <div className="relative w-full h-[400px]">
          <Image
            src="/images/store/offer.png"
            alt="reviews image"
            fill // Automatically resizes inside parent div
            sizes="(max-width: 500px) 90vw, 300px"
            loading="lazy"
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="mt-2">
            <h1
              className="bg-red-600 text-white text-center font-semibold px-1.5 py-5 text-lg w-fit uppercase 
                 border-8 border-black 
                 border-t-gray-600 00 border-l-gray-600"
            >
              1 UNIT
            </h1>
          </div>
          <div className="mt-2">
            <div
              className="bg-black text-white text-center font-semibold px-2 text-lg w-fit uppercase 
                 border-8 border-gray-500 
                 border-t-gray-400 border-l-gray-400 cursor-pointer "
            >
              <p>harga asal: rm60</p>
              <h1 className="text-4xl font-extrabold">RM29&nbsp;!</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
