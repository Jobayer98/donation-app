import Sidebar from "@/components/donor-dashboard/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DonorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['DONOR']}>
      <div className="flex h-screen bg-gray-50/30">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
