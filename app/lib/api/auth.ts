import apiClient from './axios';
import { API_ENDPOINTS } from '../constants';
import type {
  LoginRequest,
  LoginResponse,
  MeResponse,
  RegisterRequestOTPRequest,
  RegisterVerifyOTPRequest,
  RegisterCompleteRequest,
  ApiResponse,
} from '../types/auth';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.LOGIN, data);
    return response.data;
  },

  me: async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>(API_ENDPOINTS.ME);
    return response.data;
  },

  requestOTP: async (data: RegisterRequestOTPRequest): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
      API_ENDPOINTS.REGISTER_REQUEST_OTP,
      data
    );
    return response.data;
  },

  verifyOTP: async (data: RegisterVerifyOTPRequest): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
      API_ENDPOINTS.REGISTER_VERIFY_OTP,
      data
    );
    return response.data;
  },

  completeRegistration: async (data: RegisterCompleteRequest): Promise<ApiResponse> => {
    const response = await apiClient.post<ApiResponse>(
      API_ENDPOINTS.REGISTER_COMPLETE,
      data
    );
    return response.data;
  },
};