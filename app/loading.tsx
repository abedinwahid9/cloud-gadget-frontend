import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="w-full h-full space-y-2 ">
      <Skeleton className="h-10  w-full bg-primary/20" />
      <Skeleton className="h-20  w-full  bg-primary/20" />
      <Skeleton className="h-10  w-full bg-primary/20" />
    </div>
  );
};

export default Loading;
