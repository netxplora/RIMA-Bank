import { Link } from "react-router-dom";
import { Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileAppCTA() {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">
              Mobile Banking
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-6">
              Bank Anywhere,{" "}
              <span className="text-accent">Anytime</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Download the Rivers MFB Mobile App and enjoy banking at your fingertips.
              Transfer funds, pay bills, check balances, and more – all from your smartphone.
            </p>

            <div className="flex items-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-primary-foreground/80">4.8 rating on app stores</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="accent" size="lg" asChild>
                <a href="#">
                  <Download className="h-5 w-5" />
                  Download for iOS
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="#">
                  <Download className="h-5 w-5" />
                  Download for Android
                </a>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/60 mt-6">
              * Available on iOS 12+ and Android 8+
            </p>
          </div>

          {/* Phone Mockup */}
          <div className="relative flex justify-center">
            <div className="relative max-w-[320px] lg:max-w-none">
              <div className="relative z-20 transform hover:rotate-2 transition-transform duration-500">
                <img
                  src="/images/Mobile-App.png"
                  alt="Rivers MFB Mobile App"
                  className="w-full h-auto drop-shadow-2xl rounded-[2.5rem]"
                />
              </div>

              {/* Decorative background element for depth */}
              <div className="absolute -bottom-10 -left-10 w-full h-full bg-accent/10 rounded-[3rem] -z-10 blur-3xl" />


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
