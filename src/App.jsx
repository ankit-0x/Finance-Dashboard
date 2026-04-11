import { useState, useEffect } from "react";
import { transactions as initialData } from "./data/mockData";
import SummaryCard from "./components/SummaryCard";
import TransactionTable from "./components/TransactionTable";
import RoleToggle from "./components/RoleToggle";
import Charts from "./components/Charts";
import Insights from "./components/Insights";
import logo from "../public/financial.png";

function App() {
  const [data, setData] = useState(initialData);
  const [role, setRole] = useState("viewer");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(data));
  }, [data]);

  const income = data
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = data
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
  };

  return (
    <div
      className={
        dark
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-gray-50 text-black min-h-screen"
      }
    >
      {/* container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* logo + title */}
          <div className="flex items-center gap-3">
            <img src={logo} className="w-8 h-8 sm:w-10 sm:h-10" />
            <h1 className="text-xl sm:text-2xl font-bold">Finance Dashboard</h1>
          </div>

          {/* controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <RoleToggle role={role} setRole={setRole} dark={dark} />

            {/* dark toggle */}
            <div
              onClick={() => setDark(!dark)}
              className={`relative w-14 sm:w-16 h-7 sm:h-8 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300
              ${dark ? "bg-gray-800" : "bg-gray-300"}`}
            >
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md transform transition-all duration-300
                ${dark ? "translate-x-7 sm:translate-x-8 bg-gray-500" : "translate-x-0 bg-white"}`}
              />
            </div>

            {/* export button */}
            <button
              onClick={exportData}
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1.5 rounded-lg text-sm sm:text-base transition"
            >
              ⬇️ Export
            </button>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <SummaryCard title="Balance" amount={balance} dark={dark} />
          <SummaryCard title="Income" amount={income} dark={dark} />
          <SummaryCard title="Expenses" amount={expense} dark={dark} />
        </div>

        {/* EMPTY STATE */}
        {data.length === 0 && (
          <div className="text-center text-gray-400 mt-10 px-2">
            <p className="text-base sm:text-lg">No financial data found</p>
            <p className="text-sm">Start by adding your first transaction</p>
          </div>
        )}

        {/* CHARTS */}
        <div className="mb-6 overflow-x-auto">
          <Charts data={data} dark={dark} />
        </div>

        {/* TABLE */}
        <div className="mb-6 overflow-x-auto">
          <TransactionTable
            data={data}
            setData={setData}
            role={role}
            dark={dark}
          />
        </div>

        {/* INSIGHTS */}
        <div className="overflow-x-auto">
          <Insights data={data} dark={dark} />
        </div>
      </div>
    </div>
  );
}

export default App;
