import apiClient from './axios';
import { API_ENDPOINTS } from '../constants';
import type {
  AddRoomRequest,
  AddRoomResponse,
  EditRoomRequest,
  EditRoomResponse,
  DeleteRoomResponse,
  GetAllRoomsParams,
  GetAllRoomsResponse,
  GetRoomDetailResponse,
} from '../types/room';

export const roomApi = {
  // Add new room
  addRoom: async (data: AddRoomRequest): Promise<AddRoomResponse> => {
    const response = await apiClient.post<AddRoomResponse>(
      API_ENDPOINTS.ROOM_ADD,
      data
    );
    return response.data;
  },

  // Edit room
  editRoom: async (id: number, data: EditRoomRequest): Promise<EditRoomResponse> => {
    const response = await apiClient.patch<EditRoomResponse>(
      API_ENDPOINTS.ROOM_EDIT(id),
      data
    );
    return response.data;
  },

  // Delete room
  deleteRoom: async (id: number): Promise<DeleteRoomResponse> => {
    const response = await apiClient.delete<DeleteRoomResponse>(
      API_ENDPOINTS.ROOM_DELETE(id)
    );
    return response.data;
  },

  // Get all rooms with filters
  getAllRooms: async (params?: GetAllRoomsParams): Promise<GetAllRoomsResponse> => {
    const response = await apiClient.get<GetAllRoomsResponse>(
      API_ENDPOINTS.ROOM_ALL,
      { params }
    );
    return response.data;
  },

  // Get room detail
  getRoomDetail: async (id: number): Promise<GetRoomDetailResponse> => {
    const response = await apiClient.get<GetRoomDetailResponse>(
      API_ENDPOINTS.ROOM_DETAIL(id)
    );
    return response.data;
  },
};