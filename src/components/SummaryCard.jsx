const SummaryCard = ({ title, amount, dark }) => {
  return (
    <div
      className={`${
        dark ? "bg-gray-800 text-white" : "bg-white text-black"
      } p-3 sm:p-4 rounded-2xl shadow mt-2 sm:mt-4`}
    >
      <h2 className="text-gray-500 text-xs sm:text-sm">{title}</h2>

      <p className="text-lg sm:text-2xl font-bold mt-1">
        ₹{amount.toLocaleString()}
      </p>
    </div>
  );
};

export default SummaryCard;
