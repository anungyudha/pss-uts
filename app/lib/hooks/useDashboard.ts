import { useState } from 'react';
import { dashboardApi } from '../api/dashboard'; // Sesuaikan path jika perlu
import type {
  DashboardStats,
  RecentRoom,
  RecentActivity,
} from '../types/dashboard'; // Sesuaikan path jika perlu

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentRooms, setRecentRooms] = useState<RecentRoom[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.getStats();
      setStats(response.datas.stats);
      return { success: true, data: response.datas.stats };
    } catch (err: any) {
      const msg = err.response?.data?.massage || 'Gagal memuat statistik'; // <-- Dikembalikan ke 'massage'
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.getRecentRooms();
      setRecentRooms(response.datas.kamar); // <-- Diubah dari 'rooms' ke 'kamar'
      return { success: true, data: response.datas.kamar }; // <-- Diubah dari 'rooms' ke 'kamar'
    } catch (err: any) {
      const msg = err.response?.data?.massage || 'Gagal memuat kamar terbaru'; // <-- Dikembalikan ke 'massage'
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.getRecentActivities();
      // Asumsi key dari API adalah 'activities'
      setRecentActivities(response.datas.activities); 
      return { success: true, data: response.datas.activities };
    } catch (err: any) {
      const msg = err.response?.data?.massage || 'Gagal memuat aktivitas terbaru'; // <-- Dikembalikan ke 'massage'
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    recentRooms,
    recentActivities,
    loading,
    error,
    fetchStats,
    fetchRecentRooms,
    fetchRecentActivities,
  };
};