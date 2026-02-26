import { useEffect, useState } from "react";
import { mockDb, Transaction } from "@/lib/mockDb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Download, Wallet, TrendingUp, TrendingDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserTransactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const userData = mockDb.getUser();
        setTransactions(userData.transactions);
    }, []);

    const filtered = transactions.filter(t =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalInflow = transactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalOutflow = transactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Financial Ledger</h2>
                    <p className="text-slate-500 font-medium">Detailed audit of all cryptographic and physical asset movements.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full h-11 px-8 border-slate-200 font-bold text-slate-600 bg-white">
                        <Download className="h-4 w-4 mr-2" />
                        Generate Intelligence Report
                    </Button>
                </div>
            </div>

            {/* Cashflow Intel */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-none bg-white p-6 rounded-[2rem] shadow-xl flex items-center gap-6 group hover:shadow-2xl transition-all">
                    <div className="h-14 w-14 rounded-[1.2rem] bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">
                        <TrendingUp className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Yield</p>
                        <p className="text-2xl font-black text-slate-900 tabular-nums">₦ {totalInflow.toLocaleString()}</p>
                    </div>
                </Card>

                <Card className="border-none bg-white p-6 rounded-[2rem] shadow-xl flex items-center gap-6 group hover:shadow-2xl transition-all">
                    <div className="h-14 w-14 rounded-[1.2rem] bg-red-50 flex items-center justify-center text-red-500 shrink-0 group-hover:scale-110 transition-transform">
                        <TrendingDown className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Outflow</p>
                        <p className="text-2xl font-black text-slate-900 tabular-nums">₦ {totalOutflow.toLocaleString()}</p>
                    </div>
                </Card>

                <Card className="border-none bg-[#0a0f1c] text-white p-6 rounded-[2rem] shadow-xl flex items-center gap-6 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-3xl" />
                    <div className="h-14 w-14 rounded-[1.2rem] bg-white/10 flex items-center justify-center text-primary shrink-0 relative z-10">
                        <Zap className="h-7 w-7" />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Protocol Status</p>
                        <p className="text-xl font-black tracking-tight">Secure & Synchronized</p>
                    </div>
                </Card>
            </div>

            {/* Ledger Table */}
            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="px-10 py-8 border-b border-slate-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                            <Input
                                placeholder="Search by recipient or reference..."
                                className="h-14 pl-14 rounded-2xl bg-slate-50 border-none px-6 text-sm font-bold focus-visible:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Button variant="ghost" className="h-14 w-14 rounded-2xl bg-slate-50 hover:bg-slate-100">
                                <Filter className="h-6 w-6 text-slate-400" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-6 py-6">
                    <div className="space-y-2">
                        {filtered.length === 0 ? (
                            <div className="text-center py-20">
                                <Search className="h-12 w-12 text-slate-100 mx-auto mb-4" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No matching nodes found in history.</p>
                            </div>
                        ) : (
                            filtered.map((t, i) => (
                                <div key={t.id} className="flex items-center justify-between p-6 rounded-[1.8rem] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100 cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-105",
                                            t.type === 'credit' ? 'bg-emerald-50 text-emerald-500 shadow-emerald-500/5' : 'bg-red-50 text-red-500 shadow-red-500/5'
                                        )}>
                                            {t.type === 'credit' ? <ArrowDownLeft className="h-8 w-8" /> : <ArrowUpRight className="h-8 w-8" />}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{t.description}</p>
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{new Date(t.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                                <span className="h-1 w-1 rounded-full bg-slate-200" />
                                                <span className="text-[10px] font-bold font-mono text-slate-300 uppercase">{t.reference}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                        <p className={cn(
                                            "text-2xl font-black tabular-nums",
                                            t.type === 'credit' ? 'text-emerald-500' : 'text-slate-900 group-hover:text-red-500 transition-colors'
                                        )}>
                                            {t.type === 'credit' ? '+' : '-'} ₦{t.amount.toLocaleString()}
                                        </p>
                                        <Badge variant="outline" className={cn(
                                            "rounded-full px-3 py-0.5 text-[8px] font-black uppercase tracking-widest border-none",
                                            t.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                        )}>
                                            {t.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
