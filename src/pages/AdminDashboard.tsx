import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
    LayoutDashboard,
    Users,
    FileCheck,
    Settings,
    LogOut,
    Bell,
    User,
    ShieldAlert,
    TrendingUp,
    CreditCard,
    PenTool,
    Building2,
    MessageSquare,
    BarChart3,
    Activity,
    Fingerprint,
    Store,
    Zap,
    ChevronRight,
    Command,
    Search,
    Cpu,
    Database,
    Globe,
    Lock,
    ArrowUpRight,
    ArrowDownRight,
    History,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://bfgjdjroeqvxacahfsky.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";

export default function AdminDashboard() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [recentTickets, setRecentTickets] = useState<any[]>([]);

    useEffect(() => {
        if (location.pathname === "/admin") {
            const fetchTickets = async () => {
                try {
                    const token = localStorage.getItem('sb-' + SUPABASE_URL.replace('https://', '').split('.')[0] + '-auth-token');
                    let accessToken = SUPABASE_KEY;
                    if (token) {
                        try {
                            const parsed = JSON.parse(token);
                            accessToken = parsed.access_token || SUPABASE_KEY;
                        } catch { }
                    }

                    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages?order=created_at.desc&limit=5`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': SUPABASE_KEY,
                            'Authorization': `Bearer ${accessToken}`,
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setRecentTickets(data);
                    }
                } catch (err) {
                    console.error("Error fetching tickets", err);
                }
            };
            fetchTickets();
        }
    }, [location.pathname]);

    const sidebarItems = [
        { icon: LayoutDashboard, label: "Dashboard Overview", href: "/admin" },
        { icon: BarChart3, label: "Financial Analytics", href: "/admin/analytics" },
        { icon: Zap, label: "Fraud Protection", href: "/admin/fraud" },
        { icon: Activity, label: "System Status", href: "/admin/health" },
        { icon: TrendingUp, label: "Transaction Activity", href: "/admin/transactions" },
        { icon: Users, label: "Customer Accounts", href: "/admin/users" },
        { icon: Store, label: "Agent Network", href: "/admin/agents" },
        { icon: CreditCard, label: "Loan Management", href: "/admin/loans" },
        { icon: FileCheck, label: "Compliance & KYC", href: "/admin/kyc" },
        { icon: Fingerprint, label: "Access Control", href: "/admin/provisioning" },
        { icon: MessageSquare, label: "Support Center", href: "/admin/tickets" },
        { icon: ShieldAlert, label: "Security Logs", href: "/admin/audit" },
        { icon: Building2, label: "Bank Products", href: "/admin/products" },
        { icon: PenTool, label: "Website Content", href: "/admin/content" },
        { icon: Settings, label: "System Settings", href: "/admin/settings" },
    ];

    const handleSignOut = async () => {
        await signOut();
        navigate("/auth");
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex font-sans selection:bg-primary/20">
            {/* Premium Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0f1c] text-slate-400 border-r border-white/5 shadow-[20px_0_50px_-20px_rgba(0,0,0,0.5)] flex flex-col">
                <div className="h-24 flex items-center px-8 border-b border-white/5 bg-[#0a0f1c]">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Command className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-lg text-white tracking-tight leading-none">RIVERS MFB</span>
                            <span className="text-[10px] font-black text-primary/80 uppercase tracking-[0.3em] mt-1">Management System</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                    <div className="space-y-2">
                        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">Core Management</p>
                        <nav className="space-y-1">
                            {sidebarItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={cn(
                                            "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                                            isActive
                                                ? "bg-primary text-white shadow-xl shadow-primary/20"
                                                : "hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-primary")} />
                                            <span className="text-[11px] font-black uppercase tracking-wider">{item.label}</span>
                                        </div>
                                        {isActive && <ChevronRight className="h-3.5 w-3.5 opacity-50" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="px-4">
                        <Card className="bg-gradient-to-br from-primary/10 to-indigo-500/10 border-white/5 p-6 rounded-[2rem] relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-500">
                                <Cpu className="h-24 w-24 text-primary" />
                            </div>
                            <div className="relative z-10 space-y-4">
                                <p className="text-[9px] font-black text-primary uppercase tracking-widest">Storage Status</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-[11px] font-black text-white">
                                        <span>LEDGER_01</span>
                                        <span>78%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary w-[78%]" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="p-6 border-t border-white/5 bg-[#0a0f1c]">
                    <button
                        onClick={handleSignOut}
                        className="w-full h-14 rounded-2xl bg-red-500/5 hover:bg-red-500 transition-all text-red-500 hover:text-white flex items-center justify-center gap-3 group"
                    >
                        <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Decker */}
            <main className="flex-1 ml-72 min-h-screen flex flex-col relative">
                {/* Premium Header */}
                <header className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-40">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                            <Search className="h-4 w-4 text-slate-400" />
                            <input
                                placeholder="Search infrastructure..."
                                className="bg-transparent border-none outline-none text-xs font-bold text-slate-600 w-64 placeholder:text-slate-300"
                            />
                        </div>
                        <div className="h-6 w-px bg-slate-100" />
                        <div className="hidden lg:flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Status</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-wider">Nominal</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network Latency</span>
                                <span className="text-[10px] font-black text-slate-900 tracking-wider">12ms_STABLE</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-slate-50 transition-all relative">
                                <Bell className="h-5 w-5 text-slate-400" />
                                <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary border-2 border-white" />
                            </Button>
                            <Button variant="ghost" className="h-12 w-12 rounded-2xl hover:bg-slate-50 transition-all">
                                <History className="h-5 w-5 text-slate-400" />
                            </Button>
                        </div>
                        <div className="h-8 w-px bg-slate-100" />
                        <div className="flex items-center gap-4 group cursor-pointer">
                            <div className="flex flex-col items-end text-right">
                                <span className="text-sm font-black text-slate-900 tracking-tight leading-none group-hover:text-primary transition-colors">{user?.email?.split('@')[0]}</span>
                                <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mt-1">Super_Admin_Level_4</span>
                            </div>
                            <div className="relative">
                                <Avatar className="h-12 w-12 border-4 border-slate-50 shadow-xl transition-all group-hover:scale-105 group-hover:rotate-3 rounded-2xl overflow-hidden">
                                    <AvatarFallback className="bg-[#0a0f1c] text-white font-black text-xs">AD</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Viewport */}
                <div className="p-10 flex-1 relative overflow-hidden">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-7xl mx-auto">
                        {location.pathname === "/admin" ? (
                            <div className="space-y-12 animate-fade-in pb-20">
                                {/* Institutional Greeting */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Operations Commander</span>
                                        </div>
                                        <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Infrastructure Command</h2>
                                        <p className="text-slate-500 font-medium text-lg">Real-time telemetry and orchestrator for all banking services.</p>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white p-2 rounded-[2rem] shadow-xl border border-slate-50">
                                        <Button className="h-12 px-6 rounded-[1.5rem] bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest gap-2 shadow-lg hover:scale-105 transition-all active:scale-95">
                                            <Activity className="h-4 w-4" /> Live Stream
                                        </Button>
                                        <Button variant="ghost" className="h-12 px-6 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest gap-2 hover:bg-slate-50 text-slate-400">
                                            <History className="h-4 w-4" /> Snapshot
                                        </Button>
                                    </div>
                                </div>

                                {/* High-Level Metrics Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                    {[
                                        { label: "Total Liquidity", val: "₦ 1.28B", delta: "+₦ 4.2M", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50" },
                                        { label: "Loan Exposure", val: "₦ 542.4M", delta: "1,248 Nodes", icon: CreditCard, color: "text-blue-500", bg: "bg-blue-50" },
                                        { label: "Active Identities", val: "25,482", delta: "+12.4% MoM", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
                                        { label: "Security Health", val: "99.98%", delta: "Alpha Protocol", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
                                    ].map((m, i) => (
                                        <Card key={i} className="border-none shadow-2xl bg-white p-8 rounded-[3rem] group hover:-translate-y-2 transition-all duration-500 border border-slate-50">
                                            <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                    <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110", m.bg)}>
                                                        <m.icon className={cn("h-6 w-6", m.color)} />
                                                    </div>
                                                    <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center">
                                                        <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{m.label}</h3>
                                                    <div className="text-2xl font-black text-slate-900 tracking-tighter">{m.val}</div>
                                                    <p className={cn("text-[10px] font-black uppercase tracking-widest", m.color)}>{m.delta}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                <div className="grid lg:grid-cols-3 gap-10">
                                    {/* Velocity Analysis */}
                                    <Card className="lg:col-span-2 border-none shadow-2xl bg-white rounded-[4rem] overflow-hidden border border-slate-50">
                                        <CardHeader className="p-12 border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
                                            <div className="space-y-1">
                                                <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Financial Velocity</CardTitle>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Inter-Agency Settlement Flow</p>
                                            </div>
                                            <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm gap-2">
                                                <Button size="sm" className="bg-primary text-white rounded-xl font-black text-[9px] uppercase px-4 hover:bg-primary/90">Real_Time</Button>
                                                <Button size="sm" variant="ghost" className="rounded-xl font-black text-[9px] uppercase px-4 text-slate-400 hover:bg-slate-50">Historical</Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-12">
                                            <div className="h-[300px] w-full flex items-end justify-between gap-6 px-4">
                                                {[75, 55, 90, 65, 85, 45, 100, 70, 95, 60, 80, 50].map((h, i) => (
                                                    <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                                        <div className="w-full bg-slate-50 rounded-2xl relative transition-all duration-500 hover:bg-slate-100 cursor-pointer overflow-hidden" style={{ height: `${h}%` }}>
                                                            <div className="absolute inset-x-0 bottom-0 bg-primary/20 transition-all duration-500 group-hover:bg-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]" style={{ height: "40%" }} />
                                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-3 py-1.5 rounded-xl opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all shadow-xl">
                                                                ₦{h * 1.5}M
                                                            </div>
                                                        </div>
                                                        <span className="text-[9px] font-black text-slate-400 uppercase transform -rotate-45 md:rotate-0 tracking-widest">{i === 11 ? 'NOW' : i + 1}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Telemetry Feed */}
                                    <Card className="border-none shadow-2xl bg-[#0a0f1c] rounded-[4rem] flex flex-col overflow-hidden group">
                                        <CardHeader className="p-10 border-b border-white/5 bg-[#0a0f1c]">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <CardTitle className="text-xl font-black text-white tracking-tight">Security Pulse</CardTitle>
                                                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#3b82f6]" /> Live_Intercept
                                                    </p>
                                                </div>
                                                <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                    <Lock className="h-5 w-5 text-primary" />
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-10 flex-1 space-y-8 overflow-y-auto custom-scrollbar-dark">
                                            {[
                                                { time: '12:40:02', msg: 'KYC_ORCHESTRATOR: Identity USR-882 Verified', color: 'text-emerald-400' },
                                                { time: '12:38:15', msg: 'LEDGER_SETTLE: TRX-992 Complete (₦4.2M)', color: 'text-blue-400' },
                                                { time: '12:35:44', msg: 'AUTH_CHALLENGE: Multi-hop login block (IP: 45.*)', color: 'text-orange-400' },
                                                { time: '12:32:01', msg: 'PROD_SWAP: Lending interest adjustment synced', color: 'text-indigo-400' },
                                                { time: '12:30:12', msg: 'SYS_NOMINAL: Global kernel check complete', color: 'text-primary' },
                                            ].map((log, i) => (
                                                <div key={i} className="flex gap-4 group/log cursor-default">
                                                    <span className="text-[10px] font-black text-slate-600 font-mono shrink-0 py-0.5">{log.time}</span>
                                                    <span className={cn("text-[11px] font-bold leading-relaxed transition-all group-hover/log:translate-x-1", log.color)}>
                                                        {log.msg}
                                                    </span>
                                                </div>
                                            ))}
                                            <Button className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-white/10 transition-all mt-8">
                                                Open Raw Terminal
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Recent Support Tickets */}
                                <Card className="border-none shadow-2xl bg-white rounded-[4rem] overflow-hidden border border-slate-50">
                                    <div className="p-10 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Recent Support Tickets</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Latest inquiries from the contact form.</p>
                                        </div>
                                        <Button asChild className="h-12 px-8 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-3">
                                            <Link to="/admin/tickets">
                                                <MessageSquare className="h-4 w-4" /> Go to Support Center
                                            </Link>
                                        </Button>
                                    </div>
                                    <div className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-slate-50/30">
                                                    <tr className="text-left">
                                                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer Name</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Subject</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
                                                        <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {recentTickets.length > 0 ? recentTickets.map((ticket, i) => (
                                                        <tr key={ticket.id || i} className="hover:bg-slate-50/50 transition-all group">
                                                            <td className="px-10 py-8">
                                                                <Badge className={cn("px-4 py-1 rounded-full font-black text-[9px] uppercase tracking-widest border-none",
                                                                    ticket.status === 'open' ? 'bg-emerald-50 text-emerald-600' :
                                                                        ticket.status === 'pending' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-600')}>
                                                                    {ticket.status}
                                                                </Badge>
                                                            </td>
                                                            <td className="px-10 py-8 font-black text-slate-900 text-sm group-hover:text-primary transition-colors">{ticket.name}</td>
                                                            <td className="px-10 py-8 text-xs font-bold text-slate-500 italic uppercase tracking-wider line-clamp-1 max-w-[200px] mt-8">{ticket.subject}</td>
                                                            <td className="px-10 py-8 font-black text-slate-900 text-sm tracking-tighter">
                                                                {new Date(ticket.created_at).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-10 py-8 text-center text-[10px] font-black tracking-widest uppercase cursor-pointer hover:text-primary transition-colors underline decoration-slate-200 underline-offset-8">
                                                                <Link to="/admin/tickets">Reply</Link>
                                                            </td>
                                                        </tr>
                                                    )) : (
                                                        <tr>
                                                            <td colSpan={5} className="px-10 py-8 text-center text-sm font-medium text-slate-500">
                                                                No recent support tickets
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
