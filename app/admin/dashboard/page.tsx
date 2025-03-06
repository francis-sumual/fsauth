import { getServerSession } from "next-auth/next";

export default async function Dashboard() {
  const session = await getServerSession();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard.</p>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{session?.user?.name || "User"}</span>
            <span className="text-xs text-muted-foreground truncate">{session?.user?.email || "user@example.com"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
