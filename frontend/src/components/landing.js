import React from "react";

const Landing = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Spendr</h1>
        <p className="text-lg mb-6">
          Your ultimate solution for managing personal and group expenses.
        </p>
        <p className="text-xl font-semibold italic mt-6">Start your journey</p>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Transactions */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">
              Personal Transactions
            </h3>
            <p className="text-gray-600 mb-4">
              Track your individual income and expenses with powerful insights.
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>View category-wise income and expense charts.</li>
              <li>
                Select time periods (weekly, monthly, yearly, or custom) for
                detailed analysis.
              </li>
              <li>
                Access a complete history of transactions with type and date
                filters.
              </li>
              <li>No need to refresh—data updates automatically!</li>
            </ul>
          </div>

          {/* Common Room Transactions */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">
              Common Room Management
            </h3>
            <p className="text-gray-600 mb-4">
              Collaborate with friends and manage group transactions seamlessly.
            </p>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Create rooms and invite members with secure links.</li>
              <li>Admins can manage members and room settings.</li>
              <li>Members can add, view, and delete their own transactions.</li>
              <li>
                 No need to refresh—data updates automatically!
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-gray-100 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          How to Use Spendr
        </h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Step 1 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-blue-500 text-white font-bold text-lg rounded-full w-12 h-12 shrink-0">
              1
            </div>
            <p className="text-lg">
              Sign up and create an account to get started.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-blue-500 text-white font-bold text-lg rounded-full w-12 h-12 shrink-0">
              2
            </div>
            <p className="text-lg">
              Use the <strong>Dashboard</strong> to monitor your personal income
              and expenses.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-blue-500 text-white font-bold text-lg rounded-full w-12 h-12 shrink-0">
              3
            </div>
            <p className="text-lg">
              Visit the <strong>History</strong> section for a detailed view of
              past transactions.
            </p>
          </div>
          {/* Step 4 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center bg-blue-500 text-white font-bold text-lg rounded-full w-12 h-12 shrink-0">
              4
            </div>
            <p className="text-lg">
              Create or join a <strong>Common Room</strong> to manage group
              transactions.
            </p>
          </div>
        </div>
      </section>

      {/* Refresh Instruction for Common Room */}
      <section className="bg-yellow-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-yellow-700 mb-4">
            Smooth and Seamless Updates
          </h2>
          <p className="text-yellow-800 text-lg">
            Enjoy real-time updates in the <strong>Common Room</strong>—no need
            to refresh the page anymore. Your changes will be reflected
            instantly!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">Spendr</h3>
          <p className="text-gray-400">
            Your one-stop solution for personal and group expense tracking.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Spendr. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
