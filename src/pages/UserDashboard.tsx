import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
    LayoutDashboard,
    CreditCard,
    History,
    Send,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    User,
    ArrowRight,
    ArrowUpRight,
    ArrowDownLeft,
    CheckCircle,
    TrendingUp,
    ShieldCheck,
    Smartphone,
    Wallet,
    Plus,
    Minus,
    Zap,
    LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { mockDb, Transaction } from "@/lib/mockDb";

export default function UserDashboard() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userData, setUserData] = useState(mockDb.getUser());

    useEffect(() => {
        setUserData(mockDb.getUser());
    }, [location.pathname]);

    const sidebarItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
        { icon: History, label: "Transaction History", href: "/dashboard/transactions" },
        { icon: Send, label: "Move Money", href: "/dashboard/transfers" },
        { icon: CreditCard, label: "My Cards", href: "/dashboard/cards" },
        { icon: TrendingUp, label: "Loan Services", href: "/dashboard/loans" },
        { icon: Settings, label: "Security & Settings", href: "/dashboard/settings" },
    ];

    const handleSignOut = async () => {
        await signOut();
        navigate("/auth");
    };

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-primary/10">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0f1c] text-white transition-all duration-500 ease-in-out border-r border-white/5 shadow-2xl overflow-hidden",
                    !isSidebarOpen && "-translate-x-full lg:translate-x-0 lg:w-24"
                )}
            >
                <div className="h-20 flex items-center px-8 border-b border-white/5">
                    <img src="/rima-logo.png" alt="RIMA" className="h-8 w-auto grayscale brightness-200" />
                    <span className={cn("ml-3 font-display font-bold text-xl tracking-tight transition-all duration-300", !isSidebarOpen && "lg:opacity-0 lg:w-0")}>
                        RIMA <span className="text-primary font-normal">Vault</span>
                    </span>
                </div>

                <nav className="p-6 space-y-1.5 pt-10">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group relative",
                                    isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive && "text-white")} />
                                <span className={cn("font-medium transition-all duration-300", !isSidebarOpen && "lg:opacity-0 lg:w-0")}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full lg:hidden md:block" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-8 left-0 right-0 px-6">
                    <div className={cn(
                        "p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 transition-all",
                        !isSidebarOpen && "lg:p-2 lg:text-center"
                    )}>
                        <p className={cn("text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1", !isSidebarOpen && "lg:hidden")}>Security Status</p>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className={cn("text-[10px] font-bold text-emerald-500/80 uppercase", !isSidebarOpen && "lg:hidden")}>Secure Connection</span>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/20 h-12 px-4 rounded-xl", !isSidebarOpen && "lg:justify-center")}
                        onClick={handleSignOut}
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        <span className={cn("font-bold text-xs uppercase tracking-widest transition-all", !isSidebarOpen && "lg:hidden")}>Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 transition-all duration-500 min-h-screen flex flex-col",
                isSidebarOpen ? "lg:ml-72" : "lg:ml-24"
            )}>
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-40 transition-all">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-500 hover:bg-slate-100 rounded-full">
                            <Menu className="h-6 w-6" />
                        </Button>
                        <div className="hidden sm:block">
                            <h1 className="font-display font-bold text-xl text-slate-900">Account Overview</h1>
                            <p className="text-xs text-slate-400 font-medium">Manage your finances securely.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-2">
                            <Button variant="outline" size="sm" className="h-9 px-4 rounded-full border-slate-200 text-slate-600 font-bold text-[10px] uppercase">
                                <Zap className="h-3.5 w-3.5 mr-2 text-primary" /> Boost Account
                            </Button>
                        </div>
                        <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-950 rounded-full">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-white" />
                        </Button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
                            <div className="text-right hidden sm:block">
                                <span className="text-sm font-bold text-slate-900 block leading-tight">{user?.email?.split('@')[0]}</span>
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Verified Member</span>
                            </div>
                            <Avatar className="h-10 w-10 ring-2 ring-slate-50 ring-offset-2 ring-offset-white">
                                <AvatarFallback className="bg-[#0a0f1c] text-white">
                                    <User className="h-5 w-5" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    {location.pathname === "/dashboard" ? (
                        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
                            {/* Hero Balance Section */}
                            <div className="grid lg:grid-cols-3 gap-8">
                                <Card className="lg:col-span-2 border-none bg-[#0a0f1c] text-white overflow-hidden relative group p-8 shadow-2xl rounded-[2rem]">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-10">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                                        <Wallet className="h-4 w-4 text-primary" /> Available Balance
                                                    </p>
                                                    <h2 className="text-5xl font-black tracking-tight flex items-baseline gap-2">
                                                        <span className="text-2xl text-slate-500 font-semibold">₦</span>
                                                        {userData.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                                                    </h2>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="icon" className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all">
                                                        <Plus className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Savings Growth</p>
                                                    <p className="text-lg font-bold text-emerald-400 leading-tight">+₦ 42,500.00</p>
                                                    <p className="text-[9px] text-slate-400 font-medium">MONTHLY YIELD ESTIMATE</p>
                                                </div>
                                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Virtual Card</p>
                                                    <p className="text-lg font-bold text-white leading-tight">** 4920</p>
                                                    <p className="text-[9px] text-primary font-bold uppercase tracking-tighter">Active - Secure</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="border-none bg-white p-8 shadow-xl rounded-[2rem] flex flex-col justify-between">
                                    <div>
                                        <CardTitle className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Wealth Health</CardTitle>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-bold text-slate-900">Spending Ratio</span>
                                                    <span className="text-xs font-bold text-primary">64%</span>
                                                </div>
                                                <Progress value={64} className="h-2 bg-slate-100" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm font-bold text-slate-900">Savings Target</span>
                                                    <span className="text-xs font-bold text-emerald-500">₦ 1.2M / 2M</span>
                                                </div>
                                                <Progress value={60} className="h-2 bg-slate-100" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-8 border-t border-slate-50">
                                        <Button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-950 font-bold border-none h-12 rounded-xl">
                                            Optimize Portfolios
                                        </Button>
                                    </div>
                                </Card>
                            </div>

                            {/* Quick Action Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {[
                                    { icon: Send, label: "Transfer", color: "bg-blue-50 text-blue-600", href: "/dashboard/transfers" },
                                    { icon: Zap, label: "Bill Pay", color: "bg-orange-50 text-orange-600", href: "#" },
                                    { icon: Smartphone, label: "Airtime", color: "bg-purple-50 text-purple-600", href: "#" },
                                    { icon: ShieldCheck, label: "Insure", color: "bg-emerald-50 text-emerald-600", href: "#" },
                                    { icon: CreditCard, label: "Virtual", color: "bg-pink-50 text-pink-600", href: "/dashboard/cards" },
                                    { icon: Plus, label: "Save", color: "bg-indigo-50 text-indigo-600", href: "#" },
                                ].map((action, i) => (
                                    <Link key={i} to={action.href}>
                                        <Card className="border-none bg-white hover:bg-slate-50 transition-all hover:scale-105 cursor-pointer shadow-md rounded-2xl group overflow-hidden">
                                            <CardContent className="p-4 flex flex-col items-center text-center">
                                                <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:rotate-12", action.color)}>
                                                    <action.icon className="h-6 w-6" />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{action.label}</span>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>

                            {/* Activity Section */}
                            <div className="grid lg:grid-cols-3 gap-8">
                                <Card className="lg:col-span-2 border-none bg-white shadow-xl rounded-[2rem] overflow-hidden">
                                    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 px-8 py-6">
                                        <div>
                                            <CardTitle className="text-lg font-bold text-slate-900">Recent Transactions</CardTitle>
                                            <CardDescription>Your latest financial activity.</CardDescription>
                                        </div>
                                        <Link to="/dashboard/transactions">
                                            <Button variant="ghost" size="sm" className="text-primary font-bold hover:bg-primary/5 rounded-full px-6">
                                                View Statement
                                            </Button>
                                        </Link>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="divide-y divide-slate-50">
                                            {userData.transactions.length === 0 ? (
                                                <div className="p-20 text-center text-slate-400 font-medium">No recent transactions found.</div>
                                            ) : (
                                                userData.transactions.slice(0, 5).map((t) => (
                                                    <div key={t.id} className="flex items-center justify-between px-8 py-5 hover:bg-slate-50/80 transition-all group">
                                                        <div className="flex items-center gap-4">
                                                            <div className={cn(
                                                                "h-12 w-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm",
                                                                t.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
                                                            )}>
                                                                {t.type === 'credit' ? <ArrowDownLeft className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6" />}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{t.description}</div>
                                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(t.date).toLocaleDateString()} • {t.id}</div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className={cn("font-black text-lg tabular-nums", t.type === 'credit' ? 'text-emerald-500' : 'text-slate-900')}>
                                                                {t.type === 'credit' ? '+' : '-'}₦ {t.amount.toLocaleString()}
                                                            </div>
                                                            <Badge variant="outline" className="text-[8px] font-black uppercase border-slate-100 text-slate-400">Success</Badge>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="space-y-8">
                                    <Card className="border-none bg-[#1e293b] text-white p-8 shadow-xl rounded-[2rem] relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-6 opacity-10 scale-150 rotate-12 group-hover:scale-[1.8] transition-transform duration-700">
                                            <ShieldCheck className="h-20 w-20" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                                                <ShieldCheck className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="text-lg font-bold mb-2">Secure Banking</h3>
                                            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                                                Your account is protected by multi-factor authentication and real-time transaction monitoring.
                                            </p>
                                            <Button className="w-full bg-white text-slate-950 font-bold hover:bg-slate-50 rounded-xl h-11">
                                                Security Center
                                            </Button>
                                        </div>
                                    </Card>

                                    <Card className="border-none bg-white p-6 shadow-xl rounded-[2rem] flex flex-col items-center text-center group">
                                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                                            <LifeBuoy className="h-8 w-8 text-primary" />
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-1">24/7 Priority Support</h4>
                                        <p className="text-[10px] text-slate-500 mb-6 uppercase tracking-widest">Connect with a consultant</p>
                                        <Button variant="outline" className="w-full rounded-xl border-slate-100 text-slate-600 font-bold text-xs h-10">
                                            Open Support Case
                                        </Button>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-7xl mx-auto">
                            <Outlet />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
