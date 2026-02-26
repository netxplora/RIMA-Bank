import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { mockDb, LoanApplication } from "@/lib/mockDb";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Clock, CheckCircle, XCircle, TrendingUp, ShieldCheck, Zap, Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function UserLoans() {
    const [loans, setLoans] = useState<LoanApplication[]>([]);
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Personal Loan");
    const [purpose, setPurpose] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        loadLoans();
    }, []);

    const loadLoans = () => {
        const user = mockDb.getUser();
        setLoans(user.loans || []);
    };

    const handleApply = async () => {
        if (!amount || !type || !purpose) {
            toast.error("Protocol error: Credit parameters incomplete.");
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2500));

        try {
            mockDb.applyForLoan(Number(amount), type, purpose);
            toast.success("Credit request submitted to intelligence unit.");
            setIsDialogOpen(false);
            setAmount("");
            setPurpose("");
            loadLoans();
        } catch (error) {
            toast.error("Application handshake failed.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Header & Stats */}
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Credit Intelligence</h2>
                    <p className="text-slate-500 font-medium">Access institutional capital and manage your borrowing power.</p>
                </div>
                <div className="flex justify-end gap-3">
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="rounded-full h-12 px-8 bg-[#0a0f1c] text-white hover:bg-slate-900 shadow-xl">
                                <Plus className="mr-2 h-4 w-4" />
                                Activate Credit Line
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden max-w-md">
                            <div className="h-2 bg-primary w-full" />
                            <CardHeader className="px-8 pt-8">
                                <DialogTitle className="text-2xl font-black tracking-tight">Financial Injection</DialogTitle>
                                <DialogDescription className="font-medium text-slate-500">
                                    Our AI will analyze your cashflow for near-instant approval.
                                </DialogDescription>
                            </CardHeader>
                            <div className="px-8 py-6 space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Instrument Type</Label>
                                    <Select value={type} onValueChange={setType}>
                                        <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                            <SelectItem value="Personal Loan" className="font-bold py-3 text-xs">Personal Intel Loan</SelectItem>
                                            <SelectItem value="SME Loan" className="font-bold py-3 text-xs">SME Node Financing</SelectItem>
                                            <SelectItem value="Salary Advance" className="font-bold py-3 text-xs">Liquidity Advance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Volume (₦)</Label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 500,000"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="h-12 rounded-xl bg-slate-50 border-none px-4 font-black text-primary tabular-nums"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rationalization</Label>
                                    <Input
                                        placeholder="Business expansion, Medical, etc."
                                        value={purpose}
                                        onChange={(e) => setPurpose(e.target.value)}
                                        className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold text-sm"
                                    />
                                </div>
                            </div>
                            <DialogFooter className="px-8 pb-8 pt-2">
                                <Button variant="ghost" className="rounded-xl font-bold text-slate-400" onClick={() => setIsDialogOpen(false)}>Abort</Button>
                                <Button className="rounded-xl bg-primary hover:bg-primary/90 h-12 px-8 font-black shadow-lg shadow-primary/20" onClick={handleApply} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Authorize Request"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Credit Analysis Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="border-none bg-[#0a0f1c] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                        <div className="relative h-32 w-32 flex items-center justify-center">
                            <svg className="h-full w-full rotate-[-90deg]">
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset="72.8" className="text-primary" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black">742</span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Excellent</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-bold text-lg">Power Score</h4>
                            <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed font-medium">Your account health is Optimized. You qualify for interest-free advances.</p>
                        </div>
                    </div>
                </Card>

                <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
                    <Card className="border-none bg-white p-8 rounded-[2rem] shadow-xl space-y-6">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Borrowing Capacity</p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">₦ 4.5M</h3>
                        </div>
                        <div className="pt-4 border-t border-slate-50">
                            <p className="text-xs font-bold text-slate-400">Next increase in 42 days</p>
                        </div>
                    </Card>

                    <Card className="border-none bg-white p-8 rounded-[2rem] shadow-xl space-y-6">
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Liabilities</p>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">₦ 0.00</h3>
                        </div>
                        <div className="pt-4 border-t border-slate-50">
                            <p className="text-xs font-bold text-emerald-500">Zero Debt Burden Detected</p>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Loan Portfolio */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Application Portfolio</h4>
                    <div className="h-px flex-1 bg-slate-100" />
                </div>

                {loans.length === 0 ? (
                    <Card className="flex flex-col items-center justify-center border-4 border-dashed border-slate-100 min-h-[400px] rounded-[3rem] bg-slate-50/50">
                        <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50">
                            <Clock className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="font-black text-xl text-slate-900 tracking-tight">No Active Assets</h3>
                        <p className="text-sm text-slate-400 font-medium mb-8">You haven't initiated any credit requests.</p>
                        <Button variant="outline" className="rounded-full h-11 px-8 border-slate-200 font-bold text-slate-600 hover:bg-white" onClick={() => setIsDialogOpen(true)}>
                            Initialize First Request
                        </Button>
                    </Card>
                ) : (
                    <div className="grid gap-6">
                        {loans.map((loan) => (
                            <Card key={loan.id} className="border-none shadow-xl rounded-[2rem] overflow-hidden group hover:shadow-2xl transition-all duration-300">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-50">
                                        <div className="p-8 md:w-1/3 flex items-center gap-6">
                                            <div className={cn(
                                                "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0",
                                                loan.status === 'approved' ? "bg-emerald-50 text-emerald-500" :
                                                    loan.status === 'rejected' ? "bg-red-50 text-red-500" : "bg-blue-50 text-blue-500"
                                            )}>
                                                {loan.status === 'approved' ? <CheckCircle className="h-7 w-7" /> :
                                                    loan.status === 'rejected' ? <XCircle className="h-7 w-7" /> : <Clock className="h-7 w-7 animate-pulse" />}
                                            </div>
                                            <div>
                                                <h5 className="font-black text-slate-900">{loan.type}</h5>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applied: {loan.date}</p>
                                            </div>
                                        </div>

                                        <div className="p-8 md:w-1/3 bg-slate-50/30">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Volume Request</p>
                                            <h4 className="text-2xl font-black text-slate-900 tabular-nums">₦ {loan.amount.toLocaleString()}</h4>
                                        </div>

                                        <div className="p-8 md:w-1/3 flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status Node</p>
                                                <Badge variant="outline" className={cn(
                                                    "capitalize font-bold border-none px-0 text-sm",
                                                    loan.status === 'approved' ? "text-emerald-500" :
                                                        loan.status === 'rejected' ? "text-red-500" : "text-blue-500"
                                                )}>
                                                    • {loan.status}
                                                </Badge>
                                            </div>
                                            <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                                <Info className="h-5 w-5 text-slate-300" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Info Footer */}
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100/50 flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Zap className="h-5 w-5" />
                </div>
                <div>
                    <h6 className="font-bold text-blue-900 text-sm">Turbo-Approval Active</h6>
                    <p className="text-xs text-blue-700/70 font-medium leading-relaxed">
                        Your account is currently prioritized for Turbo-Approval. Credit requests below ₦500k are processed in under 5 minutes using our BVN-integrated risk engine.
                    </p>
                </div>
            </div>
        </div>
    );
}
