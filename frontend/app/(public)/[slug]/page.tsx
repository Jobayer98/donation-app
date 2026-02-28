import Image from "next/image";
import axios from "axios";
import { notFound } from "next/navigation";
import { Heart, Calendar, TrendingUp, ExternalLink } from "lucide-react";

interface Campaign {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  goalAmount: number;
  raisedAmount: number;
  endDate: string;
  status: string;
}

interface Organization {
  id: string;
  name: string;
  logoUrl?: string;
  description?: string;
  primaryColor: string;
  secondaryColor: string;
}

interface LandingPageContent {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroImageUrl?: string | null;
  featuredCampaignId?: string | null;
  showActiveCampaigns: boolean;
  activeCampaignsTitle: string;
  footerText?: string | null;
  footerLinks?: { label: string; url: string }[] | null;
}

async function getLandingPageData(slug: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/landing-page/${slug}`,
      { cache: 'no-store' } as any
    );
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export default async function TenantLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getLandingPageData(params.slug);

  if (!data) {
    notFound();
  }

  const {
    organization,
    content,
    activeCampaigns,
    featuredCampaign,
  }: {
    organization: Organization;
    content: LandingPageContent | null;
    activeCampaigns: Campaign[];
    featuredCampaign: Campaign | null;
  } = data;

  const progressPercentage = (campaign: Campaign) =>
    Math.min((Number(campaign.raisedAmount) / Number(campaign.goalAmount)) * 100, 100);

  const daysLeft = (endDate: string) => {
    const days = Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  // Fallback values
  const defaultHeroTitle = content?.heroTitle || `Welcome to ${organization.name}`;
  const defaultHeroSubtitle = content?.heroSubtitle || organization.description || "Support our mission and make a difference today";
  const showActiveCampaigns = content?.showActiveCampaigns ?? true;
  const activeCampaignsTitle = content?.activeCampaignsTitle || "Active Campaigns";
  const footerText = content?.footerText || `© ${new Date().getFullYear()} ${organization.name}. All rights reserved.`;
  const footerLinks = content?.footerLinks || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
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
            {defaultHeroTitle}
          </h1>
          <p className="text-2xl mb-10 max-w-3xl mx-auto drop-shadow">
            {defaultHeroSubtitle}
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
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-12">
              <Heart className="h-8 w-8 text-red-500" fill="currentColor" />
              <h2 className="text-4xl font-bold text-center">Featured Campaign</h2>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow">
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
                    className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
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
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2"
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
                      className="w-full py-3 rounded-lg text-white font-semibold shadow hover:shadow-lg transition-all"
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
        <section className="py-20 px-6">
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
          
          {footerLinks.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              {footerLinks.map((link, index) => (
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
            <p>{footerText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
