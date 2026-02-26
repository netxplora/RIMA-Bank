
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
    Wallet, CreditCard, HandCoins, Building2, Plus,
    Edit2, ShieldCheck, TrendingUp, Users, Activity,
    Settings2, ChevronRight, Zap, Target, Layers,
    Box, Cpu, Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BankProduct {
    id: string;
    name: string;
    category: 'savings' | 'loan' | 'card';
    description: string;
    isActive: boolean;
    parameters: Record<string, string | number>;
    metrics: {
        active_users: number;
        monthly_growth: string;
        revenue: string;
    };
}

const INITIAL_PRODUCTS: BankProduct[] = [
    {
        id: "INST-001",
        name: "Premium Yield Savings",
        category: "savings",
        description: "Tier-1 retail liquidity vehicle with autonomous yield reconciliation.",
        isActive: true,
        parameters: { interest_rate: "4.2%", min_balance: "₦0", maintenance: "Free" },
        metrics: { active_users: 12450, monthly_growth: "+14%", revenue: "₦2.4M" }
    },
    {
        id: "INST-002",
        name: "Enterprise SME Credit",
        category: "loan",
        description: "Instant capital deployment for verified commercial entities.",
        isActive: true,
        parameters: { max_amount: "₦1.0M", tenor: "12m", apr: "18%" },
        metrics: { active_users: 840, monthly_growth: "+22%", revenue: "₦15.8M" }
    },
    {
        id: "INST-003",
        name: "Elite Virtual Master",
        category: "card",
        description: "Institutional-grade cross-border payment architecture.",
        isActive: true,
        parameters: { issuance: "₦500", limit: "₦500k", dynamic_cvv: "Enabled" },
        metrics: { active_users: 5600, monthly_growth: "+31%", revenue: "₦8.4M" }
    },
    {
        id: "INST-004",
        name: "Secured Portfolio Credit",
        category: "loan",
        description: "Structured lending backed by fixed institutional assets.",
        isActive: false,
        parameters: { ltv: "70%", max_cap: "₦50M", valuation: "Required" },
        metrics: { active_users: 0, monthly_growth: "0%", revenue: "₦0" }
    }
];

export default function ProductManagement() {
    const [products, setProducts] = useState(INITIAL_PRODUCTS);

    const toggleStatus = (id: string) => {
        setProducts(products.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Asset Engineering Studio</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Product Architecture</h2>
                    <p className="text-slate-500 font-medium text-lg">Deploy mission-critical banking assets and global yield parameters.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-bold text-slate-600 gap-3 bg-white shadow-xl shadow-slate-200/10 hover:shadow-2xl transition-all">
                        <Target className="h-4 w-4" /> Yield Analysis
                    </Button>
                    <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-bold gap-3 shadow-xl shadow-primary/20">
                        <Plus className="h-4 w-4" /> New Engineering
                    </Button>
                </div>
            </div>

            {/* Product Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {products.map((product) => (
                    <Card key={product.id} className={cn(
                        "border-none shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] transition-all group overflow-hidden relative rounded-[3rem] bg-white transform hover:-translate-y-2",
                        !product.isActive && "opacity-60 grayscale-[0.8]"
                    )}>
                        <div className={cn(
                            "absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2",
                            product.category === 'savings' ? "bg-emerald-500/10" :
                                product.category === 'loan' ? "bg-blue-500/10" : "bg-indigo-500/10"
                        )} />

                        <CardHeader className="p-10 pb-6">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-6">
                                    <div className={cn(
                                        "h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-inner",
                                        product.category === 'savings' ? "bg-emerald-50 text-emerald-600" :
                                            product.category === 'loan' ? "bg-blue-50 text-blue-600" : "bg-indigo-50 text-indigo-600"
                                    )}>
                                        {product.category === 'savings' && <Wallet className="h-8 w-8" />}
                                        {product.category === 'loan' && <HandCoins className="h-8 w-8" />}
                                        {product.category === 'card' && <CreditCard className="h-8 w-8" />}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">{product.name}</CardTitle>
                                            <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest border-slate-100 text-slate-400">
                                                {product.id}
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-sm font-medium line-clamp-1 text-slate-400 italic">{product.description}</CardDescription>
                                    </div>
                                </div>
                                <Badge className={cn(
                                    "px-4 py-2 font-black text-[9px] tracking-widest uppercase rounded-xl border-none",
                                    product.isActive ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-100 text-slate-400"
                                )}>
                                    {product.isActive ? 'ACTIVE' : 'DORMANT'}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="p-10 pt-0 space-y-10">
                            <div className="grid grid-cols-3 gap-8">
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Users className="h-3 w-3" /> Adoption
                                    </p>
                                    <p className="text-xl font-black text-slate-900 tracking-tight">{product.metrics.active_users.toLocaleString()}</p>
                                    <p className="text-[10px] text-emerald-600 font-extrabold">{product.metrics.monthly_growth} Growth</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <TrendingUp className="h-3 w-3" /> Revenue
                                    </p>
                                    <p className="text-xl font-black text-slate-900 tracking-tight">{product.metrics.revenue}</p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">Yield/MO</p>
                                </div>
                                <div className="space-y-2 text-right">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center gap-2 justify-end">
                                        <Activity className="h-3 w-3" /> Velocity
                                    </p>
                                    <div className="h-2 w-full bg-slate-50 rounded-full mt-3 overflow-hidden">
                                        <div className={cn(
                                            "h-full rounded-full transition-all duration-1000",
                                            product.category === 'savings' ? "bg-emerald-500" :
                                                product.category === 'loan' ? "bg-blue-500" : "bg-indigo-500"
                                        )} style={{ width: product.isActive ? '80%' : '5%' }} />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-black uppercase mt-1">Status Nominal</p>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50/50 rounded-3xl grid grid-cols-2 gap-y-6 gap-x-10 border border-slate-50">
                                {Object.entries(product.parameters).map(([key, value]) => (
                                    <div key={key} className="space-y-1">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{key.replace('_', ' ')}</p>
                                        <p className="text-sm font-black text-slate-700">{value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                                <div className="flex items-center gap-4">
                                    <Switch
                                        id={`status-${product.id}`}
                                        checked={product.isActive}
                                        onCheckedChange={() => toggleStatus(product.id)}
                                        className="data-[state=checked]:bg-emerald-500"
                                    />
                                    <Label htmlFor={`status-${product.id}`} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] cursor-pointer">
                                        Orchestration State
                                    </Label>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="ghost" className="h-12 px-6 rounded-2xl hover:bg-slate-50 text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all">
                                        <Settings2 className="h-4 w-4 mr-2" /> Parameters
                                    </Button>
                                    <Button variant="outline" className="h-12 w-12 p-0 rounded-2xl border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Global Institutional Safeguards */}
            <Card className="border-none shadow-2xl bg-[#0a0f1c] text-white p-12 rounded-[4rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-all group-hover:scale-125">
                    <ShieldCheck className="h-64 w-64 text-primary" />
                </div>
                <CardHeader className="p-0 mb-12 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 backdrop-blur-xl border border-white/5 flex items-center justify-center">
                            <ShieldCheck className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl font-black tracking-tight">System-Wide Constraints</CardTitle>
                            <p className="text-slate-500 font-medium italic">High-stakes overrides for institutional core logic.</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                    <div className="group/item relative">
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05] cursor-pointer">
                            <div className="flex items-center justify-between mb-6">
                                <div className="space-y-1">
                                    <p className="font-black text-lg text-white tracking-tight">Global Shutdown (Relay)</p>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Terminate all inter-bank NIBSS & Paystack relay nodes instantly.</p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Switch className="data-[state=checked]:bg-red-500 shadow-2xl shadow-red-500/50 scale-125" />
                                    <span className="text-[9px] font-black text-red-500/50 uppercase tracking-widest">Primed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group/item relative">
                        <div className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 transition-all hover:bg-white/[0.05] cursor-pointer">
                            <div className="flex items-center justify-between mb-6">
                                <div className="space-y-1">
                                    <p className="font-black text-lg text-white tracking-tight">Yield Oracle Engine</p>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">Enable dynamic floating interest rates based on real-time market indices.</p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <Switch defaultChecked className="data-[state=checked]:bg-primary shadow-2xl shadow-primary/50 scale-125" />
                                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">Active Sync</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
