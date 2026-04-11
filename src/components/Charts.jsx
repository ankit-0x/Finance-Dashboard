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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
      {/* PIE CHART */}
      <div className={`${base} p-4 sm:p-5 rounded-2xl shadow`}>
        <h2 className="mb-3 font-semibold text-center text-sm sm:text-base">
          💸 Expense Distribution
        </h2>

        {pieData.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">No expense data</p>
        ) : (
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={window.innerWidth < 640 ? 80 : 100}
                  label={window.innerWidth >= 640}
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend
                  wrapperStyle={{ fontSize: "12px" }}
                  layout="horizontal"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* LINE CHART */}
      <div className={`${base} p-4 sm:p-5 rounded-2xl shadow`}>
        <h2 className="mb-3 font-semibold text-center text-sm sm:text-base">
          📈 Balance Over Time
        </h2>

        {trendData.length === 0 ? (
          <p className="text-gray-500 text-center text-sm">No data available</p>
        ) : (
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer>
              <LineChart data={trendData}>
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#6366F1"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
