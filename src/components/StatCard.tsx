import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  icon: LucideIcon;
  iconBg?: string;
}

const StatCard = ({ title, value, change, changeType = "positive", icon: Icon, iconBg = "gradient-primary" }: StatCardProps) => (
  <div className="bg-card rounded-xl p-6 border border-border stat-glow animate-fade-in">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1 text-card-foreground">{value}</p>
        {change && (
          <p className={`text-xs mt-2 font-medium ${changeType === "positive" ? "text-success" : "text-destructive"}`}>
            {changeType === "positive" ? "↑" : "↓"} {change}
          </p>
        )}
      </div>
      <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
    </div>
  </div>
);

export default StatCard;
