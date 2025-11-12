"use client";

import { DataTable } from "../../components/DataTable";

export default function KamarPage() {
  return (
    <div className="bg-[#97A87A] ">
      {/* Table Section */}
      <div className="bg-[#97A87A] rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Kamar</h2>
          <p className="text-gray-600">
            Berikut daftar semua kamar yang tersedia di kost Anda
          </p>
        </div>

        <div className="bg-[#DAD7CD] border border-[#DAD7CD] text-blue-700 p-4 rounded-lg mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">Informasi Penting</p>
            <p className="text-sm mt-1">
              Pastikan semua data kamar sudah terisi dengan benar. Data akan otomatis tersimpan ke database.
            </p>
          </div>
        </div>

        <DataTable />
      </div>
    </div>
  );
}