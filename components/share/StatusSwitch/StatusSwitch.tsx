"use client";
import { Switch } from "@/components/ui/switch";
import useAxiosPublic from "@/hooks/useAxiosPublic/useAxiosPublic";
import React, { startTransition, useOptimistic, useState } from "react";

const StatusSwitch = ({
  status,
  id,
  refetch,
}: {
  status: boolean;
  id: number;
  refetch: () => void;
}) => {
  const axiosPublic = useAxiosPublic();
  const [updateStatus, setUpdateStatus] = useState(status);
  const [optimisticStatus, addOptimisticStatus] = useOptimistic(
    updateStatus,
    (_currStatus, newStatus: boolean) => newStatus
  );

  const handleSwitchChange = (newValue: boolean) => {
    startTransition(async () => {
      addOptimisticStatus(newValue);
      setUpdateStatus(newValue);
      try {
        const res = await axiosPublic.patch(`/product/status/${id}`, {
          status: newValue,
        });
        if (res.status === 203) {
          refetch();
        }
      } catch (err) {
        console.log(err);
        addOptimisticStatus(optimisticStatus);
      }
    });
  };
  return (
    <Switch
      className="cursor-pointer"
      checked={optimisticStatus}
      onCheckedChange={handleSwitchChange}
    />
  );
};

export default StatusSwitch;
