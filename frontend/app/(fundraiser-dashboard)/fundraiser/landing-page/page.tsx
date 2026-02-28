/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fundraiserApi } from "@/lib/api/fundraiser";
import { toast } from "sonner";

interface Campaign {
  id: string;
  title: string;
  imageUrl?: string;
  goalAmount: number;
  raisedAmount: number;
}

interface LandingPageContent {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  featuredCampaignId?: string;
  showActiveCampaigns: boolean;
  activeCampaignsTitle: string;
  footerText?: string;
  footerLinks?: { label: string; url: string }[];
}

export default function LandingPageManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [content, setContent] = useState<LandingPageContent>({
    showActiveCampaigns: true,
    activeCampaignsTitle: "Active Campaigns",
  });
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [footerLinks, setFooterLinks] = useState<
    { label: string; url: string }[]
  >([]);
  const [orgSlug, setOrgSlug] = useState<string>("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contentResponse, campaignsResponse] = await Promise.all([
        fundraiserApi.getLandingPageContent(),
        fundraiserApi.getCampaigns(),
      ]);

      const loadedContent = contentResponse.data.data;
      setOrgSlug(loadedContent.organization?.slug || "");

      setContent({
        heroTitle: loadedContent.heroTitle || `Welcome to `,
        heroSubtitle:
          loadedContent.heroSubtitle ||
          "Support our mission and make a difference today",
        heroImageUrl: loadedContent.heroImageUrl || "",
        featuredCampaignId: loadedContent.featuredCampaignId || "",
        showActiveCampaigns: loadedContent.showActiveCampaigns ?? true,
        activeCampaignsTitle:
          loadedContent.activeCampaignsTitle || "Active Campaigns",
        footerText:
          loadedContent.footerText ||
          `© ${new Date().getFullYear()} Your Organization. All rights reserved.`,
      });

      setFooterLinks(loadedContent.footerLinks || []);
      setCampaigns(campaignsResponse.data.data || []);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      if (content.heroTitle) formData.append("heroTitle", content.heroTitle);
      if (content.heroSubtitle)
        formData.append("heroSubtitle", content.heroSubtitle);
      if (content.featuredCampaignId)
        formData.append("featuredCampaignId", content.featuredCampaignId);
      formData.append(
        "showActiveCampaigns",
        String(content.showActiveCampaigns),
      );
      if (content.activeCampaignsTitle)
        formData.append("activeCampaignsTitle", content.activeCampaignsTitle);
      if (content.footerText) formData.append("footerText", content.footerText);
      if (footerLinks.length > 0)
        formData.append("footerLinks", JSON.stringify(footerLinks));
      if (heroImageFile) formData.append("heroImage", heroImageFile);

      await fundraiserApi.updateLandingPageContent(formData);
      toast.success("Landing page updated successfully");
      loadData();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update landing page",
      );
    } finally {
      setSaving(false);
    }
  };

  const addFooterLink = () => {
    setFooterLinks([...footerLinks, { label: "", url: "" }]);
  };

  const removeFooterLink = (index: number) => {
    setFooterLinks(footerLinks.filter((_, i) => i !== index));
  };

  const updateFooterLink = (
    index: number,
    field: "label" | "url",
    value: string,
  ) => {
    const updated = [...footerLinks];
    updated[index][field] = value;
    setFooterLinks(updated);
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Landing Page Management</h1>
        {orgSlug && (
          <a
            href={`/${orgSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Preview Page
          </a>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Hero Section</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={content.heroTitle || ""}
                onChange={(e) =>
                  setContent({ ...content, heroTitle: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                placeholder="Welcome to our platform"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use default: &quot;Welcome to [Organization Name]
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Hero Subtitle
              </label>
              <textarea
                value={content.heroSubtitle || ""}
                onChange={(e) =>
                  setContent({ ...content, heroSubtitle: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                rows={3}
                placeholder="Make a difference today"
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to use organization description
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Hero Image
              </label>
              {content.heroImageUrl && !heroImageFile && (
                <Image
                  src={content.heroImageUrl}
                  alt="Hero"
                  width={800}
                  height={192}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setHeroImageFile(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Featured Campaign */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Featured Campaign</h2>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Campaign
            </label>
            <select
              value={content.featuredCampaignId || ""}
              onChange={(e) =>
                setContent({ ...content, featuredCampaignId: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="">None</option>
              {campaigns.map((campaign) => (
                <option key={campaign.id} value={campaign.id}>
                  {campaign.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Campaigns Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Active Campaigns Section
          </h2>

          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={content.showActiveCampaigns}
                onChange={(e) =>
                  setContent({
                    ...content,
                    showActiveCampaigns: e.target.checked,
                  })
                }
                className="mr-2"
              />
              <label className="text-sm font-medium">
                Show Active Campaigns
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Section Title
              </label>
              <input
                type="text"
                value={content.activeCampaignsTitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    activeCampaignsTitle: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Footer Section</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Footer Text
              </label>
              <textarea
                value={content.footerText || ""}
                onChange={(e) =>
                  setContent({ ...content, footerText: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                rows={3}
                placeholder="© 2024 Your Organization"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Footer Links
              </label>
              {footerLinks.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) =>
                      updateFooterLink(index, "label", e.target.value)
                    }
                    placeholder="Label"
                    className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      updateFooterLink(index, "url", e.target.value)
                    }
                    placeholder="URL"
                    className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeFooterLink(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFooterLink}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
