"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eye, ArrowLeft, Edit, Heart, Calendar, TrendingUp, ExternalLink } from "lucide-react";
import Link from "next/link";
import { fundraiserApi } from "@/lib/api/fundraiser";
import { toast } from "sonner";

interface Campaign {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  goalAmount: number;
  raisedAmount: number;
  endDate: string;
}

interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  primaryColor: string;
  secondaryColor: string;
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

export default function PublicPreviewPage() {
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [content, setContent] = useState<LandingPageContent | null>(null);
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [featuredCampaign, setFeaturedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    loadPreviewData();
  }, []);

  const loadPreviewData = async () => {
    try {
      const [contentResponse, campaignsResponse, orgResponse] = await Promise.all([
        fundraiserApi.getLandingPageContent(),
        fundraiserApi.getCampaigns(),
        fundraiserApi.getOrganization(),
      ]);

      const loadedContent = contentResponse.data.data;
      const orgData = orgResponse.data.data;
      
      setOrganization(orgData);
      setContent(loadedContent);

      const campaigns = campaignsResponse.data.data.filter(
        (c: any) => c.status === "ACTIVE"
      );
      setActiveCampaigns(campaigns);

      if (loadedContent.featuredCampaignId) {
        const featured = campaigns.find(
          (c: Campaign) => c.id === loadedContent.featuredCampaignId
        );
        setFeaturedCampaign(featured || null);
      }
    } catch (error: any) {
      console.error("Preview error:", error);
      toast.error(error.response?.data?.message || "Failed to load preview data");
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = (campaign: Campaign) =>
    Math.min((Number(campaign.raisedAmount) / Number(campaign.goalAmount)) * 100, 100);

  const daysLeft = (endDate: string) => {
    const days = Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (loading) {
    return <div className="p-6">Loading preview...</div>;
  }

  if (!organization) {
    return <div className="p-6">Failed to load organization data</div>;
  }

  const defaultHeroTitle = `Welcome to ${organization.name}`;
  const defaultHeroSubtitle = organization.description || "Support our mission and make a difference today";
  const showActiveCampaigns = content?.showActiveCampaigns ?? true;
  const activeCampaignsTitle = content?.activeCampaignsTitle || "Active Campaigns";
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Preview Mode Banner */}
      <div className="sticky top-0 z-50 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
          <Eye className="h-5 w-5" />
          <span className="text-sm font-semibold">Preview Mode</span>
          <span className="text-xs text-yellow-600 dark:text-yellow-400 hidden sm:inline">
            — This is how visitors see your landing page
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/fundraiser/landing-page">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-900/40"
            >
              <Edit className="h-3.5 w-3.5" /> Edit Page
            </Button>
          </Link>
          <Link href="/fundraiser">
            <Button
              variant="ghost"
              size="sm"
              className="text-yellow-800 dark:text-yellow-200 hover:bg-yellow-100 dark:hover:bg-yellow-900/40"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Landing Page Content */}
      <div>
        {/* Hero Section */}
        <section
          className="relative py-24 px-6 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${organization.primaryColor} 0%, ${organization.secondaryColor} 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="max-w-6xl mx-auto text-center text-white relative z-10">
            {organization.logoUrl && (
              <div className="mb-8">
                <Image
                  src={organization.logoUrl}
                  alt={organization.name}
                  width={80}
                  height={80}
                  className="mx-auto rounded-full shadow-lg"
                />
              </div>
            )}
            <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
              {content?.heroTitle || defaultHeroTitle}
            </h1>
            <p className="text-2xl mb-10 max-w-3xl mx-auto drop-shadow">
              {content?.heroSubtitle || defaultHeroSubtitle}
            </p>
            {content?.heroImageUrl && (
              <div className="mt-12">
                <Image
                  src={content.heroImageUrl}
                  alt="Hero"
                  width={1200}
                  height={600}
                  className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl"
                />
              </div>
            )}
          </div>
        </section>

        {/* Featured Campaign */}
        {featuredCampaign && (
          <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-12">
                <Heart className="h-8 w-8 text-red-500" fill="currentColor" />
                <h2 className="text-4xl font-bold text-center">Featured Campaign</h2>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="md:flex">
                  {featuredCampaign.imageUrl && (
                    <div className="md:w-1/2 relative h-80 md:h-auto">
                      <Image
                        src={featuredCampaign.imageUrl}
                        alt={featuredCampaign.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-10 md:w-1/2 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-4">{featuredCampaign.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                      {featuredCampaign.description}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-3xl font-bold" style={{ color: organization.primaryColor }}>
                            ${Number(featuredCampaign.raisedAmount).toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">raised of ${Number(featuredCampaign.goalAmount).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{Math.round(progressPercentage(featuredCampaign))}%</p>
                          <p className="text-sm text-gray-500">funded</p>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-4 rounded-full transition-all duration-500"
                          style={{
                            width: `${progressPercentage(featuredCampaign)}%`,
                            background: `linear-gradient(90deg, ${organization.primaryColor}, ${organization.secondaryColor})`,
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <Calendar className="h-5 w-5" />
                        <span>{daysLeft(featuredCampaign.endDate)} days left</span>
                      </div>
                    </div>
                    
                    <button
                      className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${organization.primaryColor}, ${organization.secondaryColor})` }}
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Active Campaigns */}
        {showActiveCampaigns && activeCampaigns.length > 0 && (
          <section className="py-20 px-6 bg-white dark:bg-gray-900">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-12">
                <TrendingUp className="h-8 w-8" style={{ color: organization.primaryColor }} />
                <h2 className="text-4xl font-bold text-center">
                  {activeCampaignsTitle}
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {activeCampaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    {campaign.imageUrl && (
                      <div className="relative h-56">
                        <Image
                          src={campaign.imageUrl}
                          alt={campaign.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">{campaign.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm">
                        {campaign.description}
                      </p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="font-bold" style={{ color: organization.primaryColor }}>
                            ${Number(campaign.raisedAmount).toLocaleString()}
                          </span>
                          <span className="text-gray-500">
                            ${Number(campaign.goalAmount).toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full transition-all"
                            style={{
                              width: `${progressPercentage(campaign)}%`,
                              background: organization.primaryColor,
                            }}
                          />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>{daysLeft(campaign.endDate)} days left</span>
                        </div>
                      </div>
                      
                      <button
                        className="w-full py-3 rounded-lg text-white font-semibold shadow"
                        style={{ background: organization.primaryColor }}
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {activeCampaigns.length === 0 && !featuredCampaign && (
          <section className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg">
              <div className="mb-6">
                <Heart className="h-20 w-20 mx-auto text-gray-300" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Coming Soon</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                We're preparing exciting campaigns. Check back soon to see how you can make a difference!
              </p>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              {organization.logoUrl && (
                <Image
                  src={organization.logoUrl}
                  alt={organization.name}
                  width={60}
                  height={60}
                  className="mx-auto mb-4 rounded-full"
                />
              )}
              <h3 className="text-2xl font-bold mb-2">{organization.name}</h3>
            </div>
            
            {content?.footerLinks && content.footerLinks.length > 0 && (
              <div className="flex flex-wrap justify-center gap-8 mb-8">
                {content.footerLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
            
            <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-8">
              <p>{content?.footerText || `© ${new Date().getFullYear()} ${organization.name}. All rights reserved.`}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
