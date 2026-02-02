const FiltreStatus = ({ onSelect }) => {
  return (
    <div className="filter-container">
      <div className="filter-relative">
        <select
          className="filter-select"
          onChange={(e) => onSelect(e.target.value)}
        >
          <option className="py-2">All Status</option>
          <option className="py-2">confirmed</option>
          <option className="py-2">pending</option>
          <option className="py-2">cancelled</option>
        </select>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FiltreStatus;
