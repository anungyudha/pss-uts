import { useState } from 'react';
import { roomApi } from '../api/room';
import type {
  Room,
  AddRoomRequest,
  EditRoomRequest,
  GetAllRoomsParams,
} from '../types/room';

export const useRoom = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all rooms
  const fetchRooms = async (params?: GetAllRoomsParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await roomApi.getAllRooms(params);
      
      setRooms(response.datas.kamar);
      return { success: true, data: response.datas };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal memuat data kamar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Fetch room detail
  const fetchRoomDetail = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await roomApi.getRoomDetail(id);
      setSelectedRoom(response.datas.kamar);
      return { success: true, data: response.datas.kamar };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal memuat detail kamar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Add new room
  const addRoom = async (data: AddRoomRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await roomApi.addRoom(data);
      // Refresh rooms list after adding
      await fetchRooms();
      return { success: true, data: response.datas.kamar };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal menambahkan kamar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Edit room
  const editRoom = async (id: number, data: EditRoomRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await roomApi.editRoom(id, data);
      // Refresh rooms list after editing
      await fetchRooms();
      return { success: true, data: response.datas.kamar };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal mengubah kamar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Delete room
  const deleteRoom = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await roomApi.deleteRoom(id);
      // Refresh rooms list after deleting
      await fetchRooms();
      return { success: true };
    } catch (err: any) {
      const errorMsg = err.response?.data?.massage || 'Gagal menghapus kamar';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    rooms,
    selectedRoom,
    loading,
    error,
    fetchRooms,
    fetchRoomDetail,
    addRoom,
    editRoom,
    deleteRoom,
    setSelectedRoom,
  };
};