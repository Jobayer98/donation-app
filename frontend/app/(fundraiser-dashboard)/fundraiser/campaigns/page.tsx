"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Edit,
  MoreHorizontal,
  Loader2,
  Plus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import CreateCampaignModal from "@/components/fundraiser-dashboard/CreateCampaignModal";
import { toast } from "sonner";

interface Campaign {
  id: string;
  title: string;
  status: string;
  raisedAmount: number;
  goalAmount: number;
  createdAt: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("fundraiser/campaigns");
      setCampaigns(res.data.data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast.error("Failed to load campaigns");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await api.patch(`fundraiser/campaigns/${id}/publish`);
      toast.success("Campaign published successfully");
      fetchCampaigns();
    } catch (error) {
      console.error("Error publishing campaign:", error);
      toast.error("Failed to publish campaign");
    }
  };

  const handleClose = async (id: string) => {
    try {
      await api.patch(`fundraiser/campaigns/${id}/close`);
      toast.success("Campaign closed successfully");
      fetchCampaigns();
    } catch (error) {
      console.error("Error closing campaign:", error);
      toast.error("Failed to close campaign");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Campaign Management
          </h1>
          <p className="text-gray-500 text-sm">
            Create, edit, and track your fundraising campaigns.
          </p>
        </div>
        <CreateCampaignModal onSuccess={fetchCampaigns} />
      </div>

      {/* Campaigns List/Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12 space-y-4">
              <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
              <p className="text-gray-500">Loading campaigns...</p>
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center p-12 space-y-4">
              <div className="inline-flex items-center justify-center p-4 bg-green-50 rounded-full">
                <Plus className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-gray-900 font-medium">No campaigns found</p>
              <p className="text-gray-500 max-w-xs mx-auto">
                You haven&apos;t created any campaigns yet. Start by clicking
                the &quot;Create Campaign&quot; button.
              </p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                    Campaign Name
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                    Progress
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase">
                    Created
                  </th>
                  <th className="p-4 text-xs font-semibold text-gray-500 uppercase text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {campaigns.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-medium text-gray-900">{item.title}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          item.status === "ACTIVE"
                            ? "bg-green-50 text-green-700"
                            : item.status === "COMPLETED"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-yellow-50 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      ${item.raisedAmount.toLocaleString()} / $
                      {item.goalAmount.toLocaleString()}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() =>
                              router.push(`/fundraiser/campaigns/${item.id}`)
                            }
                          >
                            <Edit className="h-4 w-4" /> Edit Campaign
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => handlePublish(item.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600 focus:text-green-600" />{" "}
                            Publish
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => handleClose(item.id)}
                          >
                            <XCircle className="h-4 w-4 text-red-600 focus:text-red-600" />{" "}
                            Close
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
