import { PieChart } from "@mui/x-charts/PieChart";

const CustomPieChart = () => {
  const data = [
    { id: 0, value: 20, label: "Completed" },
    { id: 1, value: 15, label: "Pending" },
    { id: 2, value: 10, label: "Canceled" },
  ];

  return (
    <PieChart
      colors={["green", "yellow", "red"]}
      series={[{ data }]}
      width={300}
      height={150}
    />
  );
};

export default CustomPieChart;
