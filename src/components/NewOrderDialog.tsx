import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { products, members } from "@/data/mlmData";

interface OrderItem {
  productId: number;
  name: string;
  price: number;
  bv: number;
  qty: number;
}

interface NewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewOrderDialog = ({ open, onOpenChange }: NewOrderDialogProps) => {
  const [member, setMember] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const addProduct = () => {
    const p = products.find((pr) => pr.id === Number(selectedProduct));
    if (!p) return;
    const existing = items.find((i) => i.productId === p.id);
    if (existing) {
      setItems(items.map((i) => i.productId === p.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setItems([...items, { productId: p.id, name: p.name, price: p.price, bv: p.bv, qty: 1 }]);
    }
    setSelectedProduct("");
  };

  const updateQty = (id: number, delta: number) => {
    setItems(items.map((i) => i.productId === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const removeItem = (id: number) => setItems(items.filter((i) => i.productId !== id));

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalBV = items.reduce((s, i) => s + i.bv * i.qty, 0);

  const handleSubmit = () => {
    if (!member) { toast.error("Please select a member"); return; }
    if (items.length === 0) { toast.error("Please add at least one product"); return; }
    toast.success("Order placed successfully!", {
      description: `₹${total.toLocaleString()} | ${totalBV} BV for ${member}`,
    });
    setMember("");
    setItems([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-secondary flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-primary-foreground" />
            </div>
            New Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label>Member *</Label>
            <Select value={member} onValueChange={setMember}>
              <SelectTrigger><SelectValue placeholder="Select member" /></SelectTrigger>
              <SelectContent>
                {members.map((m) => (
                  <SelectItem key={m.id} value={m.name}>{m.name} ({m.id})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Add Product</Label>
            <div className="flex gap-2">
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="flex-1"><SelectValue placeholder="Select product" /></SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>{p.image} {p.name} — ₹{p.price}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" size="icon" onClick={addProduct} disabled={!selectedProduct}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {items.length > 0 && (
            <div className="border border-border rounded-lg divide-y divide-border">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">₹{item.price} × {item.qty} = ₹{(item.price * item.qty).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQty(item.productId, -1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQty(item.productId, 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeItem(item.productId)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3 bg-muted/50 flex justify-between text-sm font-semibold">
                <span>Total: ₹{total.toLocaleString()}</span>
                <span className="text-primary">{totalBV} BV</span>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Place Order</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderDialog;
