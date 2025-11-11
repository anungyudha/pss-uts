"use client";

import { useEffect } from "react";
import { useDashboard } from "../lib/hooks/useDashboard";
import type { RecentRoom, RecentActivity } from "../lib/types/dashboard";
import {
  Home,
  BarChart2,
  Users,
  DollarSign,
  Check,
  User,
} from "lucide-react";

const ActivityIcon = ({ iconName }: { iconName: string }) => {
  const iconWrapperClasses =
    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center";
  const iconClasses = "w-4 h-4";

  switch (iconName) {
    case "user":
      return (
        <div className={`${iconWrapperClasses} bg-purple-100`}>
          <User className={`${iconClasses} text-purple-600`} />
        </div>
      );
    case "home":
      return (
        <div className={`${iconWrapperClasses} bg-blue-100`}>
          <Home className={`${iconClasses} text-blue-600`} />
        </div>
      );
    case "check":
      return (
        <div className={`${iconWrapperClasses} bg-green-100`}>
          <Check className={`${iconClasses} text-green-600`} />
        </div>
      );
    default:
      return (
        <div className={`${iconWrapperClasses} bg-gray-100`}>
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
        </div>
      );
  }
};

export default function DashboardPage() {
  const {
    stats,
    recentRooms,
    recentActivities,
    loading,
    error,
    fetchStats,
    fetchRecentRooms,
    fetchRecentActivities,
  } = useDashboard();

  useEffect(() => {
    fetchStats();
    fetchRecentRooms();
    fetchRecentActivities();
  }, []);

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (isNaN(numericPrice)) {
      return "Harga tidak valid";
    }
    
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(numericPrice);
  };

  const occupancyRate = stats?.occupancyRate || 0;

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-500 animate-pulse">Memuat dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Dashboard Admin</h1>
        <p className="text-indigo-100">
          Selamat datang kembali! Berikut ringkasan sistem kost Anda hari ini.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Kamar */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Kamar</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats?.totalKamar || 0}
              </p>
            </div>
            {/* 4. Ikon Ditempatkan */}
            <div className="bg-blue-100 rounded-full p-3">
              <Home className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex gap-2 text-xs">
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
              {stats?.kamarTersedia || 0} Tersedia
            </span>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
              {stats?.kamarTerisi || 0} Terisi
            </span>
          </div>
        </div>

        {/* Tingkat Hunian */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Tingkat Hunian
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {occupancyRate}%
              </p>
            </div>
            {/* 4. Ikon Ditempatkan */}
            <div className="bg-green-100 rounded-full p-3">
              <BarChart2 className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Total Penyewa */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Penyewa</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats?.totalPenyewa || 0}
              </p>
            </div>
            {/* 4. Ikon Ditempatkan */}
            <div className="bg-purple-100 rounded-full p-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Penyewa aktif yang sedang menghuni
          </p>
        </div>

        {/* Pendapatan Bulan Ini (Dikembalikan) */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">
                Pendapatan Bulan Ini
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {formatPrice(stats?.pendapatanBulanIni || 0)}
              </p>
            </div>
            {/* 4. Ikon Ditempatkan */}
            <div className="bg-yellow-100 rounded-full p-3">
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
           <p className="text-xs text-gray-500 mt-4">
            Total pendapatan bulan ini
          </p>
        </div>
      </div>

      {/* Kamar Terbaru & Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kamar Terbaru */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Kamar Terbaru
          </h2>
          <div className="space-y-3">
            {(recentRooms || []).length > 0 ? (
              (recentRooms || []).slice(0, 5).map((kamar: RecentRoom) => (
                <div
                  key={kamar.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-100 rounded-lg p-3">
                      <Home className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Kamar {kamar.nomer_kamar}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(kamar.harga)}/bulan
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      kamar.status === "tersedia"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {kamar.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Belum ada data kamar terbaru.
              </p>
            )}
          </div>
        </div>

        {/* Aktivitas Terkini */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Aktivitas Terkini
          </h2>
          <div className="space-y-4">
            {(recentActivities || []).length > 0 ? (
              // 5. Batasi list (slice)
              (recentActivities || []).slice(0, 5).map((a: RecentActivity) => (
                <div key={a.id} className="flex items-center gap-3">
                  {/* 4. Ikon Dinamis Ditempatkan */}
                  <ActivityIcon iconName={a.icon} />
                  <div>
                    <p className="text-sm text-gray-800">{a.aksi}</p>
                    <p className="text-xs text-gray-500 mt-1">{a.waktu}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                Belum ada aktivitas terbaru.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}