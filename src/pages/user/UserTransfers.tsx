import { useEffect, useState } from "react";
import { mockDb, Transaction } from "@/lib/mockDb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Send, RefreshCw, Loader2, User, Building2, Wallet, Plus, Smartphone, Zap } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const BANKS = [
    { name: "Rivers MFB", code: "RIMA" },
    { name: "GTBank", code: "GTB" },
    { name: "Zenith Bank", code: "ZEN" },
    { name: "First Bank", code: "FBN" },
    { name: "Access Bank", code: "ACC" },
    { name: "United Bank for Africa", code: "UBA" },
];

export default function UserTransfers() {
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [bank, setBank] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const userData = mockDb.getUser();
        setBalance(userData.balance);
        setRecentTransactions(userData.transactions.slice(0, 8));
    };

    const handleTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || !recipient || !bank) {
            toast.error("Protocol incomplete: Missing routing data.");
            return;
        }

        const transferAmount = parseFloat(amount);
        if (isNaN(transferAmount) || transferAmount <= 0) {
            toast.error("Invalid currency unit detected.");
            return;
        }

        if (transferAmount > balance) {
            toast.error("Insufficient liquidity for this operation.");
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            mockDb.performTransfer(transferAmount, `${recipient} (${bank})`, note);
            toast.success(`Assets successfully moved: ₦${transferAmount.toLocaleString()} to ${recipient}`);

            setStep(3); // Show Success State
            setTimeout(() => {
                setAmount("");
                setRecipient("");
                setNote("");
                loadData();
                setStep(1);
            }, 3000);
        } catch (error) {
            toast.error("System error: Handshake failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 animate-fade-in pb-20">
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Movement of Assets</h2>
                <p className="text-slate-500 font-medium">Coordinate instantaneous intra-bank and inter-bank transfers.</p>
            </div>

            <div className="grid md:grid-cols-12 gap-10">
                {/* Main Action Area */}
                <div className="md:col-span-12 lg:col-span-8">
                    <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                        <div className="h-2 bg-primary w-full opacity-50" />
                        <CardHeader className="px-10 py-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="text-xl font-bold">Transfer Node</CardTitle>
                                    <CardDescription>Configure your transaction parameters.</CardDescription>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hidden sm:block">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Liquidity</p>
                                    <p className="text-lg font-black text-primary tabular-nums">₦ {balance.toLocaleString()}</p>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="px-10 pb-12">
                            {step === 1 && (
                                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Destination Bank</Label>
                                            <Select onValueChange={setBank} value={bank}>
                                                <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none shadow-inner px-6 text-sm font-bold active:scale-[0.98] transition-all">
                                                    <SelectValue placeholder="Identify Bank" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                                                    {BANKS.map((b) => (
                                                        <SelectItem key={b.code} value={b.name} className="py-3 font-bold text-xs">{b.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Target Account</Label>
                                            <div className="relative">
                                                <Input
                                                    placeholder="10-digit ID"
                                                    value={recipient}
                                                    onChange={(e) => setRecipient(e.target.value)}
                                                    maxLength={10}
                                                    className="h-14 rounded-2xl bg-slate-50 border-none shadow-inner px-6 text-sm font-bold focus-visible:ring-primary/20"
                                                />
                                                <Building2 className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Asset Volume (₦)</Label>
                                        <div className="relative">
                                            <Input
                                                type="number"
                                                placeholder="0.00"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="h-20 text-4xl font-black rounded-[1.5rem] bg-slate-50 border-none shadow-inner px-8 text-primary focus-visible:ring-primary/20 tabular-nums"
                                            />
                                            <span className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs uppercase tracking-widest">Naira Units</span>
                                        </div>
                                    </div>

                                    <Button className="w-full h-16 rounded-2xl bg-[#0a0f1c] text-white hover:bg-slate-900 shadow-xl font-bold tracking-tight text-lg group transition-all" type="submit">
                                        Verify Transaction Matrix
                                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                    </Button>
                                </form>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 animate-in fade-in zoom-in duration-300">
                                    <div className="p-8 rounded-[2rem] bg-[#0a0f1c] text-white space-y-8 shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                        <div className="text-center space-y-2 relative z-10">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confirming Asset Move</p>
                                            <h3 className="text-4xl font-black tracking-tighter">₦ {parseFloat(amount).toLocaleString()}</h3>
                                        </div>
                                        <div className="space-y-4 pt-6 border-t border-white/10 relative z-10">
                                            <div className="flex justify-between py-1">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase">Beneficiary</span>
                                                <span className="text-sm font-bold">{recipient} ({bank})</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase">Fee Protocol</span>
                                                <span className="text-sm font-bold text-emerald-400">₦ 0.00 (Free)</span>
                                            </div>
                                            <div className="pt-4">
                                                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Optional Narration</Label>
                                                <Input
                                                    placeholder="Reason for transfer"
                                                    value={note}
                                                    onChange={(e) => setNote(e.target.value)}
                                                    className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:ring-primary/40"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button variant="outline" className="h-14 rounded-2xl flex-1 font-bold text-slate-500 border-slate-200" onClick={() => setStep(1)} disabled={loading}>
                                            Recalibrate
                                        </Button>
                                        <Button className="h-14 rounded-2xl flex-[2] bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-bold text-lg" onClick={handleTransfer} disabled={loading}>
                                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Initiate Protocol"}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500">
                                    <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mb-8 border-4 border-emerald-50 shadow-xl shadow-emerald-500/10">
                                        <Zap className="h-12 w-12 text-emerald-500 fill-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Protocol Authorized</h3>
                                    <p className="text-slate-500 font-medium max-w-xs">
                                        Asset movement successful. The destination node has been updated.
                                    </p>
                                    <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-100 w-full animate-pulse">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Acknowledgement</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Recipients & Intel Sidebar */}
                <div className="md:col-span-12 lg:col-span-4 space-y-8">
                    <div className="bg-white p-8 rounded-[2rem] shadow-xl space-y-6">
                        <div className="flex justify-between items-center">
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Recipients</h4>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full bg-slate-50"><Plus className="h-4 w-4" /></Button>
                        </div>
                        <div className="space-y-4">
                            {recentTransactions.filter(t => t.type === 'debit').length > 0 ? (
                                recentTransactions.filter(t => t.type === 'debit').slice(0, 5).map((t, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer" onClick={() => {
                                        setRecipient(t.description.split('(')[0].trim());
                                        const foundBank = BANKS.find(b => t.description.includes(b.name));
                                        if (foundBank) setBank(foundBank.name);
                                    }}>
                                        <Avatar className="h-12 w-12 rounded-2xl transition-transform group-hover:scale-110">
                                            <AvatarFallback className="bg-slate-50 text-slate-400 font-bold border border-slate-100 uppercase">{t.description.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{t.description.split('(')[0]}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{t.description.includes('(') ? t.description.match(/\(([^)]+)\)/)?.[1] : 'Node ID'}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-xs text-slate-400 italic py-4 font-medium">Clear history. No recent nodes.</p>
                            )}
                        </div>
                    </div>

                    <Card className="border-none bg-[#0a0f1c] text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.1),transparent)]" />
                        <div className="relative z-10 space-y-4">
                            <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                <Zap className="h-6 w-6 text-primary" />
                            </div>
                            <h4 className="font-bold">Institutional Speed</h4>
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                NIBSS-powered settlements ensure your funds arrive in seconds, not hours.
                            </p>
                            <Button variant="link" className="text-primary font-bold text-[10px] uppercase p-0 h-auto tracking-widest" onClick={() => navigate('/dashboard')}>Back to Intel</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
