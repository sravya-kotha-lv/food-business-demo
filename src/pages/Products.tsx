import { products } from "@/data/mlmData";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

const Products = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filtered = products.filter(
    p => (category === "All" || p.category === category) &&
         p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Products</h1>
        <p className="text-muted-foreground mt-1">Browse our premium food & health product catalog.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                category === c
                  ? "gradient-primary text-primary-foreground"
                  : "bg-card border border-border text-card-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="h-40 bg-muted flex items-center justify-center text-6xl">
              {product.image}
            </div>
            <div className="p-5">
              <p className="text-xs font-medium text-primary">{product.category}</p>
              <h3 className="font-semibold text-card-foreground mt-1">{product.name}</h3>
              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-lg font-bold text-card-foreground">₹{product.price}</p>
                  <p className="text-xs text-muted-foreground">BV: {product.bv}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 500 ? "bg-accent text-accent-foreground" : "bg-warning/10 text-warning"}`}>
                  Stock: {product.stock}
                </span>
              </div>
              <button className="w-full mt-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
