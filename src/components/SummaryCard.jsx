const SummaryCard = ({ title, amount, dark }) => {
  return (
    <div
      className={
        dark
          ? "bg-gray-800 text-white p-4 rounded-2xl shadow mt-4"
          : "bg-white text-black p-4 rounded-2xl shadow mt-4"
      }
    >
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-2xl font-bold">₹{amount}</p>
    </div>
  );
};

export default SummaryCard;
