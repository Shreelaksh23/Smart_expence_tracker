import { useState } from "react";
import API from "../api/axios";

const BudgetSetter = ({ currentBudget, onUpdate }) => {
  const [budget, setBudget] = useState(currentBudget || "");
  const [editing, setEditing] = useState(false);

  const saveBudget = async () => {
    await API.put("/users/budget", { budget: Number(budget) });
    setEditing(false);
    onUpdate(); // refresh insights
  };

  return (
    <div className="bg-white text-black p-5 rounded-lg">
      <p className="text-sm text-gray-500">Monthly Budget</p>

      {editing ? (
        <div className="mt-2 flex gap-2">
          <input
            type="number"
            className="flex-1 p-2 border rounded"
            placeholder="Enter budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
          <button
            onClick={saveBudget}
            className="px-4 bg-black text-white rounded hover:bg-[#d4af37] hover:text-black"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="mt-2 flex justify-between items-center">
          <h3 className="text-2xl font-semibold">
            ₹{currentBudget || "Not set"}
          </h3>
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-[#d4af37]"
          >
            Set
          </button>
        </div>
      )}
    </div>
  );
};

export default BudgetSetter;
