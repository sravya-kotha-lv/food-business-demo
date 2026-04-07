import { networkData, treeData } from "@/data/mlmData";
import { GitBranch, Users, TrendingUp } from "lucide-react";

interface TreeNode {
  name: string;
  rank: string;
  sales: string;
  children: TreeNode[];
}

const rankColors: Record<string, string> = {
  Diamond: "gradient-primary",
  Platinum: "bg-info",
  Gold: "bg-warning",
  Silver: "bg-muted-foreground",
  Bronze: "bg-secondary",
};

const TreeNodeCard = ({ node, depth = 0 }: { node: TreeNode; depth?: number }) => (
  <div className="flex flex-col items-center">
    <div className="bg-card rounded-xl p-4 border border-border shadow-sm min-w-[160px] text-center hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-full ${rankColors[node.rank] || "gradient-primary"} flex items-center justify-center text-xs font-bold text-primary-foreground mx-auto mb-2`}>
        {node.name.split(" ").map(n => n[0]).join("")}
      </div>
      <p className="text-sm font-semibold text-card-foreground">{node.name}</p>
      <p className="text-xs text-muted-foreground">{node.rank}</p>
      <p className="text-xs font-medium text-success mt-1">{node.sales}</p>
    </div>
    {node.children.length > 0 && (
      <>
        <div className="w-px h-6 bg-border" />
        <div className="flex gap-4 relative">
          {node.children.length > 1 && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px bg-border" style={{ width: `calc(100% - 160px)` }} />
          )}
          {node.children.map((child, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-6 bg-border" />
              <TreeNodeCard node={child} depth={depth + 1} />
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

const Network = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-bold text-foreground">My Network</h1>
      <p className="text-muted-foreground mt-1">View your downline tree and level-wise performance.</p>
    </div>

    {/* Level Summary */}
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {networkData.map((level) => (
        <div key={level.level} className="bg-card rounded-xl p-5 border border-border text-center">
          <p className="text-xs font-medium text-muted-foreground">{level.level}</p>
          <p className="text-2xl font-bold text-card-foreground mt-1">{level.members}</p>
          <p className="text-xs text-muted-foreground mt-1">Commission: {level.commission}</p>
          <p className="text-sm font-semibold text-success mt-1">₹{level.earnings.toLocaleString()}</p>
        </div>
      ))}
    </div>

    {/* Tree View */}
    <div className="bg-card rounded-xl p-8 border border-border overflow-x-auto">
      <h3 className="font-semibold text-card-foreground mb-6 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-primary" /> Network Tree
      </h3>
      <div className="flex justify-center min-w-[800px]">
        <TreeNodeCard node={treeData} />
      </div>
    </div>
  </div>
);

export default Network;
