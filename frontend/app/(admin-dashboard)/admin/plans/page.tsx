/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminApi } from "@/lib/api/admin";
import { toast } from "sonner";
import { Plus, Edit } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: number;
  maxCampaigns: number;
  isActive: boolean;
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [open, setOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "PRO" as "FREE" | "PRO",
    price: 0,
    interval: "MONTHLY" as "MONTHLY" | "YEARLY",
    features: {} as Record<string, string>,
    limits: {
      maxCampaigns: 0,
      maxPaymentProviders: 0,
    },
  });
  const [featureKey, setFeatureKey] = useState("");
  const [featureValue, setFeatureValue] = useState("");

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    adminApi
      .getPlans()
      .then((res) => setPlans(res.data.data))
      .catch(console.error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editPlan) {
        await adminApi.updatePlan(editPlan.id, formData);
        toast.success("Plan updated successfully");
      } else {
        await adminApi.createPlan(formData);
        toast.success("Plan created successfully");
      }
      setOpen(false);
      setEditPlan(null);
      setFormData({
        name: "",
        type: "PRO",
        price: 0,
        interval: "MONTHLY",
        features: {},
        limits: { maxCampaigns: 0, maxPaymentProviders: 0 },
      });
      loadPlans();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save plan");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await adminApi.togglePlanStatus(id);
      toast.success("Plan status updated");
      loadPlans();
    } catch (error) {
      toast.error("Failed to update plan status");
    }
  };

  const openEdit = (plan: Plan) => {
    setEditPlan(plan);
    setFormData({
      name: plan.name,
      type: plan.type as "FREE" | "PRO",
      price: plan.price,
      interval: plan.duration === 365 ? "YEARLY" : "MONTHLY",
      features: {},
      limits: {
        maxCampaigns: plan.maxCampaigns,
        maxPaymentProviders: 0,
      },
    });
    setOpen(true);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Plan Management</h1>
          <p className="text-gray-500 text-sm">
            Create and manage subscription plans.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditPlan(null);
                setFormData({
                  name: "",
                  type: "PRO",
                  price: 0,
                  interval: "MONTHLY",
                  features: {},
                  limits: { maxCampaigns: 0, maxPaymentProviders: 0 },
                });
              }}
            >
              <Plus className="h-4 w-4 mr-2" /> Create Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editPlan ? "Edit Plan" : "Create Plan"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label>Plan Type</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as "FREE" | "PRO",
                    })
                  }
                  disabled={!!editPlan}
                >
                  <option value="FREE">Free</option>
                  <option value="PRO">Pro</option>
                </select>
                {!editPlan && (
                  <p className="text-xs text-gray-500 mt-1">
                    Note: Only one plan per type allowed
                  </p>
                )}
              </div>
              <div>
                <Label>Interval</Label>
                <select
                  className="w-full border rounded-md p-2"
                  value={formData.interval}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      interval: e.target.value as "MONTHLY" | "YEARLY",
                    })
                  }
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div>
                <Label>Max Campaigns</Label>
                <Input
                  type="number"
                  value={formData.limits.maxCampaigns}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      limits: {
                        ...formData.limits,
                        maxCampaigns: Number(e.target.value),
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label>Max Payment Providers</Label>
                <Input
                  type="number"
                  value={formData.limits.maxPaymentProviders}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      limits: {
                        ...formData.limits,
                        maxPaymentProviders: Number(e.target.value),
                      },
                    })
                  }
                  required
                />
              </div>
              <div>
                <Label>Features</Label>
                <div className="space-y-2">
                  {Object.entries(formData.features).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{key}:</span>
                      <span>{value}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newFeatures = { ...formData.features };
                          delete newFeatures[key];
                          setFormData({ ...formData, features: newFeatures });
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Key"
                      value={featureKey}
                      onChange={(e) => setFeatureKey(e.target.value)}
                    />
                    <Input
                      placeholder="Value"
                      value={featureValue}
                      onChange={(e) => setFeatureValue(e.target.value)}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        if (featureKey && featureValue) {
                          setFormData({
                            ...formData,
                            features: {
                              ...formData.features,
                              [featureKey]: featureValue,
                            },
                          });
                          setFeatureKey("");
                          setFeatureValue("");
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                {editPlan ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white p-6 rounded-xl border shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <Badge
                  className={`text-xs mt-1 ${plan.isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openEdit(plan)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-2xl font-bold text-gray-900">${plan.price}</p>
              <p className="text-gray-600">Type: {plan.type}</p>
              <p className="text-gray-600">Duration: {plan.duration} days</p>
              <p className="text-gray-600">
                Max Campaigns: {plan.maxCampaigns}
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => handleToggle(plan.id)}
            >
              {plan.isActive ? "Deactivate" : "Activate"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
