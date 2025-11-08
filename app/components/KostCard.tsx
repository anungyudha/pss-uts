"use client";

import { useState, FC } from "react";

interface KostData {
  id: string;
  name: string;
  price: number;
  location: string;
  type: "Putra" | "Putri" | "Campur";
  facilities: string[];
  imageUrl: string;
  isBooked: boolean;
}

interface KostCardProps {
  kost: KostData;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

const KostCard: FC<KostCardProps> = ({ kost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, price, location, type, facilities, imageUrl, isBooked } = kost;

  return (
    <>
      {/* Kartu Kost */}
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={`Foto ${name}`}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://placehold.co/600x400/DAD7CD/000000?text=Foto+Tidak+Tersedia";
            }}
          />

          {isBooked && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Penuh
            </span>
          )}
          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-md ${
              type === "Putra"
                ? "bg-blue-500 text-white"
                : type === "Putri"
                ? "bg-pink-500 text-white"
                : "bg-yellow-500 text-gray-800"
            }`}
          >
            {type}
          </span>
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 truncate mb-1">
            {name}
          </h3>
          <p className="text-sm font-semibold text-gray-500 mb-3 flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM12 11a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            {location}
          </p>

          <p className="text-2xl font-extrabold text-[#97A87A] mb-4">
            {formatPrice(price)}
            <span className="text-base font-normal text-gray-600">
              {" "}
              / bulan
            </span>
          </p>

          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase">
              Fasilitas Utama:
            </h4>
            <div className="flex flex-wrap gap-2">
              {facilities.slice(0, 3).map((fac, index) => (
                <span
                  key={index}
                  className="text-xs font-medium bg-[#DAD7CD] text-gray-700 px-3 py-1 rounded-full"
                >
                  {fac}
                </span>
              ))}
              {facilities.length > 3 && (
                <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
                  +{facilities.length - 3} lainnya
                </span>
              )}
            </div>
          </div>

          {/* Tombol Lihat Detail (Buka Modal) */}
          <button
            onClick={() => setIsOpen(true)}
            className="block w-full text-center bg-[#97A87A] text-white py-3 rounded-lg font-semibold hover:bg-[#7D8F5C] transition duration-300 transform hover:scale-[1.01] shadow-md"
          >
            Lihat Detail
          </button>
        </div>
      </div>

      {/* Modal Detail Kost */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl"
            >
              ×
            </button>

            <img
              src={imageUrl}
              alt={name}
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />

            <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
            <p className="text-gray-500 mb-3">{location}</p>

            <p className="text-[#97A87A] font-bold text-xl mb-4">
              {formatPrice(price)}{" "}
              <span className="text-sm text-gray-600">/ bulan</span>
            </p>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Fasilitas:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {facilities.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            {isBooked ? (
              <p className="text-red-500 font-semibold mb-3">Status: Penuh</p>
            ) : (
              <p className="text-green-600 font-semibold mb-3">
                Status: Tersedia
              </p>
            )}

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full bg-[#97A87A] text-white py-2 rounded-lg font-semibold hover:bg-[#7D8F5C] transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default KostCard;
