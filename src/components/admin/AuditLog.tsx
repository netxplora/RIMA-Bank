import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Key, FileText, Download, Search, Filter, ShieldAlert, Cpu, Terminal, History, Database, Fingerprint } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MOCK_LOGS = [
    { id: 1, action: "SYS_KERNEL_INIT", user: "BOOT_PROTOCOL", date: "2024-01-24 10:45:22", ip: "::1", status: "success", severity: "info", details: "Core banking modules loaded" },
    { id: 2, action: "PRIVILEGE_ESCALATION", user: "super_admin@rima.ai", date: "2024-01-24 10:30:15", ip: "192.168.1.55", status: "success", severity: "warning", details: "Assigned role: super_admin to self" },
    { id: 3, action: "LOAN_FUND_DISBURSE", user: "loan_officer_01", date: "2024-01-24 09:12:00", ip: "192.168.1.42", status: "success", severity: "high", details: "₦ 1.5M disbursed to SME-902" },
    { id: 4, action: "AUTH_FAILURE", user: "root", date: "2024-01-24 08:05:33", ip: "45.22.19.112", status: "failure", severity: "critical", details: "Repeated SSH handshake failures" },
    { id: 5, action: "DB_SCHEMA_MODIFY", user: "dev_ops_hub", date: "2024-01-23 16:20:44", ip: "10.0.0.4", status: "success", severity: "warning", details: "Alter table: transactions (Added metadata)" },
    { id: 6, action: "KYC_DATA_VIEW", user: "compliance_team", date: "2024-01-23 14:10:12", ip: "192.168.1.12", status: "success", severity: "info", details: "Accessed PII for USR-1002" },
];

export default function AuditLog() {
    const [search, setSearch] = useState("");

    const getSeverityStyles = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'high': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'warning': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-fade-in pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Forensic Chain of Custody</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Security Audit Ledger</h2>
                    <p className="text-slate-500 font-medium text-lg">Immutable event reconciliation and subsystem oversight.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-bold text-slate-600 gap-3 bg-white shadow-xl shadow-slate-200/10 hover:shadow-2xl transition-all">
                        <Download className="h-4 w-4" /> Export Syslog
                    </Button>
                    <Button className="h-14 px-8 rounded-2xl bg-[#0a0f1c] text-white font-bold gap-3 shadow-xl shadow-slate-900/20">
                        <History className="h-4 w-4" /> Snapshot History
                    </Button>
                </div>
            </div>

            {/* Security Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="border-none shadow-2xl bg-slate-900 text-white p-10 rounded-[3rem] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/20 transition-all" />
                    <div className="relative z-10 space-y-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tactical State</span>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                <ShieldAlert className="h-6 w-6 text-emerald-400" />
                            </div>
                            <span className="text-2xl font-black tracking-tight">NOMINAL</span>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl bg-white p-10 rounded-[3rem] relative overflow-hidden group border border-slate-50">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 space-y-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Failed Access (24h)</span>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center">
                                <Fingerprint className="h-6 w-6 text-red-500" />
                            </div>
                            <span className="text-2xl font-black text-red-600 tracking-tight">12 Blocks</span>
                        </div>
                    </div>
                </Card>

                <Card className="border-none shadow-2xl bg-white p-10 rounded-[3rem] md:col-span-2 border border-slate-50">
                    <div className="flex flex-col h-full justify-between gap-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Kernel Performance Matrix</span>
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Stable Sync</span>
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="space-y-4 flex-1 pr-12">
                                <div className="flex justify-between items-end">
                                    <span className="text-3xl font-black text-slate-900 tracking-tighter">CPU 24%</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Balanced Load</span>
                                </div>
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden p-0.5">
                                    <div className="h-full bg-emerald-500 rounded-full w-[24%]" />
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-2xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                <Cpu className="h-6 w-6 text-indigo-500" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Forensic Table Container */}
            <Card className="border-none shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] bg-white rounded-[4rem] overflow-hidden">
                <CardHeader className="p-10 border-b border-slate-50 bg-slate-50/50 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-6 flex-1 max-w-2xl">
                            <div className="relative flex-1 group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <Input
                                    placeholder="Filter by Session ID, Operator or Event Path..."
                                    className="pl-16 h-16 bg-white border-slate-100 rounded-3xl shadow-sm text-base focus:ring-4 focus:ring-primary/5 transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" className="h-16 w-16 p-0 rounded-3xl border-slate-100 bg-white hover:bg-slate-50 shrink-0 shadow-sm transition-all active:scale-95">
                                <Filter className="h-5 w-5 text-slate-500" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                            <Button variant="ghost" className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest bg-slate-900 text-white hover:bg-slate-800 hover:text-white shadow-xl shadow-slate-900/10">All Events</Button>
                            <Button variant="ghost" className="h-12 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50">Security Only</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/30 hover:bg-slate-50/30 border-none">
                                <TableHead className="w-[200px] text-[10px] font-black uppercase tracking-[0.2em] py-8 pl-12 text-slate-500">Record Timestamp</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Event Descriptor</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Magnitude</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Authorized Operator</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Metadata Path</TableHead>
                                <TableHead className="text-right pr-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_LOGS.map((log) => (
                                <TableRow key={log.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50/50 group">
                                    <TableCell className="font-mono text-[11px] py-10 pl-12 text-slate-400">
                                        {log.date}
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1.5">
                                            <div className="font-black text-slate-900 text-sm tracking-tight flex items-center gap-2">
                                                <Terminal className="h-3.5 w-3.5 text-slate-300" />
                                                {log.action}
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-medium px-5 border-l-2 border-slate-100 italic">{log.details}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge className={cn("text-[9px] font-black uppercase px-4 py-1.5 rounded-full border-none shadow-sm", getSeverityStyles(log.severity))}>
                                            {log.severity}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                                <History className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <span className="text-xs font-black text-slate-700 tracking-tight">{log.user}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-mono text-[11px] text-slate-400">
                                        {log.ip}
                                    </TableCell>
                                    <TableCell className="text-right pr-12">
                                        <Badge className={cn(
                                            "text-[10px] font-black uppercase px-4 py-1.5 rounded-xl border-none",
                                            log.status === 'success' ? 'bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-500/10' : 'bg-red-50 text-red-700 shadow-sm shadow-red-500/10'
                                        )}>
                                            {log.status === 'success' ? 'VERIFIED' : 'DROPPED'}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
