import Skeleton from "@mui/material/Skeleton";

const Stats = ({ title, counts, icon, isLoading }) => {
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={268}
        height={72}
        className="rounded-md shadow-md"
      />
    );
  }
  return (
    <div className="shadow-md p-5 rounded-xl flex justify-between items-center w-72 cursor-pointer select-none group">
      <div>
        <h2 className="text-2xl font-bold text-caption group-hover:scale-110 transition-all">
          {counts}
        </h2>
        <p className="text-sm text-footerLinkText">{title}</p>
      </div>
      <div className="bg-offBadge w-12 h-12 flex justify-center items-center text-white rounded-lg">
        {icon}
      </div>
    </div>
  );
};

export default Stats;
