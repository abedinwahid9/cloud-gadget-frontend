"use client";

import { getAuthMe } from "@/lib/redux/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useEffect } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state: RootState) => state.authSlices.loading
  );

  useEffect(() => {
    dispatch(getAuthMe());
  }, [dispatch]);

  if (loading) return <p>Loading user...</p>;

  return <>{children}</>;
};

export default AuthProvider;
