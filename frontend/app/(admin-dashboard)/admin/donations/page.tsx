"use client";

import React from "react";

const transactions = [
  {
    id: "TXN-001",
    donor: "John Doe",
    ngo: "Clean Water",
    amount: "$100",
    fee: "$2.50",
    date: "Oct 25, 2023",
    status: "Completed",
  },
  {
    id: "TXN-002",
    donor: "Anonymous",
    ngo: "Education for All",
    amount: "$50",
    fee: "$1.25",
    date: "Oct 24, 2023",
    status: "Completed",
  },
];

export default function AdminDonationsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Transactions</h1>
        <p className="text-gray-500 text-sm">
          Monitor financial flows and platform fees.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  ID
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Donor
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Organization
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Platform Fee
                </th>
                <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50">
                  <td className="p-4 text-xs text-gray-500">{tx.id}</td>
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {tx.donor}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{tx.ngo}</td>
                  <td className="p-4 text-sm font-bold text-green-600">
                    {tx.amount}
                  </td>
                  <td className="p-4 text-sm text-gray-600">{tx.fee}</td>
                  <td className="p-4 text-sm text-gray-500">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
