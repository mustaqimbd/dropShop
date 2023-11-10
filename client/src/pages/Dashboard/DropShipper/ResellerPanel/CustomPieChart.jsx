import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const CustomPieChart = ({ statistics }) => {
  const data = [
    {
      name: "Completed",
      value: statistics?.completedOrder || 0,
    },
    {
      name: "Pending",
      value: statistics?.pendingOrder || 0,
    },
    {
      name: "Canceled",
      value: statistics?.canceledOrder || 0,
    },
  ];

  const COLORS = ["green", "yellow", "red"];
  return (
    <ResponsiveContainer width="100%" height="100%" >
      <PieChart width={200} height={180}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
