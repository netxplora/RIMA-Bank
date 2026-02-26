import { useEffect, useState } from "react";
import { mockDb, Card as CardType } from "@/lib/mockDb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Lock, Unlock, Plus, Eye, Settings2, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function UserCards() {
    const [cards, setCards] = useState<CardType[]>([]);

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = () => {
        const user = mockDb.getUser();
        setCards(user.cards || []);
    };

    const handleToggleFreeze = (cardId: string) => {
        try {
            mockDb.toggleCardFreeze(cardId);
            loadCards();
            toast.success("Security status updated: Card node reconfigured.");
        } catch (e) {
            toast.error("Handshake failed.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Vault Plastic & Virtual</h2>
                    <p className="text-slate-500 font-medium">Coordinate your physical and cryptographic spending instruments.</p>
                </div>
                <Button className="rounded-full h-11 px-8 bg-[#0a0f1c] text-white hover:bg-slate-900 shadow-xl shadow-slate-200">
                    <Plus className="mr-2 h-4 w-4" />
                    Provision New Card
                </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {cards.map((card) => (
                    <div key={card.id} className="group perspective-1000">
                        <Card className={cn(
                            "border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white transition-all duration-500 hover:translate-y-[-8px]",
                            card.isFrozen && "grayscale-[0.5] opacity-90"
                        )}>
                            {/* Visual Card Representation */}
                            <div className="p-4">
                                <div className={cn(
                                    "h-56 rounded-[1.8rem] p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-700 group-hover:shadow-primary/30",
                                    card.type === 'verve' ? 'bg-gradient-to-br from-[#1e293b] to-[#0f172a]' :
                                        card.type === 'mastercard' ? 'bg-gradient-to-br from-orange-500 to-red-600' :
                                            'bg-gradient-to-br from-blue-600 to-indigo-900'
                                )}>
                                    {/* Glassmorphism Overlays */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                                    <div className="flex justify-between items-start relative z-10">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Corporate Vault</p>
                                            <Badge className="bg-white/10 text-white border-white/20 text-[8px] px-2 py-0 uppercase font-black tracking-widest leading-none h-4">
                                                {card.type}
                                            </Badge>
                                        </div>
                                        <div className="h-10 w-14 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 flex items-center justify-center">
                                            <Zap className="h-5 w-5 text-white/80" />
                                        </div>
                                    </div>

                                    <div className="space-y-4 relative z-10">
                                        <div className="font-mono text-xl tracking-[0.3em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                                            {card.number.replace(/(\d{4})/g, '$1 ').trim()}
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[8px] opacity-40 uppercase font-black tracking-widest mb-1">Controller</p>
                                                <p className="font-bold text-xs uppercase tracking-tight">DEMO ACCOUNT</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] opacity-40 uppercase font-black tracking-widest mb-1">Horizon</p>
                                                <p className="font-bold text-xs tabular-nums">{card.expiry}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {card.isFrozen && (
                                        <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center backdrop-blur-md z-20 animate-in fade-in duration-300">
                                            <Lock className="h-12 w-12 text-white/50 mb-2" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">Node Offline</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <CardContent className="px-8 pt-4 pb-6 space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100">
                                    <div className="space-y-0.5">
                                        <Label htmlFor={`freeze-${card.id}`} className="text-xs font-black uppercase tracking-widest text-slate-900">Security Freeze</Label>
                                        <p className="text-[10px] font-medium text-slate-400">Lock all outgoing cryptographic signals</p>
                                    </div>
                                    <Switch
                                        id={`freeze-${card.id}`}
                                        checked={card.isFrozen}
                                        onCheckedChange={() => handleToggleFreeze(card.id)}
                                        className="data-[state=checked]:bg-primary"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="outline" className="rounded-xl h-12 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">
                                        <Eye className="mr-2 h-3.5 w-3.5" /> Reveal PIN
                                    </Button>
                                    <Button variant="outline" className="rounded-xl h-12 border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50">
                                        <Settings2 className="mr-2 h-3.5 w-3.5" /> Controls
                                    </Button>
                                </div>
                            </CardContent>

                            <CardFooter className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto-Pay Active</p>
                                <div className="flex items-center gap-1">
                                    <ShieldCheck className="h-3 w-3 text-emerald-500" />
                                    <span className="text-[10px] font-bold text-emerald-500 uppercase">Secured</span>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                ))}

                {/* Add Card Placeholder */}
                <div
                    className="flex flex-col items-center justify-center p-10 border-4 border-dashed border-slate-100 rounded-[2.5rem] hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer group group"
                >
                    <div className="h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all mb-6">
                        <Plus className="h-8 w-8 text-slate-400 group-hover:text-primary transition-all" />
                    </div>
                    <h3 className="font-black text-lg text-slate-900 tracking-tight">Expand Portfolio</h3>
                    <p className="text-sm text-slate-400 font-medium">Provision virtual or physical nodes.</p>
                </div>
            </div>
        </div>
    );
}
