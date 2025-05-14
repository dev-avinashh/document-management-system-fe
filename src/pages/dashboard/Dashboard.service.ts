import axiosInstance from "../../utils/AxiosInstance";

export const getTags = async () => {
  try {
    const response = await axiosInstance.post("/documentTags", {
      term: "",
    });
    return response.data.data;
  } catch (error) {
    console.error(error, "Error fetching tags");
  }
};

export const uploadDocument = (data: FormData) => {
  try {
    for (const pair of data.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    const res = axiosInstance.post("/saveDocumentEntry", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.error(error, "Error uploading document");
  }
};
