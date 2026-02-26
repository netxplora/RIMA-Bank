import { useState } from "react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Search, Filter, ArrowUpRight, ArrowDownLeft,
    Eye, ShieldAlert, Zap, Globe, Download,
    MoreHorizontal, CheckCircle2, AlertTriangle, Clock, RefreshCcw, Signal, Terminal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MOCK_TRANSACTIONS = [
    { id: "TX-12049-SEC", user: "James Okeke", type: "transfer", amount: 25000, recipient: "UBA - 1234567890", date: "Jan 24, 14:22", status: "success", risk: 2, gateway: "NIBSS" },
    { id: "TX-12050-SEC", user: "Sarah Nwachukwu", type: "deposit", amount: 150000, recipient: "Institutional Vault", date: "Jan 24, 13:10", status: "pending", risk: 5, gateway: "SYSTEM" },
    { id: "TX-12051-SEC", user: "Amadi Chinedu", type: "transfer", amount: 5000, recipient: "Zenith - 0987654321", date: "Jan 24, 12:45", status: "failed", risk: 12, gateway: "NIBSS" },
    { id: "TX-12052-SEC", user: "Bisi Adebayo", type: "deposit", amount: 20000, recipient: "Institutional Vault", date: "Jan 24, 11:30", status: "success", risk: 0, gateway: "INTERSWITCH" },
    { id: "TX-12053-SEC", user: "Demo User", type: "transfer", amount: 50000, recipient: "GTBank - 2233445566", date: "Jan 24, 10:15", status: "success", risk: 8, gateway: "PAYSTACK" },
    { id: "TX-12054-SEC", user: "Suspicious Node", type: "transfer", amount: 450000, recipient: "Foreign Node - 001235", date: "Jan 24, 09:45", status: "pending", risk: 85, gateway: "REMITA" },
];

export default function TransactionMonitor() {
    const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
    const [search, setSearch] = useState("");

    const filtered = transactions.filter(tx =>
        tx.user.toLowerCase().includes(search.toLowerCase()) ||
        tx.id.toLowerCase().includes(search.toLowerCase()) ||
        tx.gateway.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Live Settlement Protocol Active</span>
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Institutional Ledger</h2>
                    <p className="text-slate-500 font-medium">Real-time oversight of global financial flow and node-to-node liquidity.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-8 rounded-2xl border-slate-200 font-bold text-slate-600 bg-white">
                        <Download className="mr-2 h-4 w-4" /> Export Audit Log
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl bg-[#0a0f1c] hover:bg-slate-900 font-bold">
                        <RefreshCcw className="mr-2 h-4 w-4" /> Reconcile Pipeline
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { l: "Settlement Queue", v: "14 Nodes", sub: "₦ 1.2M IN FLIGHT", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
                    { l: "Security Alerts", v: "3 Flagged", sub: "HIGH VOLATILITY", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50" },
                    { l: "Gateway Health", v: "99.2% Up", sub: "NIBSS RELAY ACTIVE", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-50" },
                    { l: "Daily Magnitude", v: "₦ 12.8M", sub: "72% OF QUOTA", icon: Zap, color: "text-blue-500", bg: "bg-blue-50" }
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl bg-white p-6 rounded-[2rem] group hover:scale-[1.02] transition-all">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                {stat.l}
                                <stat.icon className={cn("h-3 w-3", stat.color)} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="text-2xl font-black text-slate-900">{stat.v}</div>
                            <p className={cn("text-[9px] font-black mt-2 tracking-widest", stat.color)}>{stat.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filter Hub */}
            <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-50 flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                    <Input
                        placeholder="Scan for reference ID, origin entity or terminal node..."
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

            {/* Ledger Table */}
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="py-8 pl-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Protocol ID / State</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Originating Node</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Settlement Bridge</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Magnitude</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Risk Profile</TableHead>
                            <TableHead className="text-right pr-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Trace</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((tx) => (
                            <TableRow key={tx.id} className="hover:bg-slate-50/50 transition-all border-b border-slate-50 group">
                                <TableCell className="py-8 pl-10">
                                    <div className="font-mono text-[10px] font-black text-[#0a0f1c] bg-slate-100 w-fit px-2 py-1 rounded-md">{tx.id}</div>
                                    <Badge
                                        className={cn(
                                            "mt-2 text-[8px] font-black uppercase tracking-widest border-none shadow-sm",
                                            tx.status === 'success' ? "bg-emerald-50 text-emerald-500" :
                                                tx.status === 'failed' ? "bg-red-50 text-red-500" :
                                                    "bg-orange-50 text-orange-500"
                                        )}
                                    >
                                        <div className={cn("h-1 w-1 rounded-full mr-1.5",
                                            tx.status === 'success' ? "bg-emerald-500" :
                                                tx.status === 'failed' ? "bg-red-500" : "bg-orange-500"
                                        )} />
                                        {tx.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="font-black text-slate-900 text-base group-hover:text-primary transition-colors">{tx.user}</div>
                                    <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{tx.date}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                                            tx.type === 'transfer' ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"
                                        )}>
                                            {tx.type === 'transfer' ? (
                                                <ArrowUpRight className="h-5 w-5" />
                                            ) : (
                                                <ArrowDownLeft className="h-5 w-5" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="text-[11px] font-black text-slate-900 uppercase tracking-tighter leading-none">{tx.gateway} BRIDGE</div>
                                            <div className="text-[9px] text-slate-400 font-bold mt-1 uppercase">{tx.recipient}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="font-black text-slate-900 text-lg tabular-nums">₦{tx.amount.toLocaleString()}</div>
                                    <div className="text-[8px] text-slate-300 font-black uppercase tracking-widest mt-1">Institutional Settlement</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full transition-all duration-1000",
                                                    tx.risk > 70 ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : tx.risk > 30 ? "bg-orange-500" : "bg-emerald-500"
                                                )}
                                                style={{ width: `${tx.risk}%` }}
                                            />
                                        </div>
                                        <span className={cn("text-[10px] font-black", tx.risk > 70 ? "text-red-500" : "text-slate-400")}>
                                            {tx.risk}%
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-10">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#0a0f1c]">
                                            <Terminal className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-[#0a0f1c]">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="p-8 border-t border-slate-50 bg-[#0a0f1c] flex items-center justify-between text-white">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">NIBSS Tunnel Open</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Paystack Bridge Secure</p>
                        </div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Ledger Verification v4.2.0-SEC</p>
                </div>
            </Card>
        </div>
    );
}
