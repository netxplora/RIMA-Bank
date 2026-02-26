import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2, ShieldCheck, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
    email: z.string().email("Enter a valid admin email"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { signIn, user, isAdmin } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (user && isAdmin) {
            navigate("/admin");
        }
    }, [user, isAdmin, navigate]);

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const handleLogin = async (data: LoginFormData) => {
        setIsLoading(true);

        if (!data.email.includes("admin")) {
            setIsLoading(false);
            toast({
                variant: "destructive",
                title: "Access Denied",
                description: "Authenticated staff only.",
            });
            return;
        }

        const { error } = await signIn(data.email, data.password);
        setIsLoading(false);

        if (error) {
            toast({
                variant: "destructive",
                title: "Auth Failed",
                description: "Invalid credentials.",
            });
        } else {
            toast({ title: "Authorized" });
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#020617] selection:bg-primary/30">
            {/* Refined Ambient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px]" />
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-[400px] px-6">
                {/* Minimal Brand Header */}
                <div className="flex flex-col items-center mb-10 animate-fade-in">
                    <Link to="/" className="group flex items-center gap-3 transition-opacity hover:opacity-90">
                        <img src="/rima-logo.png" alt="Rivers MFB" className="h-12 w-auto brightness-110" />
                        <div className="h-8 w-px bg-white/10 mx-1" />
                        <h1 className="font-display text-xl font-bold text-white tracking-tight">Admin</h1>
                    </Link>
                </div>

                <Card className="border-white/5 bg-black/40 backdrop-blur-3xl shadow-2xl rounded-2xl overflow-hidden animate-fade-in-up">
                    <div className="h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
                    <CardHeader className="pt-10 pb-6 text-center">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 border border-white/5">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-display font-medium text-white">System Access</CardTitle>
                        <p className="text-gray-500 text-sm mt-1">Please authenticate to continue</p>
                    </CardHeader>

                    <CardContent className="pb-10">
                        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="admin-email" className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Admin ID</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                                    <Input
                                        id="admin-email"
                                        type="email"
                                        placeholder="admin@riversmfb.com"
                                        className="pl-12 h-12 bg-white/[0.03] border-white/10 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-lg"
                                        {...loginForm.register("email")}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="admin-password" title="Secure Password" className="text-xs font-semibold text-gray-400 uppercase tracking-widest pl-1">Keyphrase</Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                                    <Input
                                        id="admin-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pl-12 pr-12 h-12 bg-white/[0.03] border-white/10 text-white placeholder:text-gray-700 focus:border-primary/50 focus:ring-primary/20 transition-all rounded-lg"
                                        {...loginForm.register("password")}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {loginForm.formState.errors.password && (
                                    <p className="text-[10px] text-red-500/80 font-medium pl-1">{loginForm.formState.errors.password.message}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full h-12 text-sm font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/10 transition-all active:scale-[0.99] rounded-lg mt-2" disabled={isLoading}>
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 text-center">
                        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-primary shadow-[0_0_5px_rgba(var(--primary),0.5)]" />
                            Secure Terminal Protocol v2.4
                        </span>
                    </div>
                </Card>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-[10px] text-gray-500 hover:text-primary transition-all flex items-center justify-center gap-2 group font-bold tracking-widest uppercase">
                        <ChevronLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                        Public Access
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none opacity-40">
                <p className="text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">
                    Rivers Microfinance Bank
                </p>
            </div>
        </div>
    );
}
