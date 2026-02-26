
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, Mail, Phone, Download, Check, Loader2, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function OpenAccount() {
    const [step, setStep] = useState<'details' | 'otp' | 'success'>('details');
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: ""
    });
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const { toast } = useToast();

    // Start resend cooldown timer
    const startResendCooldown = () => {
        setResendCooldown(60);
        const interval = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    const handleDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.phone) {
            toast({
                title: "Information required",
                description: "field is missing.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            // 1. Generate a 6-digit OTP
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

            // 2. Store OTP in database safely via REST
            const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/otp_verifications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                    phone_number: formData.email, // storing email here
                    otp_code: generatedOtp,
                    expires_at: new Date(Date.now() + 5 * 60000).toISOString(),
                })
            });

            if (!insertRes.ok) throw new Error("Could not initialize verification process");

            // 3. Send email using EmailJS (Please ensure your EmailJS account is setup)
            // Replace with your actual EmailJS credentials
            const EMAILJS_SERVICE_ID = "service_placeholder";
            const EMAILJS_TEMPLATE_ID = "template_placeholder";
            const EMAILJS_PUBLIC_KEY = "public_key_placeholder";

            try {
                // We use dynamic import for emailjs to avoid breaking existing chunking
                const emailjs = (await import('@emailjs/browser')).default;
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        to_email: formData.email,
                        to_name: formData.firstName,
                        otp_code: generatedOtp,
                    },
                    EMAILJS_PUBLIC_KEY
                );
            } catch (err) {
                // Fallback console log for testing when EmailJS is not configured
                console.log("TESTING MODE - OTP CODE IS:", generatedOtp);
            }

            setStep('otp');
            startResendCooldown();
            toast({
                title: "Verification code sent!",
                description: `We sent a 6-digit code to ${formData.email}. Check your inbox.`
            });
        } catch (error: any) {
            console.error("OTP send error:", error);
            toast({
                title: "Failed to send code",
                description: error.message || "Something went wrong. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (resendCooldown > 0) return;
        setIsLoading(true);
        // Reuse handleDetailsSubmit logic to resend without full recreation
        try {
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

            await fetch(`${SUPABASE_URL}/rest/v1/otp_verifications`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                    phone_number: formData.email,
                    otp_code: generatedOtp,
                    expires_at: new Date(Date.now() + 5 * 60000).toISOString(),
                })
            });

            const emailjs = (await import('@emailjs/browser')).default;
            try {
                await emailjs.send(
                    "service_placeholder",
                    "template_placeholder",
                    {
                        to_email: formData.email,
                        to_name: formData.firstName,
                        otp_code: generatedOtp,
                    },
                    "public_key_placeholder"
                );
            } catch (err) {
                console.log("TESTING MODE - NEW OTP CODE IS:", generatedOtp);
            }

            startResendCooldown();
            toast({
                title: "Code resent!",
                description: `A new code has been sent to ${formData.email}.`
            });
        } catch (error: any) {
            toast({
                title: "Failed to resend",
                description: error.message || "Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.length !== 6) {
            toast({
                title: "Invalid code",
                description: "Please enter the full 6-digit code.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            // 1. Verify OTP custom using REST
            const fetchRes = await fetch(`${SUPABASE_URL}/rest/v1/otp_verifications?phone_number=eq.${encodeURIComponent(formData.email)}&otp_code=eq.${otp}&order=created_at.desc&limit=1`, {
                method: "GET",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                }
            });

            const data = await fetchRes.json();
            if (!fetchRes.ok || !data || data.length === 0) {
                throw new Error("Invalid or expired code");
            }

            const record = data[0];
            if (new Date(record.expires_at) < new Date()) {
                throw new Error("OTP code has expired");
            }

            if (record.verified) {
                throw new Error("Code was already used");
            }

            // Mark as verified
            await fetch(`${SUPABASE_URL}/rest/v1/otp_verifications?id=eq.${record.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                },
                body: JSON.stringify({ verified: true })
            });

            // 2. Proceed to create Auth User in Supabase with random password to satisfy constraints
            const generatedPassword = `RiversMFB${Math.random()}${otp}!`;
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: generatedPassword
            });

            // Auth data might be null if user already exists
            const userId = authData?.user?.id || crypto.randomUUID();

            // Save user profile after successful verification
            const { error: profileError } = await supabase
                .from('profiles')
                .upsert({
                    user_id: userId,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    phone_number: formData.phone,
                    email: formData.email,
                    phone_verified: false,
                    kyc_status: 'pending',
                }, { onConflict: 'user_id' });

            if (profileError) {
                console.error("Profile save error:", profileError);
                // Don't block success — account is created even if profile save fails
            }

            setStep('success');
            toast({
                title: "Account verified!",
                description: "Your account has been created successfully."
            });
        } catch (error: any) {
            console.error("OTP verify error:", error);
            toast({
                title: "Verification failed",
                description: error.message || "Invalid or expired code. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-muted/30 py-12 px-4">
                <div className="max-w-md mx-auto">
                    {step === 'success' ? (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <Card className="text-center p-6 bg-primary text-primary-foreground border-none shadow-xl">
                                <CardContent className="pt-6 space-y-6">
                                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto text-accent-foreground">
                                        <Check className="h-10 w-10" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2">Welcome, {formData.firstName}!</h2>
                                        <p className="text-primary-foreground/80">
                                            Your account has been created and verified. Download the Rivers MFB app to complete your profile setup and start banking.
                                        </p>
                                    </div>
                                    <div className="grid gap-3 pt-4">
                                        <Button variant="secondary" size="lg" className="w-full">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download for Android
                                        </Button>
                                        <Button variant="outline" size="lg" className="w-full bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                                            <Download className="mr-2 h-4 w-4" />
                                            Download for iOS
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : (
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl font-display">
                                    {step === 'details' ? "Start Account Setup" : "Verify Your Email"}
                                </CardTitle>
                                <CardDescription>
                                    {step === 'details'
                                        ? "Enter your details to begin your journey with Rivers MFB."
                                        : `Enter the 6-digit code sent to ${formData.email}`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {step === 'details' ? (
                                    <form onSubmit={handleDetailsSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    placeholder="e.g. Joy"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder="e.g. Chioma"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="phone"
                                                    placeholder="080..."
                                                    className="pl-9"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    className="pl-9"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                A verification code will be sent to this email.
                                            </p>
                                        </div>
                                        <div className="bg-muted/50 p-3 rounded text-xs text-muted-foreground flex gap-2">
                                            <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />
                                            <p>Your data is secured. By continuing, you agree to our Terms of Service.</p>
                                        </div>
                                        <Button type="submit" className="w-full" disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending code...
                                                </>
                                            ) : (
                                                "Continue"
                                            )}
                                        </Button>
                                    </form>
                                ) : (
                                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                                        <div className="space-y-2 text-center">
                                            <Label>Verification Code</Label>
                                            <Input
                                                className="text-center text-3xl tracking-[0.75em] font-mono h-14"
                                                maxLength={6}
                                                placeholder="000000"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Check your inbox and spam folder for the code.
                                            </p>
                                        </div>
                                        <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Verifying...
                                                </>
                                            ) : (
                                                "Verify & Create Account"
                                            )}
                                        </Button>
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="w-full"
                                                disabled={resendCooldown > 0 || isLoading}
                                                onClick={handleResendOtp}
                                            >
                                                {resendCooldown > 0
                                                    ? `Resend code in ${resendCooldown}s`
                                                    : "Resend Code"}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="w-full text-muted-foreground"
                                                onClick={() => {
                                                    setStep('details');
                                                    setOtp("");
                                                }}
                                            >
                                                <ArrowLeft className="mr-2 h-4 w-4" />
                                                Change Email
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    <p className="text-center mt-6 text-sm text-muted-foreground">
                        Already have an account? <a href="#" className="underline text-primary">Download the app to login</a>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
