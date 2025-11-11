export interface DashboardStats {
  totalKamar: number;
  kamarTersedia: number;
  kamarTerisi: number;
  kamarMaintenance: number;
  totalPenyewa: number;
  totalFasilitas: number;
  occupancyRate: number;
  pendapatanBulanIni: number;
  totalPendapatan: number;
}

export interface RecentRoom {
  id: number;
  nomer_kamar: string;
  harga: string;
  status: 'tersedia' | 'terisi';
  created_at: string;
  owner: string | null;
}

export interface RecentActivity {
  id: string;
  type: string;
  aksi: string;
  waktu: string;
  icon: string;
}

export interface GetDashboardStatsResponse {
  status_code: number;
  massage: string;
  datas: {
    stats: DashboardStats;
  };
}

export interface GetRecentRoomsResponse {
  status_code: number;
  massage: string;
  datas: {
    kamar: RecentRoom[];
  };
}

// Response /dashboard/recent-activities
// Asumsi respons activities juga punya wrapper, berdasarkan 2 respons lainnya
export interface GetRecentActivitiesResponse {
  status_code: number;
  massage: string;
  datas: {
    activities: RecentActivity[];
  };
}