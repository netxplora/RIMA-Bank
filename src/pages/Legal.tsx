
import { Layout } from "@/components/layout/Layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useLocation } from "react-router-dom";

const legalContent = {
    privacy: {
        title: "Privacy Policy",
        content: (
            <div className="space-y-4">
                <p>Last updated: January 2026</p>
                <p>At Rivers MFB, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>

                <h3 className="text-lg font-bold mt-6">1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you open an account, apply for a loan, or communicate with us. This may include your name, email address, phone number, and financial information.</p>

                <h3 className="text-lg font-bold mt-6">2. How We Use Your Information</h3>
                <p>We use your information to provide banking services, process transactions, improve our products, and comply with legal obligations (such as KYC/AML regulations).</p>

                <h3 className="text-lg font-bold mt-6">3. Data Security</h3>
                <p>We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or destruction.</p>

                {/* More content would go here */}
            </div>
        )
    },
    terms: {
        title: "Terms of Service",
        content: (
            <div className="space-y-4">
                <p>Please read these terms carefully before using our services.</p>

                <h3 className="text-lg font-bold mt-6">1. Agreement to Terms</h3>
                <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>

                <h3 className="text-lg font-bold mt-6">2. Banking Services</h3>
                <p>Rivers MFB provides various financial services subject to CBN regulations. We reserve the right to modify or withdraw services at any time.</p>

                <h3 className="text-lg font-bold mt-6">3. User Responsibilities</h3>
                <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
            </div>
        )
    },
    cookies: {
        title: "Cookie Policy",
        content: (
            <div className="space-y-4">
                <p>We use cookies to enhance your browsing experience and analyze our traffic.</p>

                <h3 className="text-lg font-bold mt-6">What are Cookies?</h3>
                <p>Cookies are small text files that are stored on your device when you visit a website.</p>

                <h3 className="text-lg font-bold mt-6">How We Use Cookies</h3>
                <p>We use cookies to remember your preferences, understand how you use our site, and improve our services.</p>
            </div>
        )
    },
    complaints: {
        title: "Complaints Procedure",
        content: (
            <div className="space-y-4">
                <p>We are committed to providing excellent service. If you are not satisfied, please let us know.</p>

                <h3 className="text-lg font-bold mt-6">How to File a Complaint</h3>
                <p>You can file a complaint by contacting our customer support team or visiting any of our branches.</p>

                <h3 className="text-lg font-bold mt-6">Resolution Process</h3>
                <p>We aim to resolve all complaints within 48 hours. Complex issues may take longer, but we will keep you updated.</p>
            </div>
        )
    }
};

export default function Legal() {
    const location = useLocation();
    const path = location.pathname.split("/")[1]; // e.g., "privacy" from "/privacy"

    const content = legalContent[path as keyof typeof legalContent] || legalContent.privacy;

    return (
        <Layout>
            <div className="bg-muted/30 py-12 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-background rounded-xl shadow-sm border p-8 md:p-12">
                        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8 text-primary">
                            {content.title}
                        </h1>
                        <ScrollArea className="h-[60vh] pr-4">
                            <div className="text-muted-foreground leading-relaxed">
                                {content.content}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
