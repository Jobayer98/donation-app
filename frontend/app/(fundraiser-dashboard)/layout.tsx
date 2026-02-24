import FundraiserSidebar from "@/components/fundraiser-dashboard/FundraiserSidebar";

export default function FundraiserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50/30">
      <FundraiserSidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
