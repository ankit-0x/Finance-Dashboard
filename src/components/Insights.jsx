const Insights = ({ data, dark }) => {
  if (data.length === 0) {
    return <p className="text-gray-500 mt-4 text-center">No data available</p>;
  }

  const categoryTotals = {};
  data.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  const highestCategory = Object.keys(categoryTotals).reduce(
    (a, b) => (categoryTotals[a] > categoryTotals[b] ? a : b),
    "",
  );

  const highestAmount = categoryTotals[highestCategory] || 0;

 
  const monthly = {};
  data.forEach((t) => {
    const month = t.date.slice(0, 7);
    monthly[month] =
      (monthly[month] || 0) + (t.type === "income" ? t.amount : -t.amount);
  });

  const months = Object.keys(monthly);
  const latest = monthly[months[months.length - 1]] || 0;
  const previous = monthly[months[months.length - 2]] || 0;

  const diff = latest - previous;

  const getMessage = () => {
    if (diff > 0) return "Great! You are saving more money 👍";
    if (diff < 0) return "You spent more than last month ⚠️";
    return "Your spending is stable 🙂";
  };

  const base = dark ? "bg-gray-800 text-white" : "bg-white text-black";

  return (
    <div className={`${base} p-5 rounded-2xl shadow-lg mt-6`}>
      <h2 className="text-lg font-semibold mb-4">📊 Insights</h2>

      <div className="grid gap-4 text-sm">
        <div className="p-4 rounded-xl bg-red-50 text-red-700">
          <p className="font-medium">💸 Highest Spending</p>
          <p>
            You spent the most on <b>{highestCategory || "N/A"}</b> (₹
            {highestAmount.toLocaleString()})
          </p>
        </div>

        <div className="p-4 rounded-xl bg-blue-50 text-blue-700">
          <p className="font-medium mb-2">📅 Monthly Summary</p>

          <p className="text-base">
            {latest >= 0 ? (
              <>
                💰 You <b>saved ₹{Math.abs(latest).toLocaleString()}</b> this
                month
              </>
            ) : (
              <>
                ⚠️ You <b>spent ₹{Math.abs(latest).toLocaleString()}</b> more
                than you earned
              </>
            )}
          </p>

          <p className="text-sm mt-2">
            ⬅️ Last month: ₹{previous.toLocaleString()}
          </p>

          <p className="mt-2 font-medium">
            {diff > 0
              ? `📈 You are doing better than last month by ₹${diff.toLocaleString()}`
              : diff < 0
                ? `📉 You are down by ₹${Math.abs(diff).toLocaleString()} compared to last month`
                : "➖ No change from last month"}
          </p>
        </div>

        <div
          className={`p-4 rounded-xl ${
            diff > 0
              ? "bg-green-50 text-green-700"
              : diff < 0
                ? "bg-yellow-50 text-yellow-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          <p className="font-medium">💡Quick Insight</p>
          <p>{getMessage()}</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;
