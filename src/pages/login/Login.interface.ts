export interface SendOtpRequest {
  mobileNumber: string;
}

export interface VerifyOtpRequest {
  mobileNumber: string;
  otp: string;
}

export interface VerifyOtpResponse {
  token: string;
  status: boolean;
  message: string;
}