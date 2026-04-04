import {
  PieChart,
  Pie,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366F1",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#A855F7",
  "#06B6D4",
];

const Charts = ({ data, dark }) => {
  const expenses = data.filter((t) => t.type === "expense");

  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  let runningBalance = 0;
  const trendData = data.map((t) => {
    runningBalance += t.type === "income" ? t.amount : -t.amount;
    return {
      date: t.date.slice(5),
      balance: runningBalance,
    };
  });

  const base = dark ? "bg-gray-800 text-white" : "bg-white text-black";

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div className={`${base} p-5 rounded-2xl shadow`}>
        <h2 className="mb-3 font-semibold text-center">
          💸 Expense Distribution
        </h2>

        {pieData.length === 0 ? (
          <p className="text-gray-500 text-center">No expense data</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className={`${base} p-5 rounded-2xl shadow`}>
        <h2 className="mb-3 font-semibold text-center">📈 Balance Over Time</h2>

        {trendData.length === 0 ? (
          <p className="text-gray-500 text-center">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="balance"
                stroke="#6366F1"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Charts;
