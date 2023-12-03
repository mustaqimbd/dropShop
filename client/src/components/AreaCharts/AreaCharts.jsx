import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AreaCharts = ({ data, xAxis, area, CustomTooltip }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis} />
        <YAxis />
        {CustomTooltip ? <Tooltip content={<CustomTooltip />} /> : <Tooltip />}
        <Area type="monotone" dataKey={area} stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaCharts;
