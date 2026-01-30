import { useEffect, useState } from "react";
import { getExpenses } from "../api/expenses";
import { getMonthlyInsights } from "../api/insights";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Insights from "../components/Insights";
import ExpenseCharts from "../components/ExpenseCharts";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [insights, setInsights] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  const loadExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  const loadInsights = async () => {
    const res = await getMonthlyInsights();
    setInsights(res.data);
  };

  useEffect(() => {
    loadExpenses();
    loadInsights();
  }, []);

  const refreshAll = () => {
    loadExpenses();
    loadInsights();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6">
          Dashboard
        </h2>

        <Insights data={insights} onUpdate={loadInsights} />
        <ExpenseCharts insights={insights} />

        <div className="grid md:grid-cols-2 gap-6">
          <ExpenseForm
            onAdd={refreshAll}
            editingExpense={editingExpense}
            onCancelEdit={() => setEditingExpense(null)}
          />

          <ExpenseList
            expenses={expenses}
            onDelete={refreshAll}
            onEdit={(exp) => setEditingExpense(exp)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
