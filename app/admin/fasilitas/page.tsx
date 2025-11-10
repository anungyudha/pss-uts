"use client";

import AdminLayout from "../layout";
import { DataTableFasilitas } from "../../components/DataTableFasilitas";

export default function FasilitasPage() {
  return (
    <AdminLayout>
      <div className="bg-white-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">Daftar Kamar</h1>
          <div className=""></div>
        </div>

        {/* Table Section */}
        <div className="bg-[#97A87A] rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-2">Data Kamar</h2>
          <p className="text-gray-500 mb-4">
            Berikut daftar kamar yang tersedia di kost kamu.
          </p>

          <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded mb-6">
            Informasi: Pastikan semua data kamar sudah terisi dengan benar.
          </div>

          <DataTableFasilitas />
        </div>
      </div>
    </AdminLayout>
  );
}
