import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Plus, Wallet } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import BudgetOverview from "../../components/budget/BudgetOverview";
import BudgetChart from "../../components/budget/BudgetChart";
import ExpenseList from "../../components/budget/ExpenseList";
import ExpenseForm from "../../components/budget/ExpenseForm";
import { useTrips } from "../../context/TripContext";

function Budget() {
  const location = useLocation();

  // These names match the functions exposed by TripContext.jsx
  const { trips, addExpense, removeExpense } = useTrips();

  const tripIdFromUrl = new URLSearchParams(location.search).get("trip") || "";

  const [selectedTripId, setSelectedTripId] = useState(
    tripIdFromUrl || trips[0]?.id || "",
  );

  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const selectedTrip = useMemo(() => {
    return trips.find((trip) => trip.id === selectedTripId) || trips[0] || null;
  }, [trips, selectedTripId]);

  const expenses = selectedTrip?.expenses || [];

  /* =========================================================
     EXPENSE TOTAL
  ========================================================= */

  const manualExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount || 0),
      0,
    );
  }, [expenses]);

  /* =========================================================
     HOTEL TOTAL
  ========================================================= */

  const hotelTotal = useMemo(() => {
    return (
      selectedTrip?.hotels?.reduce(
        (total, booking) => total + Number(booking.total || 0),
        0,
      ) || 0
    );
  }, [selectedTrip]);

  /* =========================================================
     TRANSPORT TOTAL
  ========================================================= */

  const transportTotal = useMemo(() => {
    return (
      selectedTrip?.transport?.reduce(
        (total, booking) => total + Number(booking.total || 0),
        0,
      ) || 0
    );
  }, [selectedTrip]);

  const budget = Number(selectedTrip?.budget || 0);

  const currency = selectedTrip?.currency || "USD";

  /* =========================================================
     TRIP SELECTOR
  ========================================================= */

  const handleTripChange = (event) => {
    const nextTripId = event.target.value;

    setSelectedTripId(nextTripId);

    const params = new URLSearchParams(location.search);

    if (nextTripId) {
      params.set("trip", nextTripId);
    } else {
      params.delete("trip");
    }

    window.history.replaceState(
      {},
      "",
      `${location.pathname}${params.toString() ? `?${params.toString()}` : ""}`,
    );
  };

  /* =========================================================
     ADD EXPENSE
  ========================================================= */

  const handleAddExpense = ({ tripId, expense }) => {
    addExpense(tripId, expense);
  };

  /* =========================================================
     REMOVE EXPENSE
  ========================================================= */

  const handleRemoveExpense = (expenseId) => {
    if (!selectedTrip) return;

    const confirmed = window.confirm(
      "Are you sure you want to remove this expense?",
    );

    if (!confirmed) return;

    removeExpense(selectedTrip.id, expenseId);
  };

  /* =========================================================
     NO TRIPS
  ========================================================= */

  if (!trips.length) {
    return (
      <DashboardLayout>
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center">
            <div className="w-full rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
                <Wallet size={25} />
              </div>

              <h1 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                No trips available
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                Create a trip first before you start tracking your travel budget
                and expenses.
              </p>

              <Link
                to="/trips/create"
                className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
              >
                Create Your First Trip
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto w-full min-w-0 max-w-[1600px] space-y-8">
          {/* =====================================================
              PAGE HEADER
          ====================================================== */}

          <section>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Link
                  to="/dashboard"
                  className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400"
                >
                  <ArrowLeft size={16} />
                  Back to Dashboard
                </Link>

                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-blue-600 dark:bg-sky-500/10 dark:text-sky-400">
                    <Wallet size={23} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-blue-600 dark:text-sky-400">
                      Travel finances
                    </p>

                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                      Trip Budget
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                      Keep track of your expenses, bookings, and remaining
                      travel budget in one place.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowExpenseForm(true)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 text-sm font-semibold text-blue-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 hover:shadow-md dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
              >
                <Plus size={18} />
                Add Expense
              </button>
            </div>
          </section>

          {/* =====================================================
              TRIP SELECTOR
          ====================================================== */}

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Selected Trip
                </p>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Choose the trip whose budget you want to manage.
                </p>
              </div>

              <div className="w-full md:max-w-sm">
                <select
                  value={selectedTrip?.id || ""}
                  onChange={handleTripChange}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  {trips.map((trip) => (
                    <option key={trip.id} value={trip.id}>
                      {trip.title || trip.name || "Untitled Trip"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* =====================================================
              SELECTED TRIP
          ====================================================== */}

          {selectedTrip && (
            <>
              {/* =================================================
                  TRIP SUMMARY
              ================================================== */}

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-sky-400">
                      Budget for
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                      {selectedTrip.title ||
                        selectedTrip.name ||
                        "Untitled Trip"}
                    </h2>

                    {selectedTrip.destination && (
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {selectedTrip.destination}
                      </p>
                    )}
                  </div>

                  <Link
                    to={`/trips/${selectedTrip.id}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-sky-400 dark:hover:text-sky-300"
                  >
                    View Trip Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </section>

              {/* =================================================
                  BUDGET OVERVIEW
              ================================================== */}

              <BudgetOverview
                budget={budget}
                manualExpenses={manualExpenses}
                hotelTotal={hotelTotal}
                transportTotal={transportTotal}
                currency={currency}
              />

              {/* =================================================
                  SPENDING CHART
              ================================================== */}

              <BudgetChart
                manualExpenses={manualExpenses}
                hotelTotal={hotelTotal}
                transportTotal={transportTotal}
                currency={currency}
              />

              {/* =================================================
                  EXPENSE HISTORY
              ================================================== */}

              <section>
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Expense history
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                      Manual Expenses
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Expenses you manually recorded for this trip.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowExpenseForm(true)}
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 text-sm font-semibold text-blue-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sky-100 hover:text-blue-800 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                  >
                    <Plus size={17} />
                    Add Expense
                  </button>
                </div>

                <ExpenseList
                  expenses={expenses}
                  onRemove={handleRemoveExpense}
                />
              </section>

              {/* =================================================
                  RELATED BOOKING LINKS
              ================================================== */}

              <section className="grid gap-4 md:grid-cols-2">
                <Link
                  to={`/hotels?trip=${selectedTrip.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Accommodation
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                        Manage Hotel Bookings
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Add or review accommodation expenses.
                      </p>
                    </div>

                    <ArrowRight
                      size={19}
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-sky-400"
                    />
                  </div>
                </Link>

                <Link
                  to={`/transport?trip=${selectedTrip.id}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Transportation
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900 dark:text-white">
                        Manage Transport Bookings
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Add flights, trains, buses, or car rentals.
                      </p>
                    </div>

                    <ArrowRight
                      size={19}
                      className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-sky-400"
                    />
                  </div>
                </Link>
              </section>
            </>
          )}
        </div>
      </div>

      {/* =========================================================
          EXPENSE MODAL
      ========================================================== */}

      {showExpenseForm && (
        <ExpenseForm
          trips={trips}
          initialTripId={selectedTrip?.id || ""}
          onClose={() => setShowExpenseForm(false)}
          onSuccess={({ tripId, expense }) => {
            handleAddExpense({
              tripId,
              expense,
            });

            setShowExpenseForm(false);
          }}
        />
      )}
    </DashboardLayout>
  );
}

export default Budget;
