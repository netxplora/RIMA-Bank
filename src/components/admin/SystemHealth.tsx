import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Activity,
    Server,
    Database,
    Globe,
    ShieldCheck,
    Wifi,
    Cpu,
    MemoryStick,
    AlertCircle,
    CheckCircle2,
    RefreshCcw,
    Lock,
    Zap,
    Signal,
    Box,
    HardDrive,
    Terminal,
    AlertTriangle,
    ZapOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function SystemHealth() {
    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Subsystem Telemetry Hub</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Infrastructure Command</h2>
                    <p className="text-slate-500 font-medium text-lg">Global node orchestration and hardware verification protocols.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-bold text-slate-600 gap-3 group bg-white shadow-xl shadow-slate-200/20">
                        <RefreshCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-700" />
                        Infrastructure Sync
                    </Button>
                    <Button className="h-14 px-8 rounded-2xl bg-[#0a0f1c] text-white font-bold gap-3 shadow-xl shadow-slate-900/20">
                        <Terminal className="h-4 w-4" /> Root Access
                    </Button>
                </div>
            </div>

            {/* Global Signal Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "Core Latency", val: "42ms", sub: "EXCELLENT", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { label: "DB Shard Alpha", val: "18 Nodes", sub: "SYNCED", icon: Database, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Active Pods", val: "124 Cluster", sub: "NOMINAL", icon: Box, color: "text-indigo-500", bg: "bg-indigo-50" },
                    { label: "Transit Load", val: "2.4k/s", sub: "OPTIMIZED", icon: Signal, color: "text-amber-500", bg: "bg-amber-50" }
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white p-10 group hover:-translate-y-2 transition-all">
                        <div className="flex items-center justify-between mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</span>
                            <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm", stat.bg)}>
                                <stat.icon className={cn("h-5 w-5", stat.color)} />
                            </div>
                        </div>
                        <div className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{stat.val}</div>
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{stat.sub}</span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Node Diagnostics Panel */}
                <Card className="border-none shadow-2xl bg-[#0a0f1c] text-white rounded-[4rem] overflow-hidden flex flex-col">
                    <CardHeader className="p-12 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-black tracking-tight flex items-center gap-4">
                                    <Server className="h-6 w-6 text-primary" />
                                    Cluster Diagnostics
                                </CardTitle>
                                <p className="text-slate-500 text-sm font-medium italic">Active Node Registry v4.0.0</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-xl">
                                MASTER NODE: ONLINE
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-12 space-y-10 flex-1">
                        {[
                            { name: "RIMA Ledger Engine", id: "core-node-alpha", status: "Operational", color: "text-emerald-500", load: 24 },
                            { name: "Paystack Bridge Relay", id: "relay-node-01", status: "Operational", color: "text-emerald-500", load: 45 },
                            { name: "Identity Verified Shield", id: "auth-node-secure", status: "High Demand", color: "text-amber-500", load: 82 },
                            { name: "Real-time Signal Sync", id: "signal-node-pub", status: "Operational", color: "text-emerald-500", load: 12 }
                        ].map((node, i) => (
                            <div key={i} className="group cursor-default">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="space-y-1">
                                        <p className="text-base font-black text-white group-hover:text-primary transition-colors">{node.name}</p>
                                        <p className="text-[10px] font-bold text-slate-600 font-mono uppercase tracking-tighter">{node.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={cn("text-[10px] font-black uppercase tracking-widest mb-1", node.color)}>{node.status}</p>
                                        <p className="text-[10px] text-slate-500 font-bold">{node.load}% LOAD</p>
                                    </div>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full transition-all duration-1000", node.load > 80 ? "bg-amber-500" : "bg-emerald-500")}
                                        style={{ width: `${node.load}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <div className="p-10 bg-slate-900/40 border-t border-white/5 backdrop-blur-md">
                        <div className="flex items-center justify-between gap-8">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                    <p className="text-xs font-black text-red-400 uppercase tracking-widest">Protocol Interference Detect</p>
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium">Auto-mitigation protocols engaged for Auth Gate-14.</p>
                            </div>
                            <Button className="h-12 px-6 rounded-2xl bg-red-500 text-white font-black text-[10px] uppercase tracking-widest hover:bg-red-600 shadow-xl shadow-red-500/20">
                                Counter-Measures
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="space-y-12 flex flex-col justify-between">
                    {/* Hardware Matrix */}
                    <Card className="border-none shadow-2xl bg-white p-12 rounded-[4rem] flex-1">
                        <CardHeader className="p-0 mb-12">
                            <CardTitle className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                                <div className="h-12 w-12 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center">
                                    <Cpu className="h-6 w-6 text-indigo-500" />
                                </div>
                                Hardware Synthesis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-12">
                            {[
                                { l: "CPU Core Intelligence", v: 42, sub: "Dynamic Balancing Active", c: "bg-blue-500" },
                                { l: "Memory Allocation Pool", v: 62, sub: "6.4GB Synchronized", c: "bg-purple-500" },
                                { l: "Storage Persistence", v: 24, sub: "High-IOPS SSD Cluster", i: HardDrive, c: "bg-emerald-500" }
                            ].map((res, i) => (
                                <div key={i} className="space-y-4 group">
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-900 transition-colors">{res.l}</p>
                                            <p className="text-[10px] font-bold text-slate-300 italic">{res.sub}</p>
                                        </div>
                                        <span className="text-lg font-black text-slate-900 tracking-tighter">{res.v}%</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden p-0.5">
                                        <div
                                            className={cn("h-full rounded-full transition-all duration-1000", res.c)}
                                            style={{ width: `${res.v}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Lockdown Protocol Card */}
                    <Card className="border-none shadow-2xl bg-indigo-700 text-white p-10 rounded-[4rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-white/20 transition-all" />
                        <CardContent className="p-0 flex items-center gap-8 relative z-10">
                            <div className="h-24 w-24 rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center flex-shrink-0">
                                <Lock className="h-10 w-10 text-white shadow-lg" />
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className="text-2xl font-black tracking-tight">Lockdown Primary</h4>
                                <p className="text-sm text-indigo-100 font-medium leading-relaxed italic">Emergency cryptographic isolation protocol primed for manual deployment.</p>
                            </div>
                            <Button variant="ghost" className="h-16 w-16 p-0 rounded-[2rem] bg-indigo-800/50 hover:bg-white hover:text-indigo-700 transition-all flex items-center justify-center">
                                <Zap className="h-8 w-8" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
