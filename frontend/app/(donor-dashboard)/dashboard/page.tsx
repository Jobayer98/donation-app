import ImpactStats from "@/components/donor-dashboard/ImpactStats";
import RecentDonations from "@/components/donor-dashboard/RecentDonations";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DonorDashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, John 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Here's what's happening with your impact today.
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 gap-2 shadow-md shadow-green-100">
          <Plus className="h-4 w-4" /> Donate Now
        </Button>
      </div>

      {/* Stats Section */}
      <ImpactStats />

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column (wider) */}
        <div className="lg:col-span-2 space-y-6">
          <RecentDonations />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-xl p-6 text-white shadow-lg shadow-green-200/50">
            <h3 className="font-bold text-lg mb-2">Spread the Word</h3>
            <p className="text-white/80 text-sm mb-4">
              Invite friends to join EcoKind. Get $10 credit for every friend
              who donates.
            </p>
            <Button
              variant="secondary"
              className="bg-white text-green-700 hover:bg-gray-100"
            >
              Invite Friends
            </Button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                Download Tax Receipts
              </button>
              <button className="w-full text-left text-sm text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                Manage Payment Methods
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
