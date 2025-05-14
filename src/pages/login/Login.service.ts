import axios from "axios";
import {
  SendOtpRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./Login.interface";

const API_URL = import.meta.env.VITE_API_URL 

export const sendOtp = async (mobileNo: string) => {
  const res = await axios.post<SendOtpRequest>(
    `${API_URL}/generateOTP`,
    {
      mobile_number: mobileNo,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip"
      },
    }
  );
  return res.data;
};
export const verifyOtp = async ({
  mobileNumber,
  otp,
}: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
  const res = await axios.post<VerifyOtpResponse>(
    `${API_URL}/validateOTP`,
    {
      mobile_number: mobileNumber,
      otp,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};
