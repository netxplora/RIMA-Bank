import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Clock, Search, Map as MapIcon, Navigation, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface Branch {
    id: string;
    name: string;
    address: string;
    phone: string | null;
    opening_hours: string | null;
    latitude: number | null;
    longitude: number | null;
    city: string;
    state: string | null;
}

export default function Branches() {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeBranchId, setActiveBranchId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchBranches = async () => {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/branches?is_active=eq.true&order=name.asc`, {
                headers: {
                    'apikey': SUPABASE_KEY,
                    'Authorization': `Bearer ${SUPABASE_KEY}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBranches(data);
                // Set head office as default if found
                const headOffice = data.find((b: any) => b.is_headquarters);
                if (headOffice) setActiveBranchId(headOffice.id);
            }
        } catch (error) {
            console.error("Error fetching branches:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const activeBranch = branches.find(b => b.id === activeBranchId);

    const filteredBranches = branches.filter(b =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleViewOnMap = (branchId: string) => {
        setActiveBranchId(branchId);
        // Scroll map into view on mobile
        const mapElement = document.getElementById('map-container');
        if (mapElement && window.innerWidth < 768) {
            mapElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <section className="bg-gradient-hero text-primary-foreground py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
                        Locate a Branch
                    </h1>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                        Find the nearest Rivers Microfinance Bank branch to you.
                    </p>
                </div>
            </section>

            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col-reverse lg:flex-row gap-8 min-h-[600px]">

                        {/* Branch List Side */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search branches..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2">
                                {loading ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                                        <Loader2 className="h-8 w-8 animate-spin mb-4" />
                                        <p>Loading branches...</p>
                                    </div>
                                ) : filteredBranches.length === 0 ? (
                                    <div className="text-center py-20 text-muted-foreground">
                                        No branches found matching your search.
                                    </div>
                                ) : (
                                    filteredBranches.map(branch => (
                                        <Card
                                            key={branch.id}
                                            className={cn(
                                                "cursor-pointer transition-all duration-200 border-l-4",
                                                activeBranchId === branch.id
                                                    ? "border-l-primary shadow-md ring-1 ring-primary/20"
                                                    : "border-l-transparent hover:border-l-muted-foreground/30 hover:shadow-sm"
                                            )}
                                            onClick={() => handleViewOnMap(branch.id)}
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className={cn("font-bold text-lg", activeBranchId === branch.id && "text-primary")}>
                                                        {branch.name}
                                                    </h3>
                                                    {activeBranchId === branch.id && (
                                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">Selected</span>
                                                    )}
                                                </div>

                                                <div className="space-y-2 text-sm text-muted-foreground">
                                                    <div className="flex items-start gap-2">
                                                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                                                        <span>{branch.address}, {branch.city}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 shrink-0" />
                                                        <span>{branch.phone || "N/A"}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4 shrink-0" />
                                                        <span>{branch.opening_hours || "Mon - Fri: 8am - 4pm"}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex gap-3">
                                                    <Button
                                                        size="sm"
                                                        variant={activeBranchId === branch.id ? "secondary" : "outline"}
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleViewOnMap(branch.id);
                                                        }}
                                                    >
                                                        <MapIcon className="mr-2 h-4 w-4" />
                                                        View on Map
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="flex-1" asChild>
                                                        <a
                                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address + ", " + branch.city)}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Navigation className="mr-2 h-4 w-4" />
                                                            Directions
                                                        </a>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Map Side */}
                        <div id="map-container" className="w-full lg:w-1/2">
                            <div className="sticky top-24">
                                <Card className="overflow-hidden h-[400px] lg:h-[600px] border-2 shadow-inner bg-muted/20 relative">
                                    {activeBranch && activeBranch.latitude && activeBranch.longitude ? (
                                        <div className="w-full h-full">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                style={{ border: 0 }}
                                                loading="lazy"
                                                allowFullScreen
                                                referrerPolicy="no-referrer-when-downgrade"
                                                src={`https://maps.google.com/maps?q=${activeBranch.latitude},${activeBranch.longitude}&hl=en&z=15&output=embed`}
                                            ></iframe>

                                            {/* Map Controls Overlay (Visual Only) */}
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg shadow-sm border p-2 text-xs font-mono text-muted-foreground">
                                                Lat: {activeBranch.latitude.toFixed(4)} <br />
                                                Lng: {activeBranch.longitude.toFixed(4)}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                                <MapPin className="h-8 w-8 opacity-50" />
                                            </div>
                                            <h3 className="font-semibold text-lg mb-2">No Branch Selected</h3>
                                            <p className="text-sm max-w-xs mx-auto">
                                                Select a branch from the list to view its location on the map.
                                            </p>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    );
}

