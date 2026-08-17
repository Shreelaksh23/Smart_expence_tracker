import BudgetSetter from "./BudgetSetter";

const Insights = ({ data, onUpdate }) => {
  if (!data) return null;

  const {
    totalSpent,
    categorySummary,
    budget,
    budgetUsedPercent,
    warning,
  } = data;

  return (
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {/*  Total Spent */}
      <div className="bg-white text-black p-5 rounded-lg">
        <p className="text-sm text-gray-500">Total Spent (This Month)</p>
        <h3 className="text-2xl font-semibold mt-1">
          ₹{totalSpent}
        </h3>
      </div>

      {/*  Monthly Budget (Editable) */}
      <BudgetSetter
        currentBudget={budget}
        onUpdate={onUpdate}
      />

      {/* Status */}
      <div className="bg-white text-black p-5 rounded-lg">
        <p className="text-sm text-gray-500">Status</p>

        {budget ? (
          <>
            <p className="mt-2 text-sm">
              Used{" "}
              <span className="font-semibold text-[#d4af37]">
                {budgetUsedPercent}%
              </span>{" "}
              of budget
            </p>

            {warning ? (
              <p className="mt-2 text-sm text-red-600 font-medium">
                {warning}
              </p>
            ) : (
              <p className="mt-2 text-sm text-green-600 font-medium">
                Spending is under control
              </p>
            )}
          </>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            Set a budget to track spending
          </p>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="md:col-span-3 bg-white text-black p-5 rounded-lg">
        <h4 className="font-semibold mb-3">
          Category Breakdown
        </h4>

        {Object.keys(categorySummary).length === 0 ? (
          <p className="text-sm text-gray-500">
            No expenses recorded this month
          </p>
        ) : (
          <div className="space-y-2">
            {Object.entries(categorySummary).map(
              ([category, amount]) => (
                <div
                  key={category}
                  className="flex justify-between text-sm"
                >
                  <span>{category}</span>
                  <span className="font-medium">
                    ₹{amount}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
