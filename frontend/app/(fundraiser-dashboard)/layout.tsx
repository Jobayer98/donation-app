import FundraiserSidebar from "@/components/fundraiser-dashboard/FundraiserSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function FundraiserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['FUND_RAISER']}>
      <div className="flex h-screen bg-gray-50/30">
        <FundraiserSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
