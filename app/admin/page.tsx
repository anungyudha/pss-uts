"use client";

import { StatCard } from "../components/StatCard";
import { DataTable } from "../components/DataTable";

export default function AdminPage() {
  return (
    <div className="p-9 ml-16 bg-white-100 min-h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
             Add Content
          </button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-black">
             Settings
          </button>
          <input
            type="text"
            placeholder="Search content..."
            className="border rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Sales" value="$2,456" icon="🛍" />
        <StatCard label="Total Expenses" value="$3,326" icon="🏪" />
        <StatCard label="Total Visitors" value="5,325" icon="👥" />
        <StatCard label="Total Orders" value="1,326" icon="📦" />
      </div>

      {/* Form Section */}
      <div className="bg-[#97A87A] rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-2">Form title</h2>
        <p className="text-gray-500 mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, quis?
        </p>

        <div className="bg-red-50 border border-red-300 text-red-700 p-3 rounded mb-6">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos, velit.
        </div>

        <DataTable />
      </div>
    </div>
  );
}
