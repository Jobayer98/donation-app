"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Plus, Loader2, Upload } from "lucide-react";
import { CampaignFormData, CampaignSchema } from "@/lib/validators/campaign";
import api from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function CreateCampaignModal({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    title: "",
    description: "",
    imageUrl: "",
    goalAmount: 0,
    category: "",
    startDate: "",
    endDate: "",
    type: "donation",
  });

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
    setIsLoading(true);

    const validation = CampaignSchema.safeParse(formData);

    if (!validation.success) {
      toast.error(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      // Format dates to ISO strings for backend
      const payload = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        goalAmount: formData.goalAmount,
        category: formData.category,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        type: formData.type,
      };

      const res = await api.post("dashboard/fundraiser/campaigns", payload);
      console.log(res.data);
      toast.success("Campaign created successfully");
      onSuccess?.();
      setIsOpen(false);
      // Reset form
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        goalAmount: 0,
        category: "",
        startDate: "",
        endDate: "",
        type: "donation",
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message || "Failed to create campaign",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700 gap-2 shadow-md shadow-green-100">
          <Plus className="h-4 w-4" /> Create Campaign
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Create New Campaign
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to launch a new fundraising campaign.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Donate poor and orphans"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your campaign goal and mission..."
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Goal Amount & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="goalAmount">Goal Amount ($)</Label>
              <Input
                id="goalAmount"
                name="goalAmount"
                type="number"
                placeholder="15000"
                value={formData.goalAmount}
                onChange={handleInputChange}
                required
                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => handleSelectChange("category", value)}
                value={formData.category}
              >
                <SelectTrigger className="border-gray-200 focus:ring-green-500">
                  <SelectValue placeholder="Select category" />
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

          {/* Type (Hidden or Dropdown) - Kept as Dropdown for flexibility */}
          <div className="space-y-2">
            <Label htmlFor="type">Campaign Type</Label>
            <Select
              onValueChange={(value) => handleSelectChange("type", value)}
              value={formData.type}
            >
              <SelectTrigger className="border-gray-200 focus:ring-green-500">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="donation">Donation</SelectItem>
                <SelectItem value="crowdfunding">Crowd Funding</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
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
                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
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
                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Cover Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.png"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
              <Button
                type="button"
                variant="outline"
                className="shrink-0 border-green-600 text-green-600 hover:bg-green-50"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 min-w-30"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Launch Campaign"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
