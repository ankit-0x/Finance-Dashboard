import { useState } from "react";

const TransactionTable = ({ data, setData, role, dark }) => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("latest");

  const [form, setForm] = useState({
    category: "",
    amount: "",
    type: "expense",
  });

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    category: "",
    amount: "",
    type: "expense",
  });

  const handleAdd = () => {
    if (!form.category || !form.amount) return;

    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      category: form.category,
      amount: Number(form.amount),
      type: form.type,
    };

    setData((prev) => [...prev, newTransaction]);
    setForm({ category: "", amount: "", type: "expense" });
  };

  const handleSave = (id) => {
    const updated = data.map((t) =>
      t.id === id ? { ...t, ...editData, amount: Number(editData.amount) } : t,
    );
    setData(updated);
    setEditId(null);
  };

  const handleDelete = (id) => {
    setData(data.filter((t) => t.id !== id));
  };

  const filtered = data.filter((t) =>
    t.category.toLowerCase().includes(filter.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) =>
    sort === "latest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date),
  );

  const baseStyle = dark ? "bg-gray-800 text-white" : "bg-white text-black";

  return (
    <div className={`${baseStyle} p-4 sm:p-5 rounded-2xl shadow-lg mt-4`}>
      {/* ADD FORM */}
      {role === "admin" && (
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 mb-4">
          <input
            value={form.category}
            placeholder="Category"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={`px-3 py-2 rounded-lg w-full sm:w-32 border ${
              dark
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white text-black placeholder-gray-500 border-gray-300"
            }`}
          />

          <input
            value={form.amount}
            type="number"
            placeholder="Amount"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className={`px-3 py-2 rounded-lg w-full sm:w-32 border ${
              dark
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white text-black placeholder-gray-500 border-gray-300"
            }`}
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className={`px-3 py-2 rounded-lg w-full sm:w-32 border ${
              dark
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white text-black placeholder-gray-500 border-gray-300"
            }`}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={handleAdd}
            disabled={!form.category || !form.amount}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Add
          </button>
        </div>
      )}

      {/* FILTER */}
      <div className="flex flex-col sm:flex-row gap-2 sm:justify-between mb-3">
        <input
          placeholder="Search category..."
          onChange={(e) => setFilter(e.target.value)}
          className={`px-3 py-2 rounded-lg w-full sm:w-48 border ${
            dark
              ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
              : "bg-white text-black placeholder-gray-500 border-gray-300"
          }`}
        />

        <select
          onChange={(e) => setSort(e.target.value)}
          className="border px-2 py-2 rounded-lg w-full sm:w-auto"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-gray-400">
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Type</th>
              {role === "admin" && <th className="px-3 py-2">Action</th>}
            </tr>
          </thead>

          <tbody>
            {sorted.map((t) => (
              <tr
                key={t.id}
                className={`${
                  dark ? "bg-gray-700" : "bg-gray-50"
                } shadow-sm rounded-xl`}
              >
                <td className="px-3 py-3 rounded-l-xl">{t.date}</td>

                <td className="px-3 py-3">
                  {editId === t.id ? (
                    <input
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({ ...editData, category: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-28"
                    />
                  ) : (
                    t.category
                  )}
                </td>

                <td className="px-3 py-3">
                  {editId === t.id ? (
                    <input
                      type="number"
                      value={editData.amount}
                      onChange={(e) =>
                        setEditData({ ...editData, amount: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-24"
                    />
                  ) : (
                    <span className="font-medium">
                      ₹{t.amount.toLocaleString()}
                    </span>
                  )}
                </td>

                <td className="px-3 py-3">
                  {editId === t.id ? (
                    <select
                      value={editData.type}
                      onChange={(e) =>
                        setEditData({ ...editData, type: e.target.value })
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${
                        t.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {t.type}
                    </span>
                  )}
                </td>

                {role === "admin" && (
                  <td className="px-3 py-3 rounded-r-xl space-x-2">
                    {editId === t.id ? (
                      <>
                        <button
                          onClick={() => handleSave(t.id)}
                          className="text-green-600 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="text-gray-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setEditId(t.id);
                            setEditData(t);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(t.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-3">
        {sorted.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-xl shadow ${
              dark ? "bg-gray-700" : "bg-gray-50"
            }`}
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t.date}</span>

              {editId === t.id ? (
                <select
                  value={editData.type}
                  onChange={(e) =>
                    setEditData({ ...editData, type: e.target.value })
                  }
                  className="border px-2 py-1 rounded text-xs"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              ) : (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    t.type === "income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {t.type}
                </span>
              )}
            </div>

            <div className="mt-2">
              {editId === t.id ? (
                <input
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <div className="font-medium">{t.category}</div>
              )}
            </div>

            <div className="mt-1">
              {editId === t.id ? (
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <div className="text-lg font-bold">
                  ₹{t.amount.toLocaleString()}
                </div>
              )}
            </div>

            {role === "admin" && (
              <div className="mt-3 flex gap-3 text-sm">
                {editId === t.id ? (
                  <>
                    <button
                      onClick={() => handleSave(t.id)}
                      className="text-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditId(t.id);
                        setEditData(t);
                      }}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(t.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <p className="text-gray-400 mt-3 text-sm">No transactions found</p>
      )}
    </div>
  );
};

export default TransactionTable;
