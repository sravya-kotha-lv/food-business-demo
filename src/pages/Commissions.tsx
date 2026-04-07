import { commissions, dashboardStats } from "@/data/mlmData";
import { IndianRupee, Clock, CheckCircle, AlertCircle } from "lucide-react";
import StatCard from "@/components/StatCard";

const statusStyles: Record<string, string> = {
  Paid: "bg-accent text-accent-foreground",
  Pending: "bg-warning/10 text-warning",
  Processing: "bg-info/10 text-info",
};

const Commissions = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Commissions</h1>
      <p className="text-muted-foreground mt-1">Track all commission payouts and earnings.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Total Paid" value={`₹${(dashboardStats.totalCommissions / 1000).toFixed(0)}K`} icon={CheckCircle} />
      <StatCard title="Pending" value={`₹${(dashboardStats.pendingCommissions / 1000).toFixed(0)}K`} icon={Clock} iconBg="gradient-secondary" />
      <StatCard title="This Month" value="₹51,780" change="+8.2%" icon={IndianRupee} />
    </div>

    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {["ID", "Member", "Type", "Amount", "Date", "Status"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {commissions.map((c) => (
              <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4 text-sm font-mono text-muted-foreground">{c.id}</td>
                <td className="px-5 py-4 text-sm font-medium text-card-foreground">{c.member}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{c.type}</td>
                <td className="px-5 py-4 text-sm font-semibold text-success">₹{c.amount.toLocaleString()}</td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{c.date}</td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[c.status]}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Commissions;
