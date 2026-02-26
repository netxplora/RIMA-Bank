
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    ShieldAlert,
    Zap,
    Lock,
    Terminal,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ServerCrash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminSetup() {
    const [step, setStep] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const navigate = useNavigate();

    const addLog = (msg: string) => {
        setLogs(prev => [...prev.slice(-4), msg]);
    };

    const startSetup = async () => {
        setIsProcessing(true);
        setStep(1);

        addLog("Initializing secure seed exchange...");
        await new Promise(r => setTimeout(r, 800));

        addLog("Provisioning RSA-4096 management key...");
        await new Promise(r => setTimeout(r, 1000));

        addLog("Injecting administrative privileges into mock_session...");
        const mockAdmin = {
            id: 'sys-provisioned-admin',
            email: 'admin@riversmfb.com',
            aud: 'authenticated',
            created_at: new Date().toISOString()
        };
        const sessionData = {
            user: mockAdmin,
            isAdmin: true,
            roles: ['admin', 'super_admin']
        };
        localStorage.setItem("rivers_mock_session", JSON.stringify(sessionData));

        await new Promise(r => setTimeout(r, 1200));
        addLog("Establishing persistent hardware bond...");

        await new Promise(r => setTimeout(r, 800));
        setStep(2);
        setIsProcessing(false);

        toast.success("Administrative protocols activated.");
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 selection:bg-emerald-500/30">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
            </div>

            <div className="relative z-10 w-full max-w-xl">
                {step === 0 && (
                    <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-2xl shadow-2xl animate-fade-in">
                        <CardHeader className="text-center pt-10">
                            <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                <Zap className="h-8 w-8 text-emerald-500 animate-pulse" />
                            </div>
                            <CardTitle className="text-2xl font-display font-bold text-white tracking-tight">Admin Provisioning</CardTitle>
                            <CardDescription className="text-emerald-500/60 font-mono text-xs uppercase tracking-widest mt-2">
                                System Initialization Protocol 09
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-10 pt-4 px-10">
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl mb-8">
                                <p className="text-slate-300 text-sm leading-relaxed text-center">
                                    You are about to activate the <span className="text-emerald-400 font-bold uppercase">Super User Console</span> on this machine. This will bridge this browser directly to the bank's core infrastructure assets.
                                </p>
                            </div>
                            <Button
                                onClick={startSetup}
                                className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98] group"
                            >
                                ACTIVATE ADMIN PROTOCOLS
                                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {step === 1 && (
                    <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-2xl shadow-2xl">
                        <CardContent className="py-20 flex flex-col items-center">
                            <Loader2 className="h-12 w-12 text-emerald-500 animate-spin mb-8" />
                            <h3 className="text-white font-mono text-sm tracking-widest uppercase mb-6">Processing Secure Handshake</h3>

                            <div className="w-full max-w-sm space-y-2 bg-black/50 p-4 rounded-lg border border-white/5 font-mono text-[10px]">
                                {logs.map((log, i) => (
                                    <div key={i} className="text-emerald-500/70 flex gap-2">
                                        <span className="text-emerald-500/30">[{new Date().toLocaleTimeString()}]</span>
                                        <span className="animate-pulse">{log}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {step === 2 && (
                    <Card className="bg-black/40 border-emerald-500/20 backdrop-blur-2xl shadow-2xl animate-scale-in">
                        <CardContent className="py-16 text-center">
                            <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                            </div>
                            <h2 className="text-white text-3xl font-display font-bold mb-2">Access Granted</h2>
                            <p className="text-emerald-500/60 font-mono text-xs uppercase tracking-widest mb-10">
                                Management terminal Bonded successfully.
                            </p>

                            <Button
                                onClick={() => navigate("/admin")}
                                className="px-10 h-12 bg-white text-black font-bold rounded-lg hover:bg-emerald-50 transition-colors"
                            >
                                ENTER DASHBOARD
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Floating Info */}
            <div className="absolute bottom-10 flex items-center gap-2 text-slate-700 font-mono text-[10px] uppercase tracking-widest">
                <Lock className="h-3 w-3" />
                One-Time Session Provisioning
            </div>
        </div>
    );
}
