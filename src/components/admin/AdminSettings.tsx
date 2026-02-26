import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
    Save, AlertTriangle, RefreshCw, Server, ShieldCheck,
    Mail, Users, Settings2, Globe, Lock, Bell, Zap,
    Database, Activity, Cpu, ShieldAlert, Fingerprint
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function AdminSettings() {
    const { user } = useAuth();
    const [maintenanceMode, setMaintenanceMode] = useState(false);

    const handleSave = () => {
        toast.success("System configuration protocol updated: Global parameters synchronized.");
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Global Governance Console</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">System Configuration</h2>
                    <p className="text-slate-500 font-medium text-lg">Orchestrate institutional parameters, fiscal policies, and security logic.</p>
                </div>
                <Button onClick={handleSave} className="h-14 px-10 rounded-2xl bg-[#0a0f1c] text-white font-bold gap-3 shadow-xl shadow-slate-900/20 active:scale-95 transition-all">
                    <Save className="h-4 w-4" /> Synchronize Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-10">
                <TabsList className="bg-slate-100/50 p-2 rounded-[2rem] gap-2 h-auto flex-wrap md:flex-nowrap border border-slate-200/50">
                    <TabsTrigger value="general" className="rounded-2xl px-8 py-4 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary font-black text-[10px] uppercase tracking-widest gap-2">
                        <Settings2 className="h-4 w-4" /> General Protocol
                    </TabsTrigger>
                    <TabsTrigger value="rates" className="rounded-2xl px-8 py-4 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary font-black text-[10px] uppercase tracking-widest gap-2">
                        <Zap className="h-4 w-4" /> Fiscal Rates
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-2xl px-8 py-4 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary font-black text-[10px] uppercase tracking-widest gap-2">
                        <ShieldCheck className="h-4 w-4" /> Security Logic
                    </TabsTrigger>
                    <TabsTrigger value="staff" className="rounded-2xl px-8 py-4 data-[state=active]:bg-white data-[state=active]:shadow-xl data-[state=active]:text-primary font-black text-[10px] uppercase tracking-widest gap-2">
                        <Users className="h-4 w-4" /> Staff Nodes
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[3rem] overflow-hidden group">
                            <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
                                        <Server className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Access Control State</CardTitle>
                                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-400">Application Node Availability</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-10 space-y-8">
                                <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
                                    <div className="space-y-1">
                                        <Label className="text-base font-black text-slate-900">Maintenance Protocol</Label>
                                        <p className="text-xs text-slate-500 font-medium italic">Suspend retail interface access for core synchronization.</p>
                                    </div>
                                    <Switch
                                        checked={maintenanceMode}
                                        onCheckedChange={setMaintenanceMode}
                                        className="data-[state=checked]:bg-red-500"
                                    />
                                </div>
                                {maintenanceMode && (
                                    <div className="bg-red-50 text-red-600 p-6 rounded-3xl text-xs font-bold flex items-start gap-4 border border-red-100 shadow-lg shadow-red-500/5 animate-pulse">
                                        <ShieldAlert className="h-5 w-5 shrink-0" />
                                        <span>CRITICAL: All authentication endpoints will be terminated for standard entities until protocol deactivation.</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
                                    <div className="space-y-1">
                                        <Label className="text-base font-black text-slate-900">Entity Provisioning</Label>
                                        <p className="text-xs text-slate-500 font-medium italic">Permit new retail identities to be inscribed on the ledger.</p>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-emerald-500" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[3rem] overflow-hidden group">
                            <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Institutional Messaging</CardTitle>
                                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Notification Config</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-10 space-y-8">
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Support Command Email</Label>
                                    <Input defaultValue="ops@rima.bank" className="h-16 px-8 rounded-2xl bg-slate-50 border-none font-bold text-slate-900 shadow-sm" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Ledger Alert Sender</Label>
                                    <Input defaultValue="notifications@rima.bank" className="h-16 px-8 rounded-2xl bg-slate-50 border-none font-bold text-slate-900 shadow-sm" />
                                </div>
                            </CardContent>
                            <CardFooter className="px-10 pb-10">
                                <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border-slate-100 hover:bg-slate-50" onClick={handleSave}>Sync Messaging Delta</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="rates" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[4rem] overflow-hidden">
                        <CardHeader className="p-12 border-b border-slate-50 bg-slate-50/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="h-14 w-14 rounded-[2rem] bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                        <RefreshCw className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Institutional Yield Lattice</CardTitle>
                                        <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Interest & Risk Allocation Policies</CardDescription>
                                    </div>
                                </div>
                                <Button className="h-12 px-6 rounded-xl bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-slate-900/10">Propose New Matrix</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/20 hover:bg-slate-50/20 border-none">
                                        <TableHead className="py-10 pl-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Financial Vehicle</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Current Yield (p.a)</TableHead>
                                        <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Protocol Sync</TableHead>
                                        <TableHead className="text-right pr-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Command</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "Retail Liquidity Savings", rate: "4.25%", last: "2 days ago", risk: "Low" },
                                        { name: "T-30 Fixed Deposit", rate: "8.75%", last: "1 week ago", risk: "Medium" },
                                        { name: "SME Credit Facility", rate: "22.00%", last: "1 month ago", risk: "High" },
                                    ].map((product, i) => (
                                        <TableRow key={i} className="hover:bg-slate-50/50 transition-all border-b border-slate-50/50 group cursor-pointer">
                                            <TableCell className="py-10 pl-12 font-black text-slate-900 text-lg group-hover:text-primary transition-colors">{product.name}</TableCell>
                                            <TableCell>
                                                <Badge className="bg-primary/5 text-primary border-none font-black text-base px-4 py-1.5 rounded-full shadow-sm">{product.rate}</Badge>
                                            </TableCell>
                                            <TableCell className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">{product.last}</TableCell>
                                            <TableCell className="text-right pr-12">
                                                <Button variant="ghost" className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all">Modify</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[3rem] overflow-hidden">
                        <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Enforcement Policies</CardTitle>
                                    <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Security Logic Gates</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 space-y-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all">
                                <div className="space-y-1">
                                    <Label className="text-lg font-black text-slate-900">Mandatory Multi-Factor Ops</Label>
                                    <p className="text-sm text-slate-500 font-medium italic">Enforce hardware/biometric verification for all administrative nodes.</p>
                                </div>
                                <div className="flex items-center gap-6">
                                    <Badge className="bg-emerald-500 text-white font-black text-[9px] px-3 py-1 rounded-full shadow-lg shadow-emerald-500/20">MANDATORY</Badge>
                                    <Switch defaultChecked disabled className="data-[state=checked]:bg-emerald-500 cursor-not-allowed opacity-50" />
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all">
                                <div className="space-y-1">
                                    <Label className="text-lg font-black text-slate-900">Session Entropy Timeout</Label>
                                    <p className="text-sm text-slate-500 font-medium italic">Terminate authenticated status after period of inactivity.</p>
                                </div>
                                <Select defaultValue="15">
                                    <SelectTrigger className="w-[200px] h-14 rounded-2xl bg-white border-slate-100 shadow-sm font-black text-xs uppercase tracking-widest">
                                        <SelectValue placeholder="Entropy TTL" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-2xl border-slate-100">
                                        <SelectItem value="15" className="font-bold">15 Cycles (Min)</SelectItem>
                                        <SelectItem value="30" className="font-bold">30 Cycles</SelectItem>
                                        <SelectItem value="60" className="font-bold">60 Cycles (Hr)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="px-10 pb-10">
                            <Button onClick={handleSave} className="w-full h-16 rounded-[2rem] bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all">Inscribe Security Logic</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="staff" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[3rem] overflow-hidden group">
                        <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                                    <Fingerprint className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Active Operation Nodes</CardTitle>
                                    <CardDescription className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Administrative Identities</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="flex items-center justify-between p-8 rounded-[2rem] bg-slate-50/30 border border-slate-100 group/staff hover:bg-white hover:shadow-2xl transition-all">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-16 w-16 border-4 border-white shadow-xl rounded-2xl group-hover/staff:scale-105 transition-transform">
                                        <AvatarFallback className="bg-primary text-white font-black text-sm">AD</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h4 className="text-lg font-black text-slate-900 tracking-tight group-hover/staff:text-primary transition-colors">Master Command Node</h4>
                                        <p className="text-[11px] font-black text-slate-400 font-mono tracking-tighter">{user?.email}</p>
                                    </div>
                                </div>
                                <Badge className="bg-slate-900 text-white font-black text-[9px] px-4 py-1.5 rounded-full shadow-lg shadow-slate-900/10">SUPER_ADMIN</Badge>
                            </div>
                            <Button variant="outline" className="w-full h-16 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] border-slate-100 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm transition-all flex items-center justify-center gap-4 group/btn">
                                <Users className="h-5 w-5 text-slate-400 group-hover/btn:text-white transition-colors" />
                                Provisional Identity Invite
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
