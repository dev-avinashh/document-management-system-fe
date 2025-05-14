import axios from "axios";
import {
  ISendOtpRequest,
  IVerifyOtpRequest,
  ILoginResponse,
} from "./Login.interface";

const API_URL = import.meta.env.VITE_API_URL;

const headers = {
  "Content-Type": "application/json",
  "Accept-Encoding": "gzip",
};

export const sendOtp = async (mobileNo: string) => {
  console.log("send otp called");
  const res = await axios.post<ISendOtpRequest>(
    `${API_URL}/generateOTP`,
    {
      mobile_number: mobileNo,
    },
    {
      headers,
    }
  );
  return res.data;
};
export const verifyOtp = async ({
  mobileNumber,
  otp,
}: IVerifyOtpRequest): Promise<ILoginResponse> => {
  const res = await axios.post<ILoginResponse>(
    `${API_URL}/validateOTP`,
    {
      mobile_number: mobileNumber,
      otp,
    },
    {
      headers,
    }
  );
  return res.data;
};
