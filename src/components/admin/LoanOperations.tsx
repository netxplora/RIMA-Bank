import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Search, Filter, CheckCircle2, XCircle, Clock,
    ArrowUpRight, AlertTriangle, FileText, Download,
    ShieldCheck, Zap, MoreHorizontal, ChevronRight, PieChart, TrendingUp, Briefcase
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mockDb } from "@/lib/mockDb";
import { cn } from "@/lib/utils";

const MOCK_LOANS = [
    { id: "LN-2024-001-SEC", applicant: "James Okeke", amount: 5000000, type: "SME Expansion", status: "pending", date: "Jan 24, 2024", score: 750, risk: "low" },
    { id: "LN-2024-002-SEC", applicant: "Sarah Nwachukwu", amount: 200000, type: "Personal Bridge", status: "approved", date: "Jan 23, 2024", score: 820, risk: "minimal" },
    { id: "LN-2024-003-SEC", applicant: "Emeka Balogun", amount: 1500000, type: "Inventory Ledger", status: "rejected", date: "Jan 20, 2024", score: 580, risk: "high" },
    { id: "LN-2024-004-SEC", applicant: "Grace Effiong", amount: 50000, type: "Micro Liquidity", status: "pending", date: "Jan 24, 2024", score: 690, risk: "medium" },
];

