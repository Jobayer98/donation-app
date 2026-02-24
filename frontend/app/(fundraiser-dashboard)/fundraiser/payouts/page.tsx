"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Landmark,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

export default function PayoutsPage() {
  const [isConnected, setIsConnected] = useState(true); // Simulate connection status

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payouts & Banking</h1>
        <p className="text-gray-500 text-sm">
          Manage where you receive your funds.
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
        <p className="text-slate-300 text-sm">Available Balance</p>
        <h2 className="text-4xl font-bold my-2">$24,500.00</h2>
        <div className="flex gap-3 mt-4">
          <Button className="bg-white text-slate-900 hover:bg-gray-100">
            Withdraw Funds
          </Button>
          <Button
            variant="outline"
            className="border-slate-600 text-white hover:bg-slate-700"
          >
            View History
          </Button>
        </div>
      </div>

      {/* Payment Provider Setup */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <Landmark className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-lg">Bank Account & Provider</h3>
        </div>

        {isConnected ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Stripe Connected</p>
                <p className="text-sm text-green-700">Account ending in 4242</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConnected(false)}
            >
              Manage
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0" />
              <p className="text-sm text-yellow-800">
                You need to connect a payment provider to receive donations. We
                use Stripe for secure transfers.
              </p>
            </div>

            <div className="space-y-2">
              <Label>Connect with Stripe</Label>
              <div className="flex gap-3">
                <Button className="bg-green-600 hover:bg-green-700 flex gap-2">
                  Setup Stripe Account <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
