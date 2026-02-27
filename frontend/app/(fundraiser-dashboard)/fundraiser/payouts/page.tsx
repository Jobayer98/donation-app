"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Landmark,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Plus,
  Trash2,
  Edit,
  Power,
  XCircle,
} from "lucide-react";
import api from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface PaymentProvider {
  id: string;
  name: string;
  currency: string;
  isDefault: boolean;
  isActive: boolean;
  config: {
    api_key: string;
    secret_key: string;
  };
}

interface BankAccount {
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
}

export default function PayoutsPage() {
  const [providers, setProviders] = useState<PaymentProvider[]>([]);
  const [loading, setLoading] = useState(false);
  const [showProviderForm, setShowProviderForm] = useState(false);
  const [showBankForm, setShowBankForm] = useState(false);
  const [editingProvider, setEditingProvider] =
    useState<PaymentProvider | null>(null);
  const [bankAccount, setBankAccount] = useState<BankAccount>({
    accountName: "",
    accountNumber: "",
    bankName: "",
    routingNumber: "",
  });
  const [providerForm, setProviderForm] = useState({
    name: "stripe",
    currency: "BDT",
    api_key: "",
    secret_key: "",
  });

  useEffect(() => {
    const loadProviders = async () => {
      try {
        const res = await api.get("/fundraiser/payment-providers");
        setProviders(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (error) {
        console.error("Failed to fetch providers:", error);
        setProviders([]);
      }
    };
    loadProviders();
  }, []);

  const handleAddProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingProvider) {
        await api.put(`/fundraiser/payment-providers/${editingProvider.id}`, {
          name: providerForm.name,
          currency: providerForm.currency,
          config: {
            api_key: providerForm.api_key,
            secret_key: providerForm.secret_key,
          },
        });
        toast.success("Provider updated successfully");
      } else {
        await api.post("/fundraiser/payment-providers", {
          name: providerForm.name,
          currency: providerForm.currency,
          isDefault: providers.length === 0,
          config: {
            api_key: providerForm.api_key,
            secret_key: providerForm.secret_key,
          },
        });
        toast.success("Provider added successfully");
      }
      const res = await api.get("/fundraiser/payment-providers");
      setProviders(Array.isArray(res.data.data) ? res.data.data : []);
      setShowProviderForm(false);
      setEditingProvider(null);
      setProviderForm({
        name: "stripe",
        currency: "BDT",
        api_key: "",
        secret_key: "",
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          "Failed to save provider. Please check your credentials.",
      );
      console.error("Failed to save provider:", error);
    }
    setLoading(false);
  };

  const handleSaveBankAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBankForm(false);
  };

  const handleSetDefault = async (providerId: string) => {
    try {
      await api.patch(`/fundraiser/payment-providers/${providerId}/default`);
      const res = await api.get("/fundraiser/payment-providers");
      setProviders(Array.isArray(res.data.data) ? res.data.data : []);
      toast.success("Default provider updated successfully");
    } catch (error) {
      toast.error("Failed to update default provider");
      console.error("Failed to set default:", error);
    }
  };

  const handleToggleActive = async (providerId: string) => {
    try {
      await api.patch(`/fundraiser/payment-providers/${providerId}/toggle`);
      const res = await api.get("/fundraiser/payment-providers");
      setProviders(Array.isArray(res.data.data) ? res.data.data : []);
      toast.success("Provider status updated");
    } catch (error) {
      toast.error("Failed to toggle provider status");
      console.error("Failed to toggle:", error);
    }
  };

  const handleDelete = async (providerId: string) => {
    if (!confirm("Are you sure you want to delete this provider?")) return;
    try {
      await api.delete(`/fundraiser/payment-providers/${providerId}`);
      const res = await api.get("/fundraiser/payment-providers");
      setProviders(Array.isArray(res.data.data) ? res.data.data : []);
      toast.success("Provider deleted successfully");
    } catch (error) {
      toast.error("Failed to delete provider");
      console.error("Failed to delete:", error);
    }
  };

  const handleEdit = (provider: PaymentProvider) => {
    setEditingProvider(provider);
    setProviderForm({
      name: provider.name,
      currency: provider.currency,
      api_key: provider.config.api_key,
      secret_key: provider.config.secret_key,
    });
    setShowProviderForm(true);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payouts & Banking</h1>
        <p className="text-gray-500 text-sm">
          Manage where you receive your funds.
        </p>
      </div>

      {/* Balance Card */}
      <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
        <p className="text-slate-300 text-sm">Available Balance</p>
        <h2 className="text-4xl font-bold my-2">$24,500.00</h2>
        <div className="flex gap-3 mt-4">
          <Button className="bg-white text-slate-900 hover:bg-gray-100">
            Withdraw Funds
          </Button>
          <Button
            variant="outline"
            className="bg-white text-slate-900 hover:bg-gray-100"
          >
            View History
          </Button>
        </div>
      </div>

      {/* Bank Account Setup */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Landmark className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg">Bank Account</h3>
          </div>
          <Button size="sm" onClick={() => setShowBankForm(!showBankForm)}>
            <Plus className="h-4 w-4 mr-1" /> Add Account
          </Button>
        </div>

        {showBankForm && (
          <form
            onSubmit={handleSaveBankAccount}
            className="space-y-4 border-t pt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Account Name</Label>
                <Input
                  value={bankAccount.accountName}
                  onChange={(e) =>
                    setBankAccount({
                      ...bankAccount,
                      accountName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label>Account Number</Label>
                <Input
                  value={bankAccount.accountNumber}
                  onChange={(e) =>
                    setBankAccount({
                      ...bankAccount,
                      accountNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label>Bank Name</Label>
                <Input
                  value={bankAccount.bankName}
                  onChange={(e) =>
                    setBankAccount({ ...bankAccount, bankName: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Routing Number</Label>
                <Input
                  value={bankAccount.routingNumber}
                  onChange={(e) =>
                    setBankAccount({
                      ...bankAccount,
                      routingNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save Account</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBankForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Payment Providers */}
      <div className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-lg">Payment Providers</h3>
          </div>
          <Button
            size="sm"
            onClick={() => setShowProviderForm(!showProviderForm)}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Provider
          </Button>
        </div>

        {providers.length === 0 && !showProviderForm && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0" />
            <p className="text-sm text-yellow-800">
              No payment provider configured. Add one to receive donations.
            </p>
          </div>
        )}

        {providers.map((provider) => (
          <div
            key={provider.id}
            className={`rounded-lg p-4 flex items-center justify-between ${
              provider.isActive
                ? "bg-green-50 border border-green-200"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {provider.isActive ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {provider.name} {provider.isDefault && "(Default)"}
                  {!provider.isActive && " - Inactive"}
                </p>
                <p className="text-sm text-gray-600">
                  Currency: {provider.currency}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleToggleActive(provider.id)}
                title={provider.isActive ? "Deactivate" : "Activate"}
              >
                <Power className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(provider)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              {!provider.isDefault && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSetDefault(provider.id)}
                  >
                    Set Default
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(provider.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}

        {showProviderForm && (
          <form
            onSubmit={handleAddProvider}
            className="space-y-4 border-t pt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Provider</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={providerForm.name}
                  onChange={(e) =>
                    setProviderForm({ ...providerForm, name: e.target.value })
                  }
                >
                  <option value="stripe">Stripe</option>
                  <option value="sslcommerz">SSLCommerz</option>
                </select>
              </div>
              <div>
                <Label>Currency</Label>
                <Input
                  value={providerForm.currency}
                  onChange={(e) =>
                    setProviderForm({
                      ...providerForm,
                      currency: e.target.value,
                    })
                  }
                  placeholder="USD, BDT, etc."
                  required
                />
              </div>
              <div>
                <Label>API Key</Label>
                <Input
                  value={providerForm.api_key}
                  onChange={(e) =>
                    setProviderForm({
                      ...providerForm,
                      api_key: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label>Secret Key</Label>
                <Input
                  type="password"
                  value={providerForm.secret_key}
                  onChange={(e) =>
                    setProviderForm({
                      ...providerForm,
                      secret_key: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingProvider
                    ? "Update Provider"
                    : "Add Provider"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowProviderForm(false);
                  setEditingProvider(null);
                  setProviderForm({
                    name: "stripe",
                    currency: "BDT",
                    api_key: "",
                    secret_key: "",
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
