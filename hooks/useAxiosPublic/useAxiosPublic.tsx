import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
