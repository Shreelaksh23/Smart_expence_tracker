import { useState, useEffect } from "react";
import { addExpense, updateExpense } from "../api/expenses";

const ExpenseForm = ({ onAdd, editingExpense, onCancelEdit }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    notes: "",
  });

  // Populate form when editing
  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: editingExpense.amount,
        category: editingExpense.category,
        notes: editingExpense.notes || "",
      });
    }
  }, [editingExpense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Title and amount are required");
      return;
    }

    if (editingExpense) {
      // ✏️ UPDATE
      await updateExpense(editingExpense._id, {
        ...form,
        amount: Number(form.amount),
      });
      onCancelEdit();
    } else {
      // ➕ ADD
      await addExpense({
        ...form,
        amount: Number(form.amount),
      });
    }

    setForm({
      title: "",
      amount: "",
      category: "Food",
      notes: "",
    });

    onAdd(); // refresh expenses + insights
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black p-6 rounded-lg"
    >
      <h3 className="text-lg font-semibold mb-4">
        {editingExpense ? "Edit Expense" : "Add Expense"}
      </h3>

      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        type="number"
        className="w-full mb-3 p-2 border rounded"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) =>
          setForm({ ...form, amount: e.target.value })
        }
      />

      <select
        className="w-full mb-3 p-2 border rounded"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Rent</option>
        <option>Shopping</option>
        <option>Subscription</option>
        <option>Other</option>
      </select>

      <textarea
        className="w-full mb-4 p-2 border rounded"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={(e) =>
          setForm({ ...form, notes: e.target.value })
        }
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-black text-white py-2 rounded hover:bg-[#d4af37] hover:text-black transition"
        >
          {editingExpense ? "Update" : "Add"}
        </button>

        {editingExpense && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex-1 border border-gray-300 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
