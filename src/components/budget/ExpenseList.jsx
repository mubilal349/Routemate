import { ReceiptText } from "lucide-react";

import ExpenseCard from "./ExpenseCard";

function ExpenseList({ expenses = [], onRemove }) {
  if (expenses.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
          <ReceiptText size={24} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
          No expenses yet
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
          Start tracking your trip spending by adding your first expense.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default ExpenseList;
