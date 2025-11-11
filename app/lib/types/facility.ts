// Fasilitas data structure
export interface Fasilitas {
  id: number;
  nama_fasilitas: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

// Add facility request (FormData)
export interface AddFacilityRequest {
  namaFasilitas: string;
  iconFile: File;
}

export interface AddFacilityResponse {
  status_code: number;
  massage: string;
  datas: {
    fasilitas: Fasilitas;
  };
}

// Edit facility request (FormData)
export interface EditFacilityRequest {
  namaFasilitas?: string;
  iconFile?: File;
}

export interface EditFacilityResponse {
  status_code: number;
  massage: string;
  datas: {
    fasilitas: Fasilitas;
  };
}

// Delete facility response
export interface DeleteFacilityResponse {
  status_code: number;
  massage: string;
}

// Get all facilities response
export interface GetAllFacilitiesResponse {
  status_code: number;
  massage: string;
  datas: {
    fasilitas: Fasilitas[];
  };
}

// Get facility by ID response
export interface GetFacilityDetailResponse {
  status_code: number;
  massage: string;
  datas: {
    fasilitas: Fasilitas;
  };
}

// Facility to Room requests
export interface AssignFacilityToRoomRequest {
  kamarId: string | number;
  fasilitasId: number[];
}

export interface SyncFacilityToRoomRequest {
  kamarId: string | number;
  fasilitasId: number[];
}

export interface RemoveFacilityFromRoomRequest {
  kamarId: string | number;
  fasilitasId: number[];
}

export interface FacilityToRoomResponse {
  status_code: number;
  massage: string;
  datas?: any;
}