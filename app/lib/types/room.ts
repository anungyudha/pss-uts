// Tambahkan interface untuk Fasilitas
export interface Fasilitas {
  id: number;
  nama_fasilitas: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

// Update interface Room
export interface Room {
  id: number;
  owner_id: string | null;
  nomer_kamar: string;
  harga: string | number;
  deskripsi: string | null;
  status: 'tersedia' | 'terisi';
  created_at: string;
  updated_at: string;
  owner?: any | null;
  fasilitas?: Fasilitas[]; // Tambahkan ini
}

// Add room request
export interface AddRoomRequest {
  noKamar: string;
  harga: number;
}

export interface AddRoomResponse {
  status_code: number;
  massage: string;
  datas: {
    kamar: {
      status: string;
      id: number;
      nomer_kamar: string;
      harga: number;
      updated_at: string;
      created_at: string;
    };
  };
}

// Edit room request
export interface EditRoomRequest {
  ownerUUID?: string | null;
  noKamar?: string;
  harga?: number;
  deskripsi?: string;
  status?: 'tersedia' | 'terisi';
}

export interface EditRoomResponse {
  status_code: number;
  massage: string;
  datas: {
    kamar: Room;
  };
}

// Delete room response
export interface DeleteRoomResponse {
  status_code: number;
  massage: string;
}

// Get all rooms params
export interface GetAllRoomsParams {
  status?: 'tersedia' | 'terisi';
  minHarga?: number;
  maxHarga?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetAllRoomsResponse {
  status_code: number;
  massage: string;
  datas: {
    kamar: Room[];
    pagination?: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

// Get room detail response
export interface GetRoomDetailResponse {
  status_code: number;
  massage: string;
  datas: {
    kamar: Room;
  };
}