import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Users,
    MapPin,
    TrendingUp,
    ShieldCheck,
    Search,
    Store,
    Smartphone,
    CreditCard,
    MoreHorizontal,
    Globe,
    Zap,
    Activity,
    ChevronRight,
    Command,
    Layers,
    Cpu,
    ArrowUpRight,
    Signal
} from "lucide-react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const INITIAL_AGENTS = [
    { id: "NODE-011", name: "Alpha Center", location: "D-Line, Port Harcourt", status: "active", volume: "₦12.5M", liquidity: "₦2.1M", health: 98, region: "South-South" },
    { id: "NODE-024", name: "Lagos Hub", location: "Yaba, Lagos", status: "active", volume: "₦45.2M", liquidity: "₦5.4M", health: 95, region: "South-West" },
    { id: "NODE-038", name: "Obio-Akpor Grid", location: "Rumokoro, PH", status: "degraded", volume: "₦8.1M", liquidity: "₦0.4M", health: 62, region: "South-South" },
    { id: "NODE-052", name: "Garden City POS", location: "GRA Phase 2, PH", status: "active", volume: "₦15.7M", liquidity: "₦3.2M", health: 99, region: "South-South" },
];

export default function AgentNetwork() {
    const [search, setSearch] = useState("");

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Spatial Intelligence Hub</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Agent Network Registry</h2>
                    <p className="text-slate-500 font-medium text-lg">Orchestrate mobile banking nodes and real-time liquidity distribution.</p>
                </div>
                <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-bold gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                    <Store className="h-4 w-4" /> Board New Satellite Node
                </Button>
            </div>

            {/* High-Fidelity Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-2xl bg-white p-10 rounded-[3rem] relative overflow-hidden group border border-slate-50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Active Nodes</span>
                            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center">
                                <Activity className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-3xl font-black text-slate-900 tracking-tighter">1,240 Nodes</span>
                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest flex items-center gap-2">
                                <ArrowUpRight className="h-3.5 w-3.5" /> +12 this cycle
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl bg-[#0a0f1c] text-white p-10 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Network Liquidity</span>
                            <div className="h-8 w-8 rounded-xl bg-white/5 flex items-center justify-center">
                                <Globe className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-3xl font-black tracking-tighter">₦ 158.4M</span>
                            <p className="text-[10px] text-primary font-black uppercase tracking-widest flex items-center gap-2">
                                <Signal className="h-3.5 w-3.5" /> Global Cash-out Depth
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl bg-white p-10 rounded-[3rem] relative overflow-hidden group border border-slate-50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Institutional Yield</span>
                            <div className="h-8 w-8 rounded-xl bg-slate-50 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 text-indigo-500" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-3xl font-black text-slate-900 tracking-tighter">₦ 12.8M</span>
                            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest flex items-center gap-2">
                                <Layers className="h-3.5 w-3.5" /> Cumulative Monthly Fee
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Agent Registry Container */}
            <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[4rem] overflow-hidden">
                <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Active Node Registry</CardTitle>
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-400">Monitoring Geographic Settlement Latency</CardDescription>
                    </div>
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                        <Input
                            placeholder="Filter by Node ID or Region..."
                            className="h-14 pl-14 pr-8 rounded-2xl bg-white border-none shadow-sm font-bold text-slate-900 placeholder:text-slate-300 transition-all focus:ring-2 focus:ring-primary/20 w-full"
                        />
                    </div>
                </CardHeader>
                <div className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/20 hover:bg-slate-50/20 border-none">
                                <TableHead className="py-10 pl-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Node Identity</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Spatial Context</TableHead>
                                <TableHead className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Fiscal Volume</TableHead>
                                <TableHead className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Node Depth</TableHead>
                                <TableHead className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</TableHead>
                                <th className="pr-12"></th>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {INITIAL_AGENTS.map((agent) => (
                                <TableRow key={agent.id} className="hover:bg-slate-50/50 transition-all border-b border-slate-50/50 group">
                                    <TableCell className="py-10 pl-12">
                                        <div className="flex items-center gap-6">
                                            <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-slate-900/10">
                                                <Store className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="font-black text-slate-900 text-lg tracking-tight group-hover:text-primary transition-colors">{agent.name}</div>
                                                <div className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">{agent.id}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                                                <MapPin className="h-3.5 w-3.5 text-primary" />
                                                {agent.location}
                                            </div>
                                            <Badge className="bg-slate-50 text-slate-400 font-black text-[9px] uppercase tracking-widest border-none px-2 py-0.5">{agent.region}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span className="text-lg font-black text-slate-900 tracking-tighter">{agent.volume}</span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="inline-flex flex-col items-end gap-2">
                                            <span className="text-sm font-black text-slate-900">{agent.liquidity}</span>
                                            <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={cn(
                                                    "h-full rounded-full transition-all duration-1000",
                                                    agent.health > 90 ? "bg-emerald-500" : "bg-orange-400"
                                                )} style={{ width: `${agent.health}%` }} />
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            className={cn(
                                                "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-xl border-none",
                                                agent.status === 'active' ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                                            )}
                                        >
                                            {agent.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-12">
                                        <Button variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-slate-50 p-0 text-slate-300 hover:text-slate-900 transition-all active:scale-90">
                                            <Command className="h-5 w-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Card>
        </div>
    );
}
