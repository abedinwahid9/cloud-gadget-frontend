"use client";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/slices/userSlices";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const LoginCheck = () => {
  const axiosPublic = useAxiosPublic();
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosPublic.get("/auth/me");
      return res.data.payload;
    },
  });

  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data, dispatch]);

  return null;
};

export default LoginCheck;
