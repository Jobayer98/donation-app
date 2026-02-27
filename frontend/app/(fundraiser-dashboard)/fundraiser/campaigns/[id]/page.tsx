"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";

interface CampaignData {
  title: string;
  description: string;
  imageUrl: string;
  goalAmount: number;
  category: string;
  startDate: string;
  endDate: string;
  type: string;
}

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CampaignData>({
    title: "",
    description: "",
    imageUrl: "",
    goalAmount: 0,
    category: "",
    startDate: "",
    endDate: "",
    type: "donation",
  });

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await api.get(
          `fundraiser/campaigns/${params.id}`,
        );
        const data = res.data.data;
        setFormData({
          title: data.title,
          description: data.description,
          imageUrl: data.imageUrl || "",
          goalAmount: data.goalAmount,
          category: data.category,
          startDate: data.startDate
            ? new Date(data.startDate).toISOString().slice(0, 16)
            : "",
          endDate: data.endDate
            ? new Date(data.endDate).toISOString().slice(0, 16)
            : "",
          type: data.type,
        });
      } catch (error) {
        toast.error("Failed to load campaign");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaign();
  }, [params.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "goalAmount" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        goalAmount: Number(formData.goalAmount),
        category: formData.category,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        type: formData.type,
      };

      await api.patch(`fundraiser/campaigns/${params.id}`, payload);
      toast.success("Campaign updated successfully");
      router.push("/fundraiser/campaigns");
    } catch (error) {
      toast.error("Failed to update campaign");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Campaign</h1>
          <p className="text-gray-500 text-sm">Update your campaign details</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goalAmount">Goal Amount ($)</Label>
              <Input
                id="goalAmount"
                name="goalAmount"
                type="number"
                value={formData.goalAmount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => handleSelectChange("category", value)}
                value={formData.category}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Zakat">Zakat</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Campaign Type</Label>
            <Select
              onValueChange={(value) => handleSelectChange("type", value)}
              value={formData.type}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="donation">Donation</SelectItem>
                <SelectItem value="crowdfunding">Crowd Funding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="datetime-local"
                value={formData.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="datetime-local"
                value={formData.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Cover Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update Campaign"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
