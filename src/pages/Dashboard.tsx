import { useState } from "react";
import { Users, IndianRupee, TrendingUp, UserPlus, ShoppingBag, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import StatCard from "@/components/StatCard";
import { dashboardStats, revenueData, topPerformers } from "@/data/mlmData";
import AddMemberDialog from "@/components/AddMemberDialog";
import NewOrderDialog from "@/components/NewOrderDialog";
import PayCommissionDialog from "@/components/PayCommissionDialog";

const Dashboard = () => {
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [payCommissionOpen, setPayCommissionOpen] = useState(false);

  const quickActions = [
    { icon: UserPlus, label: "Add Member", color: "gradient-primary", onClick: () => setAddMemberOpen(true) },
    { icon: ShoppingBag, label: "New Order", color: "gradient-secondary", onClick: () => setNewOrderOpen(true) },
    { icon: IndianRupee, label: "Pay Commission", color: "gradient-primary", onClick: () => setPayCommissionOpen(true) },
    { icon: Award, label: "Rank Reports", color: "gradient-secondary", onClick: () => {} },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your business overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Members" value={dashboardStats.totalMembers.toLocaleString()} change="12% this month" icon={Users} />
        <StatCard title="Monthly Revenue" value={`₹${(dashboardStats.monthlyRevenue / 1000).toFixed(0)}K`} change="8.2% vs last month" icon={IndianRupee} iconBg="gradient-secondary" />
        <StatCard title="Total Commissions" value={`₹${(dashboardStats.totalCommissions / 1000).toFixed(0)}K`} change="15% this month" icon={TrendingUp} />
        <StatCard title="New Joinings" value={dashboardStats.newJoinings.toLocaleString()} change="23% this month" icon={UserPlus} iconBg="gradient-secondary" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4">Revenue & Commissions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(145, 63%, 32%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(145, 63%, 32%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(30, 80%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(30, 80%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 88%)" />
              <XAxis dataKey="month" stroke="hsl(150, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(150, 10%, 45%)" fontSize={12} tickFormatter={(v) => `₹${v / 1000}K`} />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(145, 63%, 32%)" fill="url(#colorRevenue)" strokeWidth={2} />
              <Area type="monotone" dataKey="commissions" stroke="hsl(30, 80%, 55%)" fill="url(#colorComm)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Performers */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-card-foreground mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {p.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-card-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.rank} · {p.team} team</p>
                </div>
                <p className="text-sm font-semibold text-success">₹{(p.sales / 1000).toFixed(0)}K</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center`}>
              <action.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-card-foreground">{action.label}</span>
          </button>
        ))}
      </div>

      <AddMemberDialog open={addMemberOpen} onOpenChange={setAddMemberOpen} />
      <NewOrderDialog open={newOrderOpen} onOpenChange={setNewOrderOpen} />
      <PayCommissionDialog open={payCommissionOpen} onOpenChange={setPayCommissionOpen} />
    </div>
  );
};

export default Dashboard;
