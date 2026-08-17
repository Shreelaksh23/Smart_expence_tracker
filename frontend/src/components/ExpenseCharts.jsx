import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const GOLD = "#d4af37";
const COLORS = ["#d4af37", "#999999", "#666666", "#333333"];

const ExpenseCharts = ({ insights }) => {
  if (!insights) return null;

  const categoryData = Object.entries(
    insights.categorySummary || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  const monthlyData = insights.dailyTotals || [];

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-10">
      {/*  Category Pie Chart */}
      <div className="bg-white text-black p-5 rounded-lg">
        <h3 className="font-semibold mb-4">
          Category-wise Spending
        </h3>

        {categoryData.length === 0 ? (
          <p className="text-sm text-gray-500">
            No data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Monthly Trend Bar Chart */}
      <div className="bg-white text-black p-5 rounded-lg">
        <h3 className="font-semibold mb-4">
          Daily Spending Trend
        </h3>

        {monthlyData.length === 0 ? (
          <p className="text-sm text-gray-500">
            No data available
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill={GOLD} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ExpenseCharts;
