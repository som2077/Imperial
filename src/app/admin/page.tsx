import { getAdminMetricsAction } from "@/server/actions/admin";
import { AdminManager } from "./admin-manager";

export const metadata = {
  title: "Super Admin Platform Dashboard",
  description: "Platform metrics, user management, and support impersonation.",
};

export default async function AdminPage() {
  const { kpis, users } = await getAdminMetricsAction();

  return <AdminManager kpis={kpis} initialUsers={users} />;
}
