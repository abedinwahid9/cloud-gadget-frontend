import axios from "axios";
let BASE_URL;

// if (process.env.NEXT_PUBLIC_ENV === "DEV") {
//   BASE_URL = process.env.NEXT_PUBLIC_LOCAL;
// } else {
//   BASE_URL = process.env.NEXT_PUBLIC_PRODUCTION;
// }

// const axiosPublic = axios.create({
//   baseURL: BASE_URL,
// });
const axiosPublic = axios.create({
  baseURL: "https://cloud-gadget-server.onrender.com/api/v1",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
