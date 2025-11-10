"use client";

import { DataTableFasilitas } from "../components/DataTableFasilitas";

export default function FasilitasPage() {
  return (
    <div className="p-9 ml-16 bg-white-100 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-black">Fasilitas</h1>
            <div className="">
            </div>
          </div>
    
          {/* Table Section */}
          <div className="bg-[#97A87A] rounded-xl p-6 shadow">
            <h2 className="text-lg font-semibold mb-2">Data Fasilitas</h2>

            {/* Reuse komponen DataTable dari dashboard */}
            <DataTableFasilitas />
          </div>
        </div>
  );
}
