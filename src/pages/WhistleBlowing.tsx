
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, FileText, Send, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function WhistleBlowing() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Report submitted securely. Thank you.");
            // Reset form would go here
        }, 2000);
    };

    return (
        <Layout>
            <section className="bg-slate-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-red-500/20 rounded-full mb-4">
                        <ShieldCheck className="h-8 w-8 text-red-500" />
                    </div>
                    <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        Whistle Blowing Channel
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Report unethical conduct, fraud, or violations securely and confidentially.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">

                        {/* Info Sidebar */}
                        <div className="md:col-span-1 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">What to Report</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm text-muted-foreground">
                                    <ul className="list-disc pl-4 space-y-2">
                                        <li>Fraud & Financial Misconduct</li>
                                        <li>Insider Abuse</li>
                                        <li>Bribery & Corruption</li>
                                        <li>Harassment & Discrimination</li>
                                        <li>Policy Violations</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="bg-blue-50 border-blue-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-blue-800 text-lg">
                                        <Lock className="h-5 w-5" />
                                        Your Protection
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-blue-700">
                                    Your identity is protected. All reports are handled with strict confidentiality by our compliance team. You may choose to remain anonymous.
                                </CardContent>
                            </Card>
                        </div>

                        {/* Reporting Form */}
                        <div className="md:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Submit a Report</CardTitle>
                                    <CardDescription>
                                        Please provide as much detail as possible to help us investigate.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Name (Optional)</Label>
                                                <Input placeholder="Leave blank for anonymous" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Email (Optional)</Label>
                                                <Input placeholder="For follow-up" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Category</Label>
                                            <Select required>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="fraud">Fraud / Theft</SelectItem>
                                                    <SelectItem value="ethics">Unethical Behavior</SelectItem>
                                                    <SelectItem value="harassment">Harassment</SelectItem>
                                                    <SelectItem value="compliance">Regulatory Compliance</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Description of Incident</Label>
                                            <Textarea
                                                className="h-32"
                                                placeholder="Please describe what happened, who was involved, when it occurred, and where."
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Evidence (Optional)</Label>
                                            <div className="border border-dashed rounded-lg p-6 text-center text-sm text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer">
                                                <div className="flex justify-center mb-2">
                                                    <FileText className="h-8 w-8 text-muted-foreground/50" />
                                                </div>
                                                <p>Click to upload documents or images</p>
                                            </div>
                                        </div>

                                        <div className="bg-muted p-4 rounded-lg text-xs text-muted-foreground">
                                            <p className="flex items-start gap-2">
                                                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                                <span>
                                                    By submitting this report, you declare that the information provided is true to the best of your knowledge.
                                                    False reporting with malicious intent may result in disciplinary action (if you are an employee) or legal consequences.
                                                </span>
                                            </p>
                                        </div>

                                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                                            {isSubmitting ? "Submitting..." : (
                                                <>
                                                    Submit Secure Report
                                                    <Send className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
