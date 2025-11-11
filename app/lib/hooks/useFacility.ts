import { useState } from 'react';
import { facilityApi } from '../api/facility';
import type {
  Fasilitas,
  AddFacilityRequest,
  EditFacilityRequest,
  AssignFacilityToRoomRequest,
  SyncFacilityToRoomRequest,
  RemoveFacilityFromRoomRequest,
} from '../types/facility';

export const useFacility = () => {
  const [facilities, setFacilities] = useState<Fasilitas[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Fasilitas | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all facilities
  const fetchFacilities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await facilityApi.getAllFacilities();
      setFacilities(response.datas.fasilitas);
      return { success: true, data: response.datas.fasilitas };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal memuat data fasilitas';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Fetch facility detail
  const fetchFacilityDetail = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await facilityApi.getFacilityDetail(id);
      setSelectedFacility(response.datas.fasilitas);
      return { success: true, data: response.datas.fasilitas };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal memuat detail fasilitas';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Add new facility
  const addFacility = async (data: AddFacilityRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await facilityApi.addFacility(data);
      await fetchFacilities(); // Refresh list
      return { success: true, data: response.datas.fasilitas };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal menambahkan fasilitas';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Edit facility
  const editFacility = async (id: number, data: EditFacilityRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await facilityApi.editFacility(id, data);
      await fetchFacilities(); // Refresh list
      return { success: true, data: response.datas.fasilitas };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal mengubah fasilitas';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete facility
  const deleteFacility = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await facilityApi.deleteFacility(id);
      await fetchFacilities(); // Refresh list
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal menghapus fasilitas';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // === FACILITY TO ROOM FUNCTIONS ===

  // Assign facilities to room
  const assignFacilityToRoom = async (data: AssignFacilityToRoomRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await facilityApi.assignFacilityToRoom(data);
      return { success: true, data: response.datas };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal menambahkan fasilitas ke kamar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Sync facilities to room (replace all)
  const syncFacilityToRoom = async (data: SyncFacilityToRoomRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await facilityApi.syncFacilityToRoom(data);
      return { success: true, data: response.datas };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal memperbarui fasilitas kamar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Remove facilities from room
  const removeFacilityFromRoom = async (data: RemoveFacilityFromRoomRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await facilityApi.removeFacilityFromRoom(data);
      return { success: true, data: response.datas };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal menghapus fasilitas dari kamar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    facilities,
    selectedFacility,
    loading,
    error,
    fetchFacilities,
    fetchFacilityDetail,
    addFacility,
    editFacility,
    deleteFacility,
    assignFacilityToRoom,
    syncFacilityToRoom,
    removeFacilityFromRoom,
    setSelectedFacility,
  };
};