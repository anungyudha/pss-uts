"use client";

import { StatCard } from "../components/StatCard";
import AdminLayout from "./layout";

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-black">Dashboard</h1>
        <div className=""></div>
      </div>

      <div className="bg-[#97A87A] rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold mb-2">Data Dashboard</h2>
        hello world
      </div>
    </AdminLayout>
  );
}
