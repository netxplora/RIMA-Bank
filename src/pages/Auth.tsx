import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Download, ShieldAlert } from "lucide-react";

export default function Auth() {
  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-muted/20">
        <div className="max-w-xl w-full">
          {/* Customer Banking Notice - Mobile First */}
          <Card className="bg-primary text-primary-foreground border-none shadow-2xl flex flex-col justify-center text-center p-12 relative overflow-hidden">
            {/* Decorative Background Icon */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-10">
              <Smartphone className="w-64 h-64" />
            </div>

            <div className="relative z-10">
              <div className="mx-auto w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20">
                <Smartphone className="h-12 w-12 text-accent" />
              </div>

              <h2 className="text-4xl font-display font-bold mb-6">Mobile-Only Banking</h2>

              <div className="bg-accent/10 border border-accent/20 rounded-xl p-4 mb-8 flex items-start gap-3 text-left">
                <ShieldAlert className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-primary-foreground/90 leading-relaxed">
                  For your security, personal and business banking portals have been transitioned
                  exclusively to our mobile platform. The web portal for customer transactions
                  is no longer accessible.
                </p>
              </div>

              <p className="text-primary-foreground/80 mb-10 text-lg">
                Download the Rivers MFB app to manage your accounts, make transfers, and pay bills securely.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="h-14 px-8 font-bold">
                  <Download className="mr-2 h-5 w-5" />
                  Google Play
                </Button>
                <Button variant="heroOutline" size="lg" className="h-14 px-8 font-bold border-white/40">
                  <Download className="mr-2 h-5 w-5" />
                  App Store
                </Button>
              </div>
            </div>
          </Card>

          <p className="text-center text-muted-foreground text-xs mt-8">
            Rivers Microfinance Bank • High-Security Perimeter System
          </p>
        </div>
      </div>
    </Layout>
  );
}
