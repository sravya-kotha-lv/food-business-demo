import { members } from "@/data/mlmData";
import { Search, Download } from "lucide-react";
import { useState } from "react";

const rankBadge: Record<string, string> = {
  Diamond: "gradient-primary text-primary-foreground",
  Platinum: "bg-info text-info-foreground",
  Gold: "bg-warning text-warning-foreground",
  Silver: "bg-muted text-muted-foreground",
  Bronze: "bg-secondary text-secondary-foreground",
};

const Members = () => {
  const [search, setSearch] = useState("");
  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Members</h1>
          <p className="text-muted-foreground mt-1">Manage your network members and their performance.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {["ID", "Member", "Rank", "Sponsor", "Personal Sales", "Team Sales", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono text-muted-foreground">{m.id}</td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${rankBadge[m.rank] || "bg-muted text-muted-foreground"}`}>
                      {m.rank}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{m.sponsor}</td>
                  <td className="px-5 py-4 text-sm font-medium text-card-foreground">₹{m.personalSales.toLocaleString()}</td>
                  <td className="px-5 py-4 text-sm font-medium text-card-foreground">₹{m.teamSales.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${m.status === "Active" ? "bg-accent text-accent-foreground" : "bg-destructive/10 text-destructive"}`}>
                      {m.status}
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
};

export default Members;
