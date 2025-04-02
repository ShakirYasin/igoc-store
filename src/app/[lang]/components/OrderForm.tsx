"use client";
import { Eye } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CProgress, CProgressBar } from "@coreui/react";

type FormData = {
  "Nama Penuh": string;
  "Nombar Phone": string;
  Poskod: string;
  Alamat: string;
  Negeri: string;
  Bandar: string;
  Title: string;
  Quantity:
    | "(1 PCS) RM29 + RM10 COD - RM39"
    | "(2 PCS) RM39 + RM10 COD - RM49"
    | "(3 PCS) RM49 + RM10 COD - RM59";
};

export default function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-[#1f1f1f] mt-4 p-3">
      <div className="py-3 w-4/5 mx-auto text-center text-white">
        <h1 className="underline text-2xl shadow-md font-bold uppercase">
          untuk membuat pesanan
        </h1>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 px-3 py-4 bg-white text-black"
        >
          {/* Nama Penuh */}
          <div>
            <input
              type="text"
              placeholder="Nama Penuh"
              className="w-full px-2 py-3 border border-gray-400 placeholder-black"
              {...register("Nama Penuh", {
                required: "Nama Penuh is required",
                maxLength: {
                  value: 30,
                  message: "Nama Penuh should be less than 30 characters",
                },
              })}
            />
            {errors["Nama Penuh"] && (
              <span className="text-red-500">
                {errors["Nama Penuh"]?.message}
              </span>
            )}
          </div>

          <div className="flex gap-2 ">
            {/* Nombar Phone */}
            <div className="flex-2">
              <input
                type="tel"
                placeholder="Nombar Phone"
                className="w-full px-2 py-3 border border-gray-400  placeholder-black"
                {...register("Nombar Phone", {
                  required: "Nombar Phone is required",
                  minLength: {
                    value: 6,
                    message: "Nombar Phone should be at least 6 digits",
                  },
                  maxLength: {
                    value: 100,
                    message: "Nombar Phone should be less than 100 characters",
                  },
                })}
              />
              {errors["Nombar Phone"] && (
                <span className="text-red-500">
                  {errors["Nombar Phone"]?.message}
                </span>
              )}
            </div>

            {/* Poskod */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Poskod"
                className="w-full px-2 py-3 border border-gray-400  placeholder-black"
                {...register("Poskod", {
                  required: "Poskod is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Poskod must be a number",
                  },
                  maxLength: {
                    value: 5,
                    message: "Poskod should be less than 6 characters",
                  },
                })}
              />
              {errors["Poskod"] && (
                <span className="text-red-500">
                  {errors["Poskod"]?.message}
                </span>
              )}
            </div>
          </div>

          {/* Alamat */}
          <div>
            <input
              type="text"
              placeholder="Alamat"
              className="w-full px-2 py-3 border border-gray-400  placeholder-black"
              {...register("Alamat", {
                required: "Alamat is required",
                maxLength: {
                  value: 100,
                  message: "Alamat should be less than 100 characters",
                },
              })}
            />
            {errors["Alamat"] && (
              <span className="text-red-500">{errors["Alamat"]?.message}</span>
            )}
          </div>

          <div className="flex gap-2 bg-white border border-gray-400 px-2 py-3">
            {/* Negeri */}
            <div>
              <select
                className="w-full focus:outline-none"
                {...register("Negeri", { required: "Negeri is required" })}
              >
                <option value="">Negeri</option>
                <option value="">Pilih Negeri</option>
                <option value="Johor">Johor</option>
                <option value="Kedah">Kedah</option>
                <option value="Kelantan">Kelantan</option>
                <option value="Melaka">Melaka</option>
                <option value="Negeri Sembilan">Negeri Sembilan</option>
                <option value="Pahang">Pahang</option>
                <option value="Perak">Perak</option>
                <option value="Perlis">Perlis</option>
                <option value="Pulau Pinang">Pulau Pinang (Penang)</option>
                <option value="Sabah">Sabah</option>
                <option value="Sarawak">Sarawak</option>
                <option value="Selangor">Selangor</option>
                <option value="Terengganu">Terengganu</option>
                <option value="Kuala Lumpur">Kuala Lumpur</option>
                <option value="Labuan">Labuan</option>
                <option value="Putrajaya">Putrajaya</option>
              </select>
              {errors["Negeri"] && (
                <span className="text-red-500">
                  {errors["Negeri"]?.message}
                </span>
              )}
            </div>

            {/* Bandar */}
            <div>
              <select
                className="w-full focus:outline-none"
                {...register("Bandar", { required: "Bandar is required" })}
              >
                <option value="">Bandar</option>
                <option value="Kuala Lumpur">Kuala Lumpur</option>
                <option value="George Town">George Town</option>
                <option value="Johor Bahru">Johor Bahru</option>
                <option value="Ipoh">Ipoh</option>
                <option value="Melaka">Melaka</option>
                <option value="Shah Alam">Shah Alam</option>
                <option value="Kota Kinabalu">Kota Kinabalu</option>
                <option value="Kuching">Kuching</option>
                <option value="Alor Setar">Alor Setar</option>
                <option value="Seremban">Seremban</option>
                <option value="Sibu">Sibu</option>
                <option value="Miri">Miri</option>
                <option value="Petaling Jaya">Petaling Jaya</option>
                <option value="Subang Jaya">Subang Jaya</option>
                <option value="Tawau">Tawau</option>
                <option value="Sandakan">Sandakan</option>
                <option value="Bintulu">Bintulu</option>
                <option value="Batu Pahat">Batu Pahat</option>
                <option value="Taiping">Taiping</option>
                <option value="Port Klang">Port Klang</option>
                <option value="Puchong">Puchong</option>
                <option value="Bukit Mertajam">Bukit Mertajam</option>
                <option value="Kota Bharu">Kota Bharu</option>
                <option value="Segamat">Segamat</option>
                <option value="Bangi">Bangi</option>
                <option value="Kulim">Kulim</option>
                <option value="Sungai Petani">Sungai Petani</option>
                <option value="Bentong">Bentong</option>
              </select>
              {errors["Bandar"] && (
                <span className="text-red-500">
                  {errors["Bandar"]?.message}
                </span>
              )}
            </div>
          </div>

          {/*  quantity */}
          <div className="flex gap-2 flex-col text-black">
            <label className="flex items-center gap-1">
              <input
                {...register("Quantity", {
                  required: "Please select a quantity",
                })}
                type="radio"
                value="(1 PCS) RM29 + RM10 COD - RM39"
              />
              <span>(1 PCS) RM29 + RM10 COD - RM39</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                {...register("Quantity", {
                  required: "Please select a quantity",
                })}
                type="radio"
                value="(2 PCS) RM39 + RM10 COD - RM49"
              />
              <span>(2 PCS) RM39 + RM10 COD - RM49</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                {...register("Quantity", {
                  required: "Please select a quantity",
                })}
                type="radio"
                value="(3 PCS) RM49 + RM10 COD - RM59"
              />
              <span>(3 PCS) RM49 + RM10 COD - RM59</span>
            </label>
            {errors["Quantity"] && (
              <span className="text-red-500">
                {errors["Quantity"]?.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <input
              type="submit"
              value="Beli sekarang"
              className="bg-[#ff0101]/90 uppercase text-white p-2 font-semibold rounded cursor-pointer hover:bg-[#ff0101] w-full"
            />
          </div>
        </form>
        <div className="flex justify-center items-center gap-2 text-center mt-4">
          <Eye className="text-green-500" size={20} />
          <h1 className="text-white text-sm flex items-center ">
            terdapat &nbsp; <span className="text-md text-yellow-300">209</span>
            &nbsp; orang yang melihat produk ini
          </h1>
        </div>
        <div></div>
      </div>
    </div>
  );
}
