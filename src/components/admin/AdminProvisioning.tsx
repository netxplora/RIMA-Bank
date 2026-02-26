
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Shield, UserPlus, ShieldCheck, Key,
    Lock, Unlock, Eye, Trash2, Edit2,
    Fingerprint, Globe, Smartphone, Mail,
    Activity, Server, Command, Cpu, Terminal
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const INITIAL_STAFF = [
    { id: "STAFF-011", name: "Ibrahim Yusuf", email: "ibrahim@rima.ai", role: "Super Admin", status: "active", lastLogin: "20m ago", mfa: true },
    { id: "STAFF-024", name: "Chinedu Okafor", email: "chinedu@rima.ai", role: "Compliance", status: "active", lastLogin: "2h ago", mfa: true },
    { id: "STAFF-038", name: "Fatima Bello", email: "fatima@rima.ai", role: "Loan Officer", status: "active", lastLogin: "Yesterday", mfa: true },
    { id: "STAFF-041", name: "Olawale John", email: "olawale@rima.ai", role: "Support", status: "suspended", lastLogin: "5 days ago", mfa: false },
];

export default function AdminProvisioning() {
    const [staff, setStaff] = useState(INITIAL_STAFF);

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Level-4 Security Clearance</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Access Provisioning</h2>
                    <p className="text-slate-500 font-medium text-lg">Orchestrate administrative identities and cryptographic node permissions.</p>
                </div>
                <Button className="h-14 px-8 rounded-2xl bg-primary text-white font-bold gap-3 shadow-xl shadow-primary/20">
                    <UserPlus className="h-4 w-4" /> Provision Operation Node
                </Button>
            </div>

            {/* High-Fidelity Security State Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-none shadow-2xl bg-white p-10 rounded-[3rem] relative overflow-hidden group border border-slate-50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tactical Sessions</span>
                            <div className="h-8 w-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <Activity className="h-4 w-4 text-emerald-500" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-3xl font-black text-slate-900 tracking-tighter">8 Staff Online</span>
                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="h-3 w-3" /> All nodes verified
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl bg-white p-10 rounded-[3rem] relative overflow-hidden group border border-slate-50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">MFA Compliance</span>
                            <div className="h-8 w-8 rounded-xl bg-blue-50 flex items-center justify-center">
                                <Fingerprint className="h-4 w-4 text-blue-500" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <span className="text-3xl font-black text-slate-900 tracking-tighter">92.4%</span>
                            <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden p-0.5">
                                <div className="h-full bg-blue-500 rounded-full w-[92%]" />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all" />
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Encryption State</span>
                            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <Lock className="h-4 w-4 text-emerald-400" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <span className="text-2xl font-black tracking-tight">AES-256-GCM</span>
                            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest flex items-center gap-2">
                                <Cpu className="h-3 w-3" /> Hardware Vault Active
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Staff Registry Container */}
            <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[4rem] overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/30 hover:bg-slate-50/30 border-none">
                            <TableHead className="py-10 pl-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Identity / Role Cluster</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Security Layers</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Activity Pulse</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Governance</TableHead>
                            <TableHead className="text-right pr-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Command</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {staff.map((member) => (
                            <TableRow key={member.id} className="hover:bg-slate-50/50 transition-all border-b border-slate-50/50 group">
                                <TableCell className="py-10 pl-12">
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <Avatar className="h-16 w-16 border-4 border-white shadow-xl rounded-2xl group-hover:scale-105 transition-transform">
                                                <AvatarFallback className="bg-slate-900 text-white font-black text-sm">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className={cn(
                                                "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white",
                                                member.status === 'active' ? "bg-emerald-500" : "bg-slate-300"
                                            )} />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-black text-slate-900 text-lg tracking-tight group-hover:text-primary transition-colors">{member.name}</div>
                                            <div className="flex items-center gap-3">
                                                <Badge className="text-[9px] font-black uppercase tracking-widest bg-slate-900 text-white border-none py-0.5 px-2 rounded-md transition-all group-hover:bg-primary">{member.role}</Badge>
                                                <span className="text-[10px] text-slate-400 font-mono tracking-tighter">{member.id}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-none",
                                            member.mfa ? "bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-500/10" : "bg-red-50 text-red-600 shadow-sm shadow-red-500/10"
                                        )}>
                                            <Fingerprint className="h-3.5 w-3.5" />
                                            {member.mfa ? "Enabled" : "Disabled"}
                                        </div>
                                        <div className="flex gap-2">
                                            <Smartphone className="h-4 w-4 text-slate-300" />
                                            <Mail className="h-4 w-4 text-slate-300" />
                                            <Globe className="h-4 w-4 text-slate-300" />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-2 w-2 rounded-full animate-pulse",
                                            member.status === 'active' ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-slate-300"
                                        )} />
                                        <span className="text-xs font-black text-slate-500 tracking-tight">{member.lastLogin}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        className={cn(
                                            "text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-xl border-none",
                                            member.status === 'active' ? "bg-emerald-50 text-emerald-700 shadow-sm" : "bg-red-50 text-red-700 shadow-sm"
                                        )}
                                    >
                                        {member.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right pr-12">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-slate-50 p-0 text-slate-300 hover:text-slate-900 transition-all active:scale-90">
                                                <Command className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-64 rounded-[2rem] p-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] border-slate-100 bg-white/95 backdrop-blur-xl">
                                            <DropdownMenuItem className="rounded-xl px-4 py-3 font-black text-xs hover:bg-slate-50 cursor-pointer">
                                                <Edit2 className="mr-3 h-4 w-4 text-slate-400" /> Modify Permissions
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="rounded-xl px-4 py-3 font-black text-xs hover:bg-slate-50 cursor-pointer">
                                                <Key className="mr-3 h-4 w-4 text-slate-400" /> Rotate JWT Token
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="my-2 bg-slate-100" />
                                            <DropdownMenuItem className="rounded-xl px-4 py-3 font-black text-xs text-red-600 focus:bg-red-50 cursor-pointer">
                                                <Unlock className="mr-3 h-4 w-4" /> Revoke Node Access
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Bottom Security Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card className="border-none shadow-2xl bg-white p-10 rounded-[4rem] relative overflow-hidden group border border-slate-50">
                    <CardHeader className="p-0 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                                <ShieldCheck className="h-6 w-6 text-indigo-500" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Security Audit</CardTitle>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Protocol Monitoring</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <div className="group/item relative">
                            <div className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="font-black text-sm text-slate-900">Emergency Protocol Delta</p>
                                        <p className="text-[10px] text-slate-400 font-medium italic">Auto-lock on multiple authentication failures.</p>
                                    </div>
                                    <Badge className="bg-emerald-500 text-white border-none font-black text-[9px] px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">ACTIVE</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="group/item relative">
                            <div className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-100 cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="font-black text-sm text-slate-900">Privileged Session Log</p>
                                        <p className="text-[10px] text-slate-400 font-medium italic">Tracing all high-stakes CLI override attempts.</p>
                                    </div>
                                    <Badge className="bg-emerald-500 text-white border-none font-black text-[9px] px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">ACTIVE</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-2xl bg-[#0a0f1c] text-white p-10 rounded-[4rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12">
                        <Fingerprint className="h-32 w-32 text-primary" />
                    </div>
                    <CardHeader className="p-0 mb-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-white/5 flex items-center justify-center">
                                <Fingerprint className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-white tracking-tight">Biometric Governance</CardTitle>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hardware-Level Auth</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 relative z-10 space-y-8">
                        <p className="text-sm font-medium text-slate-400 leading-relaxed italic">Integrate military-grade FIDO2/WebAuthn hardware keys for all staff workstation synchronization.</p>
                        <Button className="w-full h-16 rounded-[2rem] bg-white text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all hover:scale-[1.02] active:scale-95">
                            Provision Hardware Keys
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
