import { Divider } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
const DashboardSkeleton = () => {
  return (
    <div className="w-full h-screen bg-white grid grid-cols-10 gap-5 p-5">
      <div className="col-span-2 space-y-5">
        <Skeleton variant="rounded" style={{ width: "100%" }} height={50} />
        <Skeleton variant="rounded" style={{ width: "100%" }} height={50} />
        <Divider />
        <Skeleton variant="rounded" style={{ width: "100%" }} height={50} />
        <Skeleton variant="rounded" style={{ width: "100%" }} height={50} />
        <Skeleton variant="rounded" style={{ width: "100%" }} height={50} />
        <Skeleton variant="rounded" style={{ width: "100%" }} height={50} />
        <Skeleton variant="rounded" style={{ width: "100%" }} height={50} />
        <Skeleton variant="rounded" style={{ width: "100%" }} height={50} />
      </div>
      <div className="col-span-8">
        <Skeleton variant="rounded" style={{ width: "100%" }} height={60} />
        <div className="grid grid-cols-8 mt-5 gap-5">
          <div className="col-span-5">
            <Skeleton
              variant="rounded"
              style={{ width: "100%" }}
              height={200}
            />
          </div>
          <div className="col-span-3">
            <Skeleton
              variant="rounded"
              style={{ width: "100%" }}
              height={200}
            />
          </div>
        </div>
        <div className="grid grid-cols-8 mt-5 gap-5">
          <div className="col-span-3">
            <Skeleton
              variant="rounded"
              style={{ width: "100%" }}
              height={300}
            />
          </div>
          <div className="col-span-5">
            <Skeleton
              variant="rounded"
              style={{ width: "100%" }}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
