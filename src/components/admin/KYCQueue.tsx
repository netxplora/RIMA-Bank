import { useState } from "react";
import {
    Check, X, Eye, FileText, ShieldCheck,
    AlertTriangle, Search, Filter, Fingerprint,
    IdCard, MapPin, Building, Globe, Zap, ChevronRight, UserCheck, ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { mockDb } from "@/lib/mockDb";

export default function KYCQueue() {
    const [requests, setRequests] = useState(mockDb.getKYCRequests());
    const [search, setSearch] = useState("");
    const { toast } = useToast();

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        setRequests(requests.filter(req => req.id !== id));
        toast({
            title: action === 'approve' ? "Identity Certified" : "Protocol Denied",
            description: `Audit trail synchronized for entity: ${id}`,
            variant: action === 'approve' ? "default" : "destructive",
        });
    };

    const getEntityBadge = (type: string) => {
        if (type.includes('Business')) return <Badge className="bg-indigo-50 text-indigo-500 border-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5">Corporate Entity</Badge>;
        return <Badge className="bg-blue-50 text-blue-500 border-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5">Retail Node</Badge>;
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Identity Verification Nexus Active</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Compliance & Identity</h2>
                    <p className="text-slate-500 font-medium">Regulatory oversight and Customer Due Diligence (CDD) command.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-8 rounded-2xl border-slate-200 font-bold text-slate-600 bg-white">
                        <Fingerprint className="mr-2 h-4 w-4" /> BVN Registry Scan
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl bg-[#0a0f1c] hover:bg-slate-900 font-bold">
                        <Zap className="mr-2 h-4 w-4" /> Execute AI Pre-Scan
                    </Button>
                </div>
            </div>

            {/* Summary Metrics */}
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { l: "Pending Queue", v: `${requests.length} Requests`, sub: "AVG SLA: 4.2 MINS", color: "text-blue-500", icon: UserCheck },
                    { l: "Verification Rate", v: "94.2%", sub: "SYSTEM OPTIMIZED", color: "text-emerald-500", icon: ShieldCheck, progress: 94 },
                    { l: "Flagged Nodes", v: "3 Suspicious", sub: "AML TRIGGER ACTIVE", color: "text-red-500", icon: ShieldAlert }
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl bg-white p-8 rounded-[3rem] group hover:shadow-2xl transition-all">
                        <CardContent className="p-0">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.l}</span>
                                <stat.icon className={cn("h-4 w-4", stat.color)} />
                            </div>
                            <div className="text-3xl font-black text-slate-900">{stat.v}</div>
                            <p className={cn("text-[9px] font-black mt-2 tracking-widest uppercase", stat.color)}>{stat.sub}</p>
                            {stat.progress && (
                                <div className="mt-6 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${stat.progress}%` }} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filter Hub */}
            <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-50 flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                    <Input
                        placeholder="Scan for legal name, BVN, NIN or entity reference..."
                        className="h-14 pl-14 rounded-2xl bg-slate-50 border-none px-6 text-sm font-bold focus-visible:ring-primary/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button variant="ghost" className="h-14 px-8 rounded-2xl bg-slate-50 hover:bg-slate-100 font-black text-[10px] uppercase tracking-widest text-slate-400">
                        <Filter className="mr-2 h-4 w-4" /> Filter Stream
                    </Button>
                </div>
            </div>

            {/* Request Dossiers */}
            <div className="grid gap-8">
                {requests.length === 0 ? (
                    <Card className="border-none shadow-2xl bg-white rounded-[3rem] p-20 flex flex-col items-center justify-center text-center">
                        <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                            <ShieldCheck className="h-10 w-10 text-slate-200" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Compliance Queue Clear</h3>
                        <p className="text-slate-400 font-medium">All identity protocols have been successfully synchronized.</p>
                    </Card>
                ) : (
                    requests.map((request) => (
                        <Card key={request.id} className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden group hover:shadow-primary/5 transition-all">
                            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
                                <div className="p-10 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-6">
                                            <Avatar className="h-16 w-16 border-4 border-white shadow-xl">
                                                <AvatarFallback className="bg-slate-900 text-white font-black text-lg">
                                                    {request.user.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-4">
                                                    <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-primary transition-colors">{request.user}</h4>
                                                    {getEntityBadge(request.type)}
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge className="bg-slate-100 text-slate-500 border-none font-mono text-[9px] px-1.5">{request.id}</Badge>
                                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{request.email}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right hidden md:block">
                                            <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] mb-1">Received On</p>
                                            <p className="text-xs font-black text-slate-900">{request.date}</p>
                                        </div>
                                    </div>

                                    <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                                        {[
                                            { l: "Doc Integrity", v: request.details, i: IdCard, c: "text-emerald-500" },
                                            { l: "BVN Registry", v: "Verified Link", i: ShieldCheck, c: "text-blue-500" },
                                            { l: "Geo Analysis", v: "Lagos, NG", i: MapPin, c: "text-indigo-500" },
                                            { l: "Match Index", v: "98.4% Match", i: Zap, c: "text-amber-500" }
                                        ].map((info, i) => (
                                            <div key={i} className="space-y-2">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{info.l}</p>
                                                <div className="flex items-center gap-2 text-xs font-black text-slate-900">
                                                    <info.i className={cn("h-3.5 w-3.5", info.c)} />
                                                    {info.v}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-slate-50/50 p-10 flex flex-row md:flex-col justify-center gap-4 min-w-[200px]">
                                    <Button className="flex-1 md:flex-none h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 font-black text-[10px] uppercase tracking-widest text-white shadow-xl shadow-emerald-500/10" onClick={() => handleAction(request.id, 'approve')}>
                                        <Check className="h-4 w-4 mr-2" /> Certify Node
                                    </Button>
                                    <Button variant="outline" className="flex-1 md:flex-none h-12 rounded-2xl border-slate-200 bg-white font-black text-[10px] uppercase tracking-widest text-slate-500">
                                        <Eye className="h-4 w-4 mr-2" /> Inspect Bio
                                    </Button>
                                    <Button variant="ghost" className="flex-1 md:flex-none h-12 rounded-2xl text-red-500 hover:bg-red-50 font-black text-[10px] uppercase tracking-widest" onClick={() => handleAction(request.id, 'reject')}>
                                        <X className="h-4 w-4 mr-2" /> Terminate
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
