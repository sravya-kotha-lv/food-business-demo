import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { members } from "@/data/mlmData";

const commissionTypes = [
  "Direct Referral",
  "Level Bonus",
  "Team Bonus",
  "Rank Achievement",
  "Leadership Bonus",
];

const paymentModes = ["Bank Transfer", "UPI", "Wallet Credit", "Cheque"];

interface PayCommissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PayCommissionDialog = ({ open, onOpenChange }: PayCommissionDialogProps) => {
  const [form, setForm] = useState({
    member: "",
    type: "",
    amount: "",
    paymentMode: "",
    remarks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.member || !form.type || !form.amount || !form.paymentMode) {
      toast.error("Please fill in all required fields");
      return;
    }
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    toast.success("Commission paid successfully!", {
      description: `₹${amount.toLocaleString()} paid to ${form.member} via ${form.paymentMode}`,
    });
    setForm({ member: "", type: "", amount: "", paymentMode: "", remarks: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-primary-foreground" />
            </div>
            Pay Commission
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Member *</Label>
            <Select value={form.member} onValueChange={(v) => setForm({ ...form, member: v })}>
              <SelectTrigger><SelectValue placeholder="Select member" /></SelectTrigger>
              <SelectContent>
                {members.map((m) => (
                  <SelectItem key={m.id} value={m.name}>{m.name} — {m.rank}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Commission Type *</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  {commissionTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount (₹) *</Label>
              <Input type="number" placeholder="0.00" min="1" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Payment Mode *</Label>
            <Select value={form.paymentMode} onValueChange={(v) => setForm({ ...form, paymentMode: v })}>
              <SelectTrigger><SelectValue placeholder="Select payment mode" /></SelectTrigger>
              <SelectContent>
                {paymentModes.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Input placeholder="Optional remarks..." value={form.remarks} onChange={(e) => setForm({ ...form, remarks: e.target.value })} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Pay Commission</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PayCommissionDialog;
