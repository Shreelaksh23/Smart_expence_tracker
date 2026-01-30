import { deleteExpense } from "../api/expenses";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  if (!expenses.length) {
    return (
      <div className="bg-white text-black p-6 rounded-lg">
        <p className="text-gray-500 text-sm">
          No expenses added yet.
        </p>
      </div>
    );
  }

  const handleDelete = async (id) => {
    await deleteExpense(id);
    onDelete();
  };

  return (
    <div className="bg-white text-black rounded-lg">
      {expenses.map((exp) => (
        <div
          key={exp._id}
          className="flex justify-between items-center px-4 py-3 border-b last:border-b-0"
        >
          <div>
            <p className="font-medium">{exp.title}</p>
            <p className="text-sm text-gray-500">
              {exp.category} · ₹{exp.amount}
            </p>
          </div>

          <div className="flex gap-3 text-sm">
            <button
              onClick={() => onEdit(exp)}
              className="text-[#d4af37]"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(exp._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
