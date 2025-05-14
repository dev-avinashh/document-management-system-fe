export interface ISendOtpRequest {
  mobileNumber: string;
}

export interface IVerifyOtpRequest {
  mobileNumber: string;
  otp: string;
}

export interface ILoginResponse {
  status: boolean;
  data: {
    token: string;
    user_id: string;
    user_name: string;
    roles: IRole[];
  };
}

export interface IRole {
  id: number;
  role: string;
  role_slug: string;
  home: string;
}
