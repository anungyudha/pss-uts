export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status_code: number;
  massage: string;
  datas: {
    username: string;
    email: string;
    token: string;
  };
}

export interface UserData {
  uuid: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  image_url: string;
}

export interface MeResponse {
  status_code: number;
  massage: string;
  datas: UserData;
}

export interface RegisterRequestOTPRequest {
  email: string;
}

export interface RegisterVerifyOTPRequest {
  email: string;
  otp: string;
}

export interface RegisterCompleteRequest {
  email: string;
  username: string;
  password: string;
  confPassword: string;
}

export interface ApiResponse<T = any> {
  status_code: number;
  massage: string;
  datas?: T;
}