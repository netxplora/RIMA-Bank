import { useState } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    MoreHorizontal, UserCheck, UserX, Search, Shield,
    CheckCircle2, AlertCircle, Clock, Filter, FileText,
    Mail, Phone, MapPin, Users, Zap, ShieldAlert, ChevronRight,
    SearchCode, Globe, HardDrive, Database, Fingerprint, History
} from "lucide-react";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { mockDb } from "@/lib/mockDb";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const mockUser = mockDb.getUser();

const INITIAL_USERS = [
    {
        id: "RIMA-" + mockUser.id.toUpperCase(),
        name: mockUser.name,
        email: mockUser.email,
        status: "active",
        kycLevel: 3,
        role: "user",
        balance: mockUser.balance,
        joined: "Oct 12, 2023"
    },
    { id: "RIMA-USR-002", name: "Amadi Chinedu", email: "amadi@riversmfb.com", status: "active", kycLevel: 2, role: "user", balance: 145000, joined: "Nov 05, 2023" },
    { id: "RIMA-USR-003", name: "Bisi Adebayo", email: "bisi@riversmfb.com", status: "active", kycLevel: 1, role: "user", balance: 50400, joined: "Jan 10, 2024" },
    { id: "RIMA-USR-004", name: "John Smith", email: "john.s@riversmfb.com", status: "suspended", kycLevel: 3, role: "user", balance: 1200, joined: "Aug 20, 2023" },
    { id: "RIMA-USR-005", name: "Sarah West", email: "sarah.w@riversmfb.com", status: "active", kycLevel: 2, role: "agent", balance: 89000, joined: "Dec 15, 2023" },
];

export default function UserManagement() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [search, setSearch] = useState("");

    const handleStatusChange = (userId: string, newStatus: string) => {
        setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        toast.success(`Entity protocol updated: ${newStatus === 'active' ? 'Access restored' : 'Access terminated'}`);
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase())
    );

    const getKycBadge = (level: number) => {
        switch (level) {
            case 3: return <Badge className="bg-emerald-500 text-white border-none font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20"><CheckCircle2 className="h-2.5 w-2.5 mr-1" /> Verified T3</Badge>;
            case 2: return <Badge className="bg-blue-500 text-white border-none font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-blue-500/20"><Clock className="h-2.5 w-2.5 mr-1" /> Pending T2</Badge>;
            default: return <Badge className="bg-slate-400 text-white border-none font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-slate-500/20"><AlertCircle className="h-2.5 w-2.5 mr-1" /> Initial T1</Badge>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Node Intelligence Network</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Entity Directory</h2>
                    <p className="text-slate-500 font-medium text-lg">Orchestrate verified human nodes and cryptographic institutional identities.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-bold text-slate-600 gap-3 bg-white shadow-xl shadow-slate-200/10 hover:shadow-2xl transition-all">
                        <FileText className="h-4 w-4" /> Export Registry
                    </Button>
                    <Link to="/admin/provisioning">
                        <Button className="h-14 px-8 rounded-2xl bg-[#0a0f1c] text-white font-bold gap-3 shadow-xl shadow-slate-900/20">
                            <Shield className="h-4 w-4" /> Provision Node
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Entity Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "Total Entities", value: "2.4k", icon: Users, color: "blue", trend: "+12%" },
                    { label: "Active Nodes", value: "2,102", icon: Zap, color: "emerald", trend: "Stable" },
                    { label: "High Risk", value: "14", icon: ShieldAlert, color: "red", trend: "-5%" },
                    { label: "Provisioned Agents", value: "48", icon: Fingerprint, color: "indigo", trend: "+8%" }
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-2xl bg-white p-8 rounded-[3rem] group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all relative overflow-hidden">
                        <div className={cn(
                            "absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2",
                            stat.color === 'blue' ? 'bg-blue-500/5' :
                                stat.color === 'emerald' ? 'bg-emerald-500/5' :
                                    stat.color === 'red' ? 'bg-red-500/5' : 'bg-indigo-500/5'
                        )} />
                        <CardContent className="p-0 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className={cn(
                                    "h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12",
                                    stat.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                                        stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-500' :
                                            stat.color === 'red' ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-indigo-500'
                                )}>
                                    <stat.icon className="h-7 w-7" />
                                </div>
                                <span className={cn(
                                    "text-[10px] font-black px-2 py-1 rounded-lg",
                                    stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' :
                                        stat.trend.startsWith('-') ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'
                                )}>{stat.trend}</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Registry Search & Table */}
            <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[4rem] overflow-hidden">
                <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50 backdrop-blur-xl space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-6 flex-1 max-w-2xl">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Filter by Entity ID, Legal Name, or Command Email..."
                                    className="pl-16 h-16 bg-white border-slate-100 rounded-3xl shadow-sm text-base focus:ring-4 focus:ring-primary/5 transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="h-16 w-16 p-0 rounded-3xl border-slate-100 bg-white hover:bg-slate-50 shrink-0 shadow-sm transition-all active:scale-95">
                                <Filter className="h-5 w-5 text-slate-500" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                            <Button variant="ghost" className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest bg-slate-900 text-white hover:bg-slate-800 hover:text-white shadow-xl shadow-slate-900/10">All Nodes</Button>
                            <Button variant="ghost" className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50">High Value</Button>
                            <Button variant="ghost" className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50">Suspended</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/30 hover:bg-slate-50/30 border-none">
                                <TableHead className="py-10 pl-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Node Descriptor</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Compliance State</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Ledger Position</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Auth Status</TableHead>
                                <TableHead className="text-right pr-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Command</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="py-32 text-center">
                                        <div className="flex flex-col items-center gap-6 opacity-20">
                                            <SearchCode className="h-20 w-20 text-slate-900" />
                                            <p className="text-sm font-black uppercase tracking-[0.4em] text-slate-900">Zero matches in local registry</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-slate-50/50 transition-all border-b border-slate-50/50 group cursor-pointer">
                                        <TableCell className="py-10 pl-12">
                                            <div className="flex items-center gap-8">
                                                <div className="relative">
                                                    <Avatar className="h-20 w-20 border-8 border-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] rounded-[1.5rem] group-hover:scale-105 transition-all">
                                                        <AvatarFallback className="bg-slate-900 text-white text-xl font-black">
                                                            {user.name.split(' ').map(n => n[0]).join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    {user.status === 'active' && (
                                                        <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg animate-pulse" />
                                                    )}
                                                </div>
                                                <div className="space-y-1.5">
                                                    <div className="font-black text-slate-900 text-xl tracking-tight flex items-center gap-3 group-hover:text-primary transition-colors">
                                                        {user.name}
                                                        {user.role === 'agent' && (
                                                            <Badge className="bg-indigo-500 text-white border-none text-[8px] font-black px-2 py-0.5 uppercase tracking-widest shadow-lg shadow-indigo-500/20">AGENT_NODE</Badge>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-[11px] font-black font-mono text-slate-300 tracking-widest">{user.id}</span>
                                                        <span className="h-1 w-1 rounded-full bg-slate-200" />
                                                        <span className="text-[11px] font-bold text-slate-400 italic">{user.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-3">
                                                {getKycBadge(user.kycLevel)}
                                                <div className="flex items-center gap-2 text-[9px] text-slate-400 font-black uppercase tracking-widest">
                                                    <History className="h-3 w-3" /> Synced {user.joined}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-2">
                                                <div className="text-2xl font-black text-slate-900 tabular-nums tracking-tighter group-hover:text-primary transition-colors">₦{user.balance.toLocaleString()}</div>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-1.5 w-20 bg-slate-50 rounded-full overflow-hidden p-0.5">
                                                        <div className="h-full bg-emerald-500 rounded-full w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                                    </div>
                                                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter italic">High Liquidity</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge
                                                className={cn(
                                                    "rounded-xl px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-none shadow-sm",
                                                    user.status === 'active' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
                                                )}
                                            >
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-12">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-14 w-14 rounded-2xl hover:bg-slate-50 p-0 text-slate-300 hover:text-slate-900 transition-all active:scale-90">
                                                        <MoreHorizontal className="h-8 w-8" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-80 rounded-[2rem] p-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] border-slate-100 bg-white/95 backdrop-blur-xl">
                                                    <div className="px-4 py-3 mb-2 border-b border-slate-50">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Command Actions</p>
                                                    </div>
                                                    <DropdownMenuItem className="rounded-2xl px-6 py-4 font-black text-xs hover:bg-slate-50 cursor-pointer">
                                                        <FileText className="mr-4 h-5 w-5 text-slate-400" /> Full Audit Dossier
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-2xl px-6 py-4 font-black text-xs hover:bg-slate-50 cursor-pointer">
                                                        <Zap className="mr-4 h-5 w-5 text-slate-400" /> Force Re-verification
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="rounded-2xl px-6 py-4 font-black text-xs hover:bg-slate-50 cursor-pointer">
                                                        <Shield className="mr-4 h-5 w-5 text-slate-400" /> Cycle Security Keys
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="my-3 bg-slate-100" />
                                                    {user.status === 'suspended' ? (
                                                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'active')} className="rounded-2xl px-6 py-4 font-black text-xs text-emerald-600 focus:bg-emerald-50 cursor-pointer">
                                                            <UserCheck className="mr-4 h-5 w-5" /> Restore Entity Access
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem onClick={() => handleStatusChange(user.id, 'suspended')} className="rounded-2xl px-6 py-4 font-black text-xs text-red-600 focus:bg-red-50 cursor-pointer">
                                                            <UserX className="mr-4 h-5 w-5" /> Terminate Access
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Pagination / Data View Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-slate-900 rounded-[3rem] text-white gap-8 border border-white/5 shadow-2xl">
                <div className="flex items-center gap-6">
                    <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Registry Synchronized: {new Date().toLocaleTimeString()}</p>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Page 1 of {Math.ceil(filteredUsers.length / 10) || 1}</span>
                    <div className="flex gap-4">
                        <Button variant="ghost" className="h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-500 hover:bg-white/5 hover:text-white transition-all disabled:opacity-10" disabled>Previous Phase</Button>
                        <Button className="h-14 px-10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] bg-white text-slate-900 hover:bg-white/90 shadow-xl transition-all">Next Phase <ChevronRight className="ml-2 h-4 w-4" /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
