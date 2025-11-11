export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER_REQUEST_OTP: '/auth/request-otp',
  REGISTER_VERIFY_OTP: '/auth/verify-otp',
  REGISTER_COMPLETE: '/auth/Registration',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',

  ROOM_ADD: '/managementRoom/addRoom',
  ROOM_EDIT: (id: number) => `/managementRoom/editRoom/${id}`,
  ROOM_DELETE: (id: number) => `/managementRoom/deleteRoom/${id}`,
  ROOM_ALL: '/managementRoom/allRooms',
  ROOM_DETAIL: (id: number) => `/managementRoom/detailRoom/${id}`,

  FACILITY_ADD: '/managementFacility/addFacility',
  FACILITY_EDIT: (id: number) => `/managementFacility/editFacility/${id}`,
  FACILITY_DELETE: (id: number) => `/managementFacility/deleteFacility/${id}`,
  FACILITY_ALL: '/managementFacility/fasilitas',
  FACILITY_DETAIL: (id: number) => `/managementFacility/fasilitas/${id}`,
  
  FACILITY_ASSIGN: '/managementFacility/room/facility/assign',
  FACILITY_SYNC: '/managementFacility/room/facility/sync',
  FACILITY_REMOVE: '/managementFacility/room/facility/remove',

  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_RECENT_ROOMS: '/dashboard/recent-rooms?limit=3',
  DASHBOARD_RECENT_ACTIVITIES: '/dashboard/recent-activities?limit=5',
} as const;

export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'user_data';