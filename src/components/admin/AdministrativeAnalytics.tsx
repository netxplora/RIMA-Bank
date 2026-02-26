import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    TrendingUp,
    ArrowUpRight,
    DollarSign,
    PieChart,
    Activity,
    BarChart3,
    ArrowDownRight,
    Target,
    Zap,
    MoveUp,
    MoveDown,
    Lock,
    Globe,
    ShieldCheck,
    Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AdministrativeAnalytics() {
    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Intelligence Stream: Online</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Institutional Oversight</h2>
                    <p className="text-slate-500 font-medium text-lg">Global liquidity analysis and autonomous revenue reconciliation.</p>
                </div>
                <div className="flex gap-3 bg-white p-2 rounded-3xl shadow-xl border border-slate-50">
                    <Button variant="ghost" className="h-12 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-[#0a0f1c] text-white hover:bg-slate-900 hover:text-white transition-all shadow-xl shadow-slate-900/20">Live Feed</Button>
                    <Button variant="ghost" className="h-12 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Protocol Logs</Button>
                </div>
            </div>

            {/* High-Level Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "Net Portfolio Yield", val: "₦ 284.2M", delta: "+15.4%", color: "emerald", icon: TrendingUp, shadow: "shadow-emerald-500/10" },
                    { label: "Settlement Velocity", val: "4.2s Avg", delta: "Optimized", color: "blue", icon: Cpu, shadow: "shadow-blue-500/10" },
                    { label: "System Liquidity", val: "₦ 1.2B", delta: "+2.4%", color: "indigo", icon: Globe, shadow: "shadow-indigo-500/10" },
                    { label: "Risk Exposure", val: "₦ 12.8M", delta: "Nominal", color: "amber", icon: ShieldCheck, shadow: "shadow-amber-500/10" }
                ].map((stat, i) => (
                    <Card key={i} className={cn(
                        "border-none shadow-2xl rounded-[3rem] overflow-hidden relative group transition-all hover:-translate-y-2",
                        stat.color === 'emerald' ? 'bg-[#064e3b]' :
                            stat.color === 'blue' ? 'bg-[#1e3a8a]' :
                                stat.color === 'indigo' ? 'bg-[#312e81]' : 'bg-[#7c2d12]',
                        stat.shadow
                    )}>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
                        <CardHeader className="pb-4 relative z-10 p-10">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-white flex items-center gap-3">
                                <stat.icon className="h-3.5 w-3.5" />
                                {stat.label}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-10 pb-10 relative z-10">
                            <div className="text-4xl font-black text-white tracking-tighter mb-4">{stat.val}</div>
                            <div className="flex items-center gap-3">
                                <Badge className="bg-white/10 text-white border-none font-black text-[9px] px-3 py-1 uppercase tracking-widest">
                                    {stat.delta}
                                </Badge>
                                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Global Status</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Visual Trajectory Card */}
                <Card className="lg:col-span-2 border-none shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] bg-white rounded-[4rem] overflow-hidden">
                    <CardHeader className="p-12 border-b border-slate-50">
                        <div className="flex justify-between items-center">
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                    </div>
                                    Growth Trajectory Synthesis
                                </CardTitle>
                                <p className="text-slate-400 font-medium">Historical performance audit and predictive models.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black">A{i}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-12">
                        <div className="h-[400px] flex items-end justify-between gap-6">
                            {[40, 65, 55, 80, 110, 90, 130, 115, 160, 140, 180, 210].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-6 group relative">
                                    <div className="w-full relative h-[320px] flex flex-col justify-end">
                                        <div
                                            className="w-full bg-slate-50 rounded-[1.5rem] group-hover:bg-primary/[0.03] transition-all relative overflow-hidden"
                                            style={{ height: '100%' }}
                                        >
                                            <div
                                                className="absolute bottom-0 left-0 w-full bg-slate-100 group-hover:bg-primary transition-all rounded-[1.5rem] shadow-[0_10px_30px_-5px_rgba(59,130,246,0.3)] flex items-start justify-center pt-4"
                                                style={{ height: `${(h / 210) * 100}%` }}
                                            >
                                                <div className="w-2 h-2 rounded-full bg-white/50 group-hover:bg-white animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#0a0f1c] text-white text-[9px] font-black px-4 py-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-2xl z-20 whitespace-nowrap">
                                            ₦{(h / 10).toFixed(1)}M
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-slate-900 transition-colors">{['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Side Intelligence Panels */}
                <div className="space-y-12">
                    <Card className="border-none shadow-2xl bg-[#0a0f1c] text-white p-12 rounded-[4rem] relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[#0a0f1c]" />
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/20 transition-all" />

                        <CardHeader className="p-0 mb-12 relative z-10">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-1 w-8 bg-primary rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protocol Map</span>
                            </div>
                            <CardTitle className="text-2xl font-black tracking-tight">Resource Allocation</CardTitle>
                        </CardHeader>

                        <CardContent className="p-0 space-y-10 relative z-10">
                            {[
                                { l: "Institutional Credit", p: 45, c: "bg-emerald-500" },
                                { l: "Retail Liquidity", p: 25, c: "bg-blue-500" },
                                { l: "Reserve Protocol", p: 20, c: "bg-indigo-500" },
                                { l: "Internal Operations", p: 10, c: "bg-amber-500" }
                            ].map((item, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">{item.l}</span>
                                        <span className="text-base font-black text-white">{item.p}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className={cn("h-full rounded-full transition-all duration-1000", item.c)} style={{ width: `${item.p}%` }} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl bg-white p-10 rounded-[4rem] overflow-hidden group hover:shadow-primary/10 transition-all text-center">
                        <div className="flex flex-col items-center gap-6">
                            <div className="h-24 w-24 rounded-[2rem] bg-slate-50 flex items-center justify-center group-hover:bg-primary/[0.03] transition-all relative">
                                <Target className="h-10 w-10 text-slate-300 group-hover:text-primary transition-all" />
                                <div className="absolute inset-0 rounded-[2rem] border-2 border-slate-100 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-xl font-black text-slate-900 tracking-tight">Optimization Success</h4>
                                <p className="text-sm text-slate-400 font-medium px-4 leading-relaxed line-clamp-2">Latency reconciliation has successfully reclaimed 420ms across inter-bank nodes.</p>
                            </div>
                            <Button className="w-full h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all">
                                Protocol Reports
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
