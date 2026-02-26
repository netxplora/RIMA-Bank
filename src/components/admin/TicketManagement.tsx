
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    MessageSquare,
    Clock,
    User,
    MoreVertical,
    Send,
    Search,
    AlertCircle,
    Loader2,
    RefreshCw,
    CheckCircle2,
    Inbox
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string;
    message: string;
    status: string;
    priority: string;
    admin_reply: string | null;
    replied_at: string | null;
    created_at: string;
    updated_at: string;
}

// Helper to make authenticated Supabase REST calls
async function supabaseRest(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('sb-' + SUPABASE_URL.replace('https://', '').split('.')[0] + '-auth-token');
    let accessToken = SUPABASE_KEY;

    if (token) {
        try {
            const parsed = JSON.parse(token);
            accessToken = parsed.access_token || SUPABASE_KEY;
        } catch { }
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${accessToken}`,
            ...options.headers,
        },
    });

    return response;
}

export default function TicketManagement() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState("");
    const [replying, setReplying] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("all");
    const { toast } = useToast();

    // Fetch messages from Supabase
    const fetchMessages = async () => {
        setLoading(true);
        try {
            const response = await supabaseRest('contact_messages?order=created_at.desc');

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || `Failed to fetch: ${response.status}`);
            }

            const data: ContactMessage[] = await response.json();
            setMessages(data || []);

            // Auto-select first message if none selected
            if (!selectedMessage && data && data.length > 0) {
                setSelectedMessage(data[0]);
            }
        } catch (error: any) {
            console.error("Failed to fetch messages:", error);
            toast({
                title: "Failed to load messages",
                description: error.message || "Could not load contact messages.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    // Reply to a message
    const handleReply = async () => {
        if (!selectedMessage || !replyText.trim()) return;
        setReplying(true);

        try {
            const response = await supabaseRest(`contact_messages?id=eq.${selectedMessage.id}`, {
                method: 'PATCH',
                headers: { 'Prefer': 'return=minimal' },
                body: JSON.stringify({
                    admin_reply: replyText,
                    status: 'pending',
                    replied_at: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Failed to save reply');
            }

            toast({
                title: "Reply saved!",
                description: `Response saved for ${selectedMessage.name}'s inquiry.`,
            });

            setReplyText("");
            setSelectedMessage(prev => prev ? {
                ...prev,
                admin_reply: replyText,
                status: 'pending',
                replied_at: new Date().toISOString(),
            } : null);
            await fetchMessages();
        } catch (error: any) {
            toast({
                title: "Reply failed",
                description: error.message || "Could not save reply.",
                variant: "destructive"
            });
        } finally {
            setReplying(false);
        }
    };

    // Close a ticket
    const handleCloseTicket = async () => {
        if (!selectedMessage) return;

        try {
            const response = await supabaseRest(`contact_messages?id=eq.${selectedMessage.id}`, {
                method: 'PATCH',
                headers: { 'Prefer': 'return=minimal' },
                body: JSON.stringify({ status: 'closed' }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Failed to close ticket');
            }

            toast({
                title: "Ticket closed",
                description: `Ticket from ${selectedMessage.name} has been closed.`,
            });

            setSelectedMessage(prev => prev ? { ...prev, status: 'closed' } : null);
            await fetchMessages();
        } catch (error: any) {
            toast({
                title: "Failed to close ticket",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    // Change priority
    const handleChangePriority = async (priority: string) => {
        if (!selectedMessage) return;

        try {
            const response = await supabaseRest(`contact_messages?id=eq.${selectedMessage.id}`, {
                method: 'PATCH',
                headers: { 'Prefer': 'return=minimal' },
                body: JSON.stringify({ priority }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message || 'Failed to update priority');
            }

            toast({ title: `Priority set to ${priority}` });
            setSelectedMessage(prev => prev ? { ...prev, priority } : null);
            await fetchMessages();
        } catch (error: any) {
            toast({
                title: "Failed to update",
                description: error.message,
                variant: "destructive"
            });
        }
    };

    // Filter and search messages
    const filteredMessages = messages.filter(m => {
        const matchesSearch = searchQuery === "" ||
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === "all" || m.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-NG', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const statusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-orange-50 text-orange-700 border-orange-200';
            case 'pending': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'closed': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-slate-50 text-slate-600 border-slate-200';
        }
    };

    const priorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'destructive' as const;
            case 'medium': return 'secondary' as const;
            case 'low': return 'outline' as const;
            default: return 'secondary' as const;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Support Center</h2>
                    <p className="text-muted-foreground">Manage customer inquiries and contact form submissions.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 h-6 px-3">
                        {messages.filter(t => t.status === 'open').length} Open
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 h-6 px-3">
                        {messages.filter(t => t.status === 'pending').length} Pending
                    </Badge>
                    <Button variant="outline" size="sm" onClick={fetchMessages} disabled={loading}>
                        <RefreshCw className={cn("h-4 w-4 mr-2", loading && "animate-spin")} />
                        Refresh
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6 h-[650px]">
                {/* Messages List */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search messages..."
                            className="pl-9 h-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex gap-1 bg-muted/50 p-1 rounded-lg">
                        {['all', 'open', 'pending', 'closed'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={cn(
                                    "flex-1 text-[10px] font-bold uppercase tracking-wider py-1.5 rounded-md transition-all",
                                    filterStatus === status
                                        ? "bg-white shadow-sm text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                            </div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                <Inbox className="h-8 w-8 mb-2 opacity-50" />
                                <p className="text-sm">No messages found</p>
                            </div>
                        ) : (
                            filteredMessages.map((m) => (
                                <div
                                    key={m.id}
                                    onClick={() => setSelectedMessage(m)}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all cursor-pointer",
                                        selectedMessage?.id === m.id
                                            ? 'bg-primary/5 border-primary ring-1 ring-primary/20'
                                            : 'bg-white hover:bg-muted/50'
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0 uppercase", statusColor(m.status))}>
                                            {m.status}
                                        </Badge>
                                        <Badge
                                            variant={priorityColor(m.priority)}
                                            className="text-[9px] px-1.5 py-0 uppercase"
                                        >
                                            {m.priority}
                                        </Badge>
                                    </div>
                                    <h4 className="font-semibold text-sm truncate mb-1">{m.subject}</h4>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <User className="h-3 w-3" />
                                        <span className="truncate">{m.name}</span>
                                        <span>•</span>
                                        <span className="shrink-0">{new Date(m.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Message Detail View */}
                <Card className="lg:col-span-8 flex flex-col shadow-sm border-white/10 overflow-hidden bg-slate-50/50">
                    {selectedMessage ? (
                        <>
                            <CardHeader className="bg-white border-b px-6 py-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-orange-100">
                                            <MessageSquare className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{selectedMessage.subject}</CardTitle>
                                            <CardDescription className="text-[11px] flex items-center gap-1.5">
                                                From: {selectedMessage.name} ({selectedMessage.email})
                                                {selectedMessage.phone && (
                                                    <><span className="text-slate-300">|</span> {selectedMessage.phone}</>
                                                )}
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={selectedMessage.priority}
                                            onChange={(e) => handleChangePriority(e.target.value)}
                                            className="text-xs border rounded-md px-2 py-1 bg-white"
                                        >
                                            <option value="low">Low Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="high">High Priority</option>
                                        </select>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                                {/* Customer's original message */}
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="h-8 w-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                        {selectedMessage.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="p-4 rounded-2xl bg-white border shadow-sm text-sm">
                                            <p className="leading-relaxed">{selectedMessage.message}</p>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground mt-1 block px-1">
                                            {formatDate(selectedMessage.created_at)}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact info card */}
                                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-start gap-3 text-blue-800 text-xs">
                                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold mb-1">Contact Details</p>
                                        <p>Email: {selectedMessage.email}</p>
                                        {selectedMessage.phone && <p>Phone: {selectedMessage.phone}</p>}
                                    </div>
                                </div>

                                {/* Admin reply if exists */}
                                {selectedMessage.admin_reply && (
                                    <div className="flex flex-row-reverse gap-3 max-w-[85%] ml-auto">
                                        <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">
                                            S
                                        </div>
                                        <div>
                                            <div className="p-4 rounded-2xl bg-primary text-primary-foreground shadow-sm text-sm">
                                                <p className="leading-relaxed">{selectedMessage.admin_reply}</p>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground mt-1 block text-right px-1">
                                                {selectedMessage.replied_at ? formatDate(selectedMessage.replied_at) : ""}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {selectedMessage.status === 'closed' && (
                                    <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-3 text-green-800 text-xs">
                                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                                        <p className="font-medium">This ticket has been closed.</p>
                                    </div>
                                )}
                            </CardContent>

                            {selectedMessage.status !== 'closed' && (
                                <div className="p-4 bg-white border-t">
                                    <div className="relative">
                                        <Textarea
                                            placeholder="Type your response to this inquiry..."
                                            className="min-h-[100px] pr-4 bg-slate-50 border-slate-200 focus-visible:ring-primary/20 resize-none"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                        />
                                        <div className="flex justify-end gap-2 mt-3">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-8 text-xs font-semibold"
                                                onClick={handleCloseTicket}
                                            >
                                                Close Ticket
                                            </Button>
                                            <Button
                                                size="sm"
                                                className="h-8 px-4 font-semibold"
                                                disabled={replying || !replyText.trim()}
                                                onClick={handleReply}
                                            >
                                                {replying ? (
                                                    <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                                                ) : (
                                                    <Send className="h-3.5 w-3.5 mr-2" />
                                                )}
                                                Reply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                            <Inbox className="h-12 w-12 mb-4 opacity-30" />
                            <p className="text-lg font-medium">No message selected</p>
                            <p className="text-sm">Select a message from the list to view details.</p>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
