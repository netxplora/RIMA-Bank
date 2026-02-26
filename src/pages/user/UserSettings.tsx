import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Bell, Lock, User, Shield, Moon, Smartphone, Fingerprint, Key, Globe, LogOut, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserSettings() {
    const handleSave = () => {
        toast.success("Profile updated successfully.");
    };

    return (
        <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
            {/* Profile Header */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-none relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-slate-50 shadow-2xl rounded-[2rem]">
                            <AvatarFallback className="bg-[#0a0f1c] text-white text-4xl font-black">DU</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                            <Shield className="h-4 w-4" />
                        </div>
                    </div>
                    <div className="text-center md:text-left space-y-2">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Customer Profile</h2>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <Badge className="bg-slate-100 text-slate-500 border-none font-bold py-1">ID: RIMA-8829-X</Badge>
                            <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                Account Verified
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue="security" className="space-y-10">
                <div className="flex justify-center">
                    <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl h-14 border border-slate-100 shadow-inner">
                        <TabsTrigger value="profile" className="rounded-xl px-8 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-lg">Profile Details</TabsTrigger>
                        <TabsTrigger value="security" className="rounded-xl px-8 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-lg">Security & Password</TabsTrigger>
                        <TabsTrigger value="notifications" className="rounded-xl px-8 font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:shadow-lg">Notifications</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="profile" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                        <CardHeader className="px-10 pt-10 pb-4">
                            <CardTitle className="text-xl font-bold">Personal Information</CardTitle>
                            <CardDescription className="font-medium text-slate-400">Manage your primary account identification data.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 pb-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legal Name</Label>
                                    <Input defaultValue="Demo User" className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                                    <Input defaultValue="user@rima.com" disabled className="h-12 rounded-xl bg-slate-100 border-none px-4 font-bold text-slate-400" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</Label>
                                    <Input defaultValue="+234 800 123 4567" className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</Label>
                                    <Input defaultValue="Port Harcourt, Nigeria" className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold" />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button className="rounded-xl bg-[#0a0f1c] hover:bg-slate-900 h-12 px-10 font-bold" onClick={handleSave}>Update Profile</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid md:grid-cols-2 gap-10">
                        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                            <CardHeader className="p-10 pb-4">
                                <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                                    <Fingerprint className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl font-bold">Password & Access</CardTitle>
                                <CardDescription className="font-medium text-slate-400">Manage your account login credentials.</CardDescription>
                            </CardHeader>
                            <CardContent className="px-10 pb-10 space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Password</Label>
                                    <Input type="password" placeholder="••••••••" className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">New Password</Label>
                                    <Input type="password" placeholder="Min 12 Chars" className="h-12 rounded-xl bg-slate-50 border-none px-4 font-bold" />
                                </div>
                                <Button className="w-full h-12 rounded-xl bg-[#0a0f1c] font-bold" onClick={handleSave}>Change Password</Button>
                            </CardContent>
                        </Card>

                        <div className="space-y-10">
                            <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-[#0a0f1c] text-white">
                                <CardHeader className="p-8">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="text-lg font-bold">Security Status</CardTitle>
                                        <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase">Active</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold">Biometric Login</p>
                                            <p className="text-[10px] font-medium text-slate-500">Require face/touch ID on mobile devices</p>
                                        </div>
                                        <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold">2-Factor Authentication</p>
                                            <p className="text-[10px] font-medium text-slate-500">Verify login via secondary channel</p>
                                        </div>
                                        <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-6">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Sessions</p>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                                                <Smartphone className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">iPhone 15 Pro Max</p>
                                                <p className="text-[9px] font-bold text-slate-400">Current Session • Lagos, NG</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-primary transition-colors" />
                                    </div>
                                    <div className="flex items-center justify-between group cursor-pointer opacity-50">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                                                <Globe className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-900">MacBook Pro (M3)</p>
                                                <p className="text-[9px] font-bold text-slate-400">Last active • 2 days ago</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-primary transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
                        <CardHeader className="p-10 pb-4">
                            <CardTitle className="text-xl font-bold">Notifications</CardTitle>
                            <CardDescription className="font-medium text-slate-400">Choose how you want to receive account alerts.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 pb-10 space-y-10">
                            {[
                                { title: "Transaction Alerts", desc: "Notify for all outgoing and incoming payments", icon: Zap },
                                { title: "Security Alerts", desc: "Alerts for new device logins and password changes", icon: Smartphone },
                                { title: "Promotions & News", desc: "Updates on new products and bank announcements", icon: Key },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-6">
                                        <div className="h-14 w-14 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-400">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900">{item.title}</p>
                                            <p className="text-xs font-medium text-slate-400">{item.desc}</p>
                                        </div>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-primary" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="flex justify-center pt-10">
                <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl h-12 px-10">
                    Terminate All Sessions <LogOut className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}

// Helper Badge component since it might not be imported or exist exactly like this
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold border", className)}>
            {children}
        </span>
    );
}
