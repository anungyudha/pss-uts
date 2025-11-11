import apiClient from './axios';
import { API_ENDPOINTS } from '../constants';
import type {
  AddFacilityRequest,
  AddFacilityResponse,
  EditFacilityRequest,
  EditFacilityResponse,
  DeleteFacilityResponse,
  GetAllFacilitiesResponse,
  GetFacilityDetailResponse,
  AssignFacilityToRoomRequest,
  SyncFacilityToRoomRequest,
  RemoveFacilityFromRoomRequest,
  FacilityToRoomResponse,
} from '../types/facility';

export const facilityApi = {
  // Add new facility (with file upload)
  addFacility: async (data: AddFacilityRequest): Promise<AddFacilityResponse> => {
    const formData = new FormData();
    formData.append('namaFasilitas', data.namaFasilitas);
    formData.append('iconFile', data.iconFile);

    const response = await apiClient.post<AddFacilityResponse>(
      API_ENDPOINTS.FACILITY_ADD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Edit facility (with optional file upload)
  editFacility: async (
    id: number,
    data: EditFacilityRequest
  ): Promise<EditFacilityResponse> => {
    const formData = new FormData();
    
    if (data.namaFasilitas) {
      formData.append('namaFasilitas', data.namaFasilitas);
    }
    
    if (data.iconFile) {
      formData.append('iconFile', data.iconFile);
    }

    const response = await apiClient.patch<EditFacilityResponse>(
      API_ENDPOINTS.FACILITY_EDIT(id),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  // Delete facility
  deleteFacility: async (id: number): Promise<DeleteFacilityResponse> => {
    const response = await apiClient.delete<DeleteFacilityResponse>(
      API_ENDPOINTS.FACILITY_DELETE(id)
    );
    return response.data;
  },

  // Get all facilities
  getAllFacilities: async (): Promise<GetAllFacilitiesResponse> => {
    const response = await apiClient.get<GetAllFacilitiesResponse>(
      API_ENDPOINTS.FACILITY_ALL
    );
    return response.data;
  },

  // Get facility detail by ID
  getFacilityDetail: async (id: number): Promise<GetFacilityDetailResponse> => {
    const response = await apiClient.get<GetFacilityDetailResponse>(
      API_ENDPOINTS.FACILITY_DETAIL(id)
    );
    return response.data;
  },

  // === FACILITY TO ROOM ENDPOINTS ===

  // Assign facilities to room (add)
  assignFacilityToRoom: async (
    data: AssignFacilityToRoomRequest
  ): Promise<FacilityToRoomResponse> => {
    const response = await apiClient.post<FacilityToRoomResponse>(
      API_ENDPOINTS.FACILITY_ASSIGN,
      data
    );
    return response.data;
  },

  // Sync facilities to room (replace all)
  syncFacilityToRoom: async (
    data: SyncFacilityToRoomRequest
  ): Promise<FacilityToRoomResponse> => {
    const response = await apiClient.put<FacilityToRoomResponse>(
      API_ENDPOINTS.FACILITY_SYNC,
      data
    );
    return response.data;
  },

  // Remove facilities from room
  removeFacilityFromRoom: async (
    data: RemoveFacilityFromRoomRequest
  ): Promise<FacilityToRoomResponse> => {
    const response = await apiClient.delete<FacilityToRoomResponse>(
      API_ENDPOINTS.FACILITY_REMOVE,
      { data }
    );
    return response.data;
  },
};