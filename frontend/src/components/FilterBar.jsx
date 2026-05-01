import { useState } from "react";

export default function FilterBar({ onFilter }) {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date_desc");

  const handleApply = () => {
    onFilter({ category, sort });
  };

  return (
    <div className="panel filter-panel">
      <h3>Filters</h3>

      <div className="filter-controls">
        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="date_desc">Newest First</option>
        </select>

        <button onClick={handleApply}>Apply</button>
      </div>
    </div>
  );
}
