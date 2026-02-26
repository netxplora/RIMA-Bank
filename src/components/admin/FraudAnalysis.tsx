import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    ShieldAlert,
    Zap,
    Target,
    Globe,
    Activity,
    Search,
    Lock,
    Unlock,
    AlertTriangle,
    Eye,
    Terminal,
    MapPin,
    ArrowRight,
    Cpu,
    Radar,
    Fingerprint,
    SearchCode,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const ANOMALIES = [
    { id: "FL-001-SEC", entity: "Damilola Coker", risk: 85, trigger: "Velocity: 12 attempts/min", location: "Lagos, NG", status: "flagged" },
    { id: "FL-002-SEC", entity: "Unknown Node (192.168.1.45)", risk: 92, trigger: "Unauthorized Kernel Access", location: "Frankfurt, DE", status: "blocked" },
    { id: "FL-003-SEC", entity: "Ibrahim Yusuf", risk: 64, trigger: "High-value Transfer (₦4.5M)", location: "Port Harcourt, NG", status: "review" },
];

export default function FraudAnalysis() {
    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Surveillance Protocol Active</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        Sentinel Intelligence
                    </h2>
                    <p className="text-slate-500 font-medium">Real-time threat synthesis and automated counter-fraud countermeasures.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-8 rounded-2xl border-slate-200 font-bold text-slate-600 bg-white">
                        <SearchCode className="mr-2 h-4 w-4" /> Global Audit Scan
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl bg-red-600 hover:bg-red-700 font-bold shadow-xl shadow-red-500/20">
                        <Lock className="mr-2 h-4 w-4" /> Protocol Freeze
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Threat Radar */}
                <Card className="col-span-12 lg:col-span-8 border-none shadow-2xl bg-[#0a0f1c] text-white overflow-hidden relative min-h-[500px] rounded-[3rem]">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="h-[300px] w-[300px] rounded-full border border-emerald-500/30 animate-pulse" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-emerald-500/10" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[750px] w-[750px] rounded-full border border-emerald-500/[0.03]" />
                        </div>
                    </div>

                    <CardHeader className="relative z-10 p-8 border-b border-white/5 bg-slate-950/20 backdrop-blur-xl">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 flex items-center gap-3">
                                <Radar className="h-4 w-4 animate-spin-slow" />
                                Geometric Threat Analysis
                            </CardTitle>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[9px] font-black px-3 py-1 uppercase tracking-widest">
                                KERNEL: SECURE
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="relative z-10 p-10 flex flex-col items-center justify-center min-h-[400px]">
                        <div className="relative">
                            <Globe className="h-40 w-40 text-emerald-500/10 animate-pulse" />
                            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-[#0a0f1c] via-transparent to-transparent" />
                        </div>

                        <div className="mt-8 space-y-4 text-center">
                            <p className="text-xs font-black text-emerald-500/60 uppercase tracking-[0.3em]">Scanning Node Registries...</p>
                            <div className="flex gap-6 justify-center">
                                {["Lagos #12", "Abuja #04", "London #SEC"].map((node, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="h-1 w-1 rounded-full bg-emerald-500" />
                                        <span className="text-[9px] font-black text-slate-500 uppercase">{node}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Interactive Threat Nodes */}
                        <div className="absolute top-[20%] left-[30%] group cursor-help">
                            <div className="h-3 w-3 bg-red-500 rounded-full animate-ping mb-2" />
                            <div className="p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-red-500/30 scale-0 group-hover:scale-100 transition-transform origin-top-left shadow-2xl">
                                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">High Velocity Flag</p>
                                <p className="text-[10px] text-white font-bold italic">Source: Lagos Node #12</p>
                            </div>
                        </div>

                        <div className="absolute bottom-[25%] right-[20%] group cursor-help">
                            <div className="h-3 w-3 bg-orange-500 rounded-full animate-ping mb-2 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
                            <div className="p-3 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-orange-500/30 scale-0 group-hover:scale-100 transition-transform origin-bottom-right shadow-2xl">
                                <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-1">Account Takeover Attempt</p>
                                <p className="text-[10px] text-white font-bold italic">Source: Proxy Germany</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Surveillance Metrics */}
                <div className="col-span-12 lg:col-span-4 space-y-8">
                    <Card className="border-none shadow-2xl bg-white p-8 rounded-[3rem] group">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Activity className="h-3 w-3 text-red-500" />
                                Global Risk Index
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="text-6xl font-black text-slate-900 tracking-tighter">2.4<span className="text-2xl text-slate-300">/10</span></div>
                            <div className="flex items-center gap-2 mt-4">
                                <Badge className="bg-emerald-50 text-emerald-500 border-none font-black text-[9px] px-3">SAFE THRESHOLD</Badge>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">-12% FROM PEAK</span>
                            </div>
                            <div className="mt-8 h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                <div className="h-full bg-[#0a0f1c] w-[24%] transition-all duration-1000 group-hover:bg-primary" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-2xl bg-[#0a0f1c] p-8 rounded-[3rem]">
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                                <Fingerprint className="h-4 w-4 text-primary" />
                                Behavioral Synthesis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                            {[
                                { l: "Social Engineering", v: 12, c: "bg-emerald-500", t: "LOW" },
                                { l: "Account Takeover", v: 42, c: "bg-orange-500", t: "LEVEL 2" },
                                { l: "Card Testing", v: 85, c: "bg-red-500", t: "CRITICAL" }
                            ].map((pattern, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">{pattern.l}</span>
                                        <span className={cn("text-[9px] font-black uppercase tracking-tighter", pattern.c.replace("bg-", "text-"))}>{pattern.t}</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full">
                                        <div className={cn("h-full rounded-full transition-all duration-1000", pattern.c)} style={{ width: `${pattern.v}%` }} />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Investigation Nexus */}
                <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-900 flex items-center gap-3">
                                Investigation Queue
                                <Badge className="bg-[#0a0f1c] text-white border-none font-black text-[9px] px-2.5">7 FLAGS</Badge>
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="h-10 px-4 rounded-xl font-black text-[10px] uppercase text-slate-400 hover:text-slate-900">
                                View Full Hub
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {ANOMALIES.map((item) => (
                            <div key={item.id} className="p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-all flex items-center justify-between gap-6 group">
                                <div className="flex items-center gap-5">
                                    <div className={cn(
                                        "h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                                        item.risk > 80 ? "bg-red-50 text-red-500" : "bg-orange-50 text-orange-500"
                                    )}>
                                        <Target className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-base font-black text-slate-900 transition-colors group-hover:text-primary">{item.entity}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{item.trigger} • {item.location}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className={cn("text-[10px] font-black uppercase tracking-widest", item.risk > 80 ? "text-red-500" : "text-orange-500")}>{item.risk}% RISK</p>
                                        <Badge className="bg-slate-100 text-slate-500 border-none font-black text-[8px] mt-1 px-2 py-0.5">{item.id}</Badge>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight className="h-5 w-5 text-slate-400" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Subsystem Diagnostics */}
                <Card className="border-none shadow-2xl bg-[#0a0f1c] rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-8 border-b border-white/5">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-3">
                            <Terminal className="h-4 w-4" />
                            Sentinel Kernel Diagnostics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 font-mono text-[11px] space-y-3 h-[380px] overflow-y-auto custom-scrollbar">
                        {[
                            { t: "09:12:44", m: "[SYSTEM] Sentinel Core v4.2.0-secure. Handshake complete.", c: "text-emerald-500/60" },
                            { t: "09:14:02", m: "[AUTH] Verified Admin Node #01 biometric signature.", c: "text-white/40" },
                            { t: "09:15:33", m: "[WARN] LAGOS-12: Velocity limit excursion detected. Flux: 12.4x", c: "text-red-500" },
                            { t: "09:18:12", m: "[SCAN] Geo-fence registry updated for inter-bank routes.", c: "text-white/40" },
                            { t: "09:22:04", m: "[INFO] High-value bridge intercepted: ₦12.5M. Reason: Magnitude.", c: "text-orange-400" },
                            { t: "09:25:51", m: "[SYSTEM] NIBSS settlement tunnel latency optimized: 12ms", c: "text-emerald-500/60" },
                            { t: "09:30:12", m: "[SCAN] Predictive AI running behavioral synthesis on Branch #04.", c: "text-white/40" },
                            { t: "09:31:00", m: "[AUTH] New Operator Session: RIMA-ADM-SEC-001 initialized.", c: "text-primary/60" }
                        ].map((log, i) => (
                            <div key={i} className="flex gap-4 group">
                                <span className="text-white/20 select-none">{log.t}</span>
                                <span className={cn("flex-1", log.c)}>{log.m}</span>
                            </div>
                        ))}
                        <div className="pt-4 border-t border-white/5">
                            <p className="text-emerald-500/30 animate-pulse font-black uppercase tracking-widest text-[9px]">Listening for incoming node telemetry...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