export default function LoanOperations() {
    const [loans, setLoans] = useState([...MOCK_LOANS, ...mockDb.getLoans()]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    const handleAction = (id: string, action: string) => {
        try {
            mockDb.updateLoanStatus(id, action as 'approved' | 'rejected');
        } catch (e) { }
        setLoans(loans.map(l => l.id === id ? { ...l, status: action } : l));
        toast.success(`Credit protocol executed: ${action === 'approved' ? 'Capital deployed' : 'Application terminated'}`);
    };

    const filteredLoans = loans.filter(l => {
        const matchesFilter = filter === "all" ? true : l.status === filter;
        const matchesSearch = l.applicant?.toLowerCase().includes(search.toLowerCase()) ||
            l.id?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getRiskBadge = (risk: string) => {
        switch (risk) {
            case 'minimal': return <Badge className="bg-emerald-50 text-emerald-500 border-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5">Minimal Risk</Badge>;
            case 'low': return <Badge className="bg-blue-50 text-blue-500 border-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5">Managed Risk</Badge>;
            case 'medium': return <Badge className="bg-orange-50 text-orange-500 border-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5">Elevated Risk</Badge>;
            case 'high': return <Badge className="bg-red-50 text-red-500 border-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5">Critical Risk</Badge>;
            default: return <Badge className="bg-slate-50 text-slate-500 border-none font-black text-[8px] uppercase tracking-widest px-2 py-0.5">Unknown</Badge>;
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Credit Intelligence</h2>
                    <p className="text-slate-500 font-medium">Automated risk synthesis and disbursement command nexus.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-8 rounded-2xl border-slate-200 font-bold text-slate-600 bg-white">
                        <Download className="mr-2 h-4 w-4" /> Export Portfolio Report
                    </Button>
                    <Button className="h-12 px-8 rounded-2xl bg-[#0a0f1c] hover:bg-slate-900 font-bold group">
                        <Zap className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" /> Synchronize Scoring
                    </Button>
                </div>
            </div>

            {/* Credit Metrics Grid */}
            <div className="grid md:grid-cols-4 gap-6">
                {[
                    { l: "Global Exposure", v: "₦ 85.4M", sub: "120M SET LIMIT", icon: PieChart, color: "text-blue-500" },
                    { l: "Live Contracts", v: "342", sub: "65% ALLOCATION", icon: Briefcase, color: "text-indigo-500" },
                    { l: "Queue Latency", v: "12 Apps", sub: "AVG 4.2H RESPONSE", icon: Clock, color: "text-orange-500" },
                    { l: "Default Rate", v: "2.4%", sub: "BELOW 3.0% TARGET", icon: TrendingUp, color: "text-emerald-500" }
                ].map((stat, i) => (
                    <Card key={i} className="border-none shadow-xl bg-white p-6 rounded-[2rem] group hover:shadow-2xl transition-all">
                        <CardContent className="p-0">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.l}</span>
                                <stat.icon className={cn("h-4 w-4", stat.color)} />
                            </div>
                            <div className="text-2xl font-black text-slate-900">{stat.v}</div>
                            <p className={cn("text-[8px] font-black mt-2 tracking-widest opacity-60 uppercase", stat.color)}>{stat.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Nexus Controls */}
            <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-slate-50 flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                    <Input
                        placeholder="Scan applicant DNA, contract ID or legal entity name..."
                        className="h-14 pl-14 rounded-2xl bg-slate-50 border-none px-6 text-sm font-bold focus-visible:ring-primary/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="h-14 px-8 rounded-2xl bg-slate-50 border-none font-black text-[10px] uppercase tracking-widest text-slate-400 w-full md:w-[220px]">
                            <SelectValue placeholder="Protocol State" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100 p-2 shadow-2xl">
                            <SelectItem value="all" className="rounded-lg font-bold text-xs py-3">Global Queue</SelectItem>
                            <SelectItem value="pending" className="rounded-lg font-bold text-xs py-3">In Review</SelectItem>
                            <SelectItem value="approved" className="rounded-lg font-bold text-xs py-3">Disbursed</SelectItem>
                            <SelectItem value="rejected" className="rounded-lg font-bold text-xs py-3">Terminated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Decision Registry Table */}
            <Card className="border-none shadow-2xl rounded-[3rem] overflow-hidden bg-white">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="py-8 pl-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Applicant Node</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contract Magnitudes</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Risk Synthesis</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Decision State</TableHead>
                            <TableHead className="text-right pr-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Final Protocol</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLoans.map((loan) => (
                            <TableRow key={loan.id} className="hover:bg-slate-50/50 transition-all border-b border-slate-50 group">
                                <TableCell className="py-8 pl-10">
                                    <div className="font-black text-slate-900 text-base group-hover:text-primary transition-colors">{loan.applicant}</div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <Badge className="bg-slate-100 text-slate-500 border-none text-[8px] font-black px-1.5 py-0.5 uppercase tracking-tighter">{loan.id}</Badge>
                                        <span className="text-[9px] text-slate-300 font-black uppercase tracking-widest">Applied {loan.date}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-xl font-black text-slate-900 tabular-nums">₦{loan.amount.toLocaleString()}</div>
                                    <div className="text-[8px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{loan.type}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full transition-all duration-1000",
                                                        (loan.score || 650) > 700 ? "bg-emerald-500" : (loan.score || 650) > 600 ? "bg-orange-500" : "bg-red-500"
                                                    )}
                                                    style={{ width: `${((loan.score || 650) / 1000) * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-900">{loan.score || 650}pts</span>
                                        </div>
                                        {getRiskBadge(loan.risk || 'medium')}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        className={cn(
                                            "px-4 py-1 text-[9px] font-black uppercase tracking-widest border-none shadow-sm",
                                            loan.status === 'approved' ? 'bg-emerald-50 text-emerald-500' :
                                                loan.status === 'rejected' ? 'bg-red-50 text-red-500' :
                                                    'bg-orange-50 text-orange-500'
                                        )}
                                    >
                                        {loan.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right pr-10">
                                    {loan.status === 'pending' ? (
                                        <div className="flex items-center justify-end gap-3">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" className="h-10 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-black text-[9px] uppercase tracking-widest shadow-lg shadow-emerald-500/20">Authorize Cashflow</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[450px] rounded-[2.5rem] border-none shadow-2xl p-10">
                                                    <DialogHeader className="mb-6">
                                                        <div className="h-16 w-16 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center mb-6">
                                                            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                                                        </div>
                                                        <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Final Disbursement Command</DialogTitle>
                                                        <DialogDescription className="text-slate-500 font-medium leading-relaxed">
                                                            You are about to authorize an instant capital injection of <strong className="text-slate-900">₦{loan.amount.toLocaleString()}</strong> into the node registry for <strong className="text-slate-900">{loan.applicant}</strong>.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="space-y-6 py-6 border-y border-slate-50">
                                                        <div className="grid grid-cols-2 gap-y-4 text-[10px] font-black uppercase tracking-widest">
                                                            <div className="text-slate-400">Beneficiary:</div>
                                                            <div className="text-right text-slate-900">{loan.applicant}</div>
                                                            <div className="text-slate-400">Security Index:</div>
                                                            <div className="text-right text-emerald-500">{loan.score || 650} High Quality</div>
                                                            <div className="text-slate-400">Settlement ID:</div>
                                                            <div className="text-right text-[#0a0f1c] font-mono">{loan.id}</div>
                                                        </div>
                                                        <div className="p-4 rounded-2xl bg-slate-900 text-white/90 text-[10px] font-bold italic leading-relaxed">
                                                            "Protocol confirmation will trigger immediate inter-bank settlement. This action is recorded in the permanent institutional ledger."
                                                        </div>
                                                    </div>
                                                    <DialogFooter className="mt-8 gap-3 sm:flex-col">
                                                        <Button onClick={() => handleAction(loan.id, 'approved')} className="h-14 w-full bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black text-sm tracking-tight shadow-xl shadow-emerald-500/20">Execute Disbursement Order</Button>
                                                        <Button variant="ghost" className="h-12 w-full rounded-xl font-bold text-slate-400 text-xs">Cancel Protocol</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button size="sm" variant="ghost" className="h-10 px-4 rounded-xl text-red-500 hover:bg-red-50 font-black text-[9px] uppercase tracking-widest" onClick={() => handleAction(loan.id, 'rejected')}>Deny</Button>
                                        </div>
                                    ) : (
                                        <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl hover:bg-slate-100 text-slate-300 hover:text-slate-900">
                                            <MoreHorizontal className="h-6 w-6" />
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
