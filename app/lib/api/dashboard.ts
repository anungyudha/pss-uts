import apiClient from './axios';
import { API_ENDPOINTS } from '../constants';
import type {
  GetDashboardStatsResponse,
  GetRecentRoomsResponse,
  GetRecentActivitiesResponse,
} from '../types/dashboard';

export const dashboardApi = {
  // GET /dashboard/stats
  getStats: async (): Promise<GetDashboardStatsResponse> => {
    const response = await apiClient.get<GetDashboardStatsResponse>(
      API_ENDPOINTS.DASHBOARD_STATS
    );
    return response.data;
  },

  // GET /dashboard/recent-rooms
  getRecentRooms: async (): Promise<GetRecentRoomsResponse> => {
    const response = await apiClient.get<GetRecentRoomsResponse>(
      API_ENDPOINTS.DASHBOARD_RECENT_ROOMS
    );
    return response.data;
  },

  // GET /dashboard/recent-activities
  getRecentActivities: async (): Promise<GetRecentActivitiesResponse> => {
    const response = await apiClient.get<GetRecentActivitiesResponse>(
      API_ENDPOINTS.DASHBOARD_RECENT_ACTIVITIES
    );
    return response.data;
  },
};
