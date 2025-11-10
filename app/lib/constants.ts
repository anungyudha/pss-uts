export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER_REQUEST_OTP: '/auth/request-otp',
  REGISTER_VERIFY_OTP: '/auth/verify-otp',
  REGISTER_COMPLETE: '/auth/Registration',
  ME: '/auth/me',
  LOGOUT: '/auth/logout',
} as const;

export const TOKEN_KEY = 'auth_token';
export const USER_KEY = 'user_data';