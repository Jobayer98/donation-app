import Header from "@/components/donor/Header";
import HeroSection from "@/components/donor/HeroSection";
import StatsBar from "@/components/donor/StatsBar";
import CampaignList from "@/components/donor/CampaignList";
import Footer from "@/components/public-profile/Footer";

export default function PublicHomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex-1">
        <HeroSection />
        <StatsBar />
        <CampaignList />
      </div>
      <Footer />
    </main>
  );
}
