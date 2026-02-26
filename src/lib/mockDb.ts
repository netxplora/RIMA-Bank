
import { v4 as uuidv4 } from 'uuid';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string; // HTML content from WYSIWYG
    date: string;
    category: string;
    image: string;
    author: string;
}

export interface Transaction {
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    date: string;
    status: 'success' | 'pending' | 'failed';
    reference: string;
}

export interface Card {
    id: string;
    type: 'verve' | 'mastercard' | 'visa';
    number: string;
    expiry: string;
    cvv: string;
    isFrozen: boolean;
    balance?: number; // For prepaid cards if any
}

export interface LoanApplication {
    id: string;
    applicant: string;
    amount: number;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
    score: number;
}

export interface KYCRequest {
    id: string;
    user: string;
    email: string;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
    details: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    balance: number;
    savings: number;
    transactions: Transaction[];
    cards: Card[];
    loans: LoanApplication[];
    status: 'active' | 'suspended';
    kycStatus: 'verified' | 'pending' | 'rejected';
}

// Initial Data
const INITIAL_POSTS: BlogPost[] = [
    {
        id: "1",
        title: "Rivers MFB Launches New SME Support Program",
        excerpt: "We are excited to announce a new initiative to support small and medium enterprises across Rivers State with flexible financing options.",
        content: "<p>Full article content here...</p>",
        date: "2024-01-15",
        category: "Announcements",
        image: "/images/media-sme.png",
        author: "Admin"
    },
    {
        id: "2",
        title: "Financial Literacy Workshop for Students",
        excerpt: "Rivers MFB partners with local universities to deliver financial education to over 500 students in Port Harcourt.",
        content: "<p>Full article content here...</p>",
        date: "2024-01-10",
        category: "Community",
        image: "/images/media-students.png",
        author: "Admin"
    },
    {
        id: "3",
        title: "New Branch Opening in Oyigbo",
        excerpt: "We are thrilled to announce the opening of our newest branch in Oyigbo, bringing banking services closer to our customers.",
        content: "<p>Full article content here...</p>",
        date: "2024-01-05",
        category: "Expansion",
        image: "/images/hero-home.png",
        author: "Admin"
    },
    {
        id: "4",
        title: "Rivers MFB Mobile App Update: New Features",
        excerpt: "Our mobile banking app now includes QR payments, improved savings goals, and enhanced security features.",
        content: "<p>Full article content here...</p>",
        date: "2023-12-20",
        category: "Digital Banking",
        image: "/images/hero-digital.png",
        author: "Admin"
    },
    {
        id: "5",
        title: "Year in Review: 2023 Achievements",
        excerpt: "A look back at our accomplishments in 2023, including reaching 50,000 customers and disbursing over ₦5 billion in loans.",
        content: "<p>Full article content here...</p>",
        date: "2023-12-15",
        category: "Annual Report",
        image: "/images/hero-about.png",
        author: "Admin"
    },
    {
        id: "6",
        title: "Women Entrepreneurs Empowerment Initiative",
        excerpt: "Rivers MFB launches special loan program for women-owned businesses with reduced interest rates and mentorship support.",
        content: "<p>Full article content here...</p>",
        date: "2023-12-01",
        category: "Community",
        image: "/images/media-sme.png",
        author: "Admin"
    }
];

const INITIAL_USER: UserProfile = {
    id: 'mock-user-id',
    name: 'Demo User',
    email: 'user@riversmfb.com',
    balance: 2540300.00,
    savings: 1200000.00,
    status: 'active',
    kycStatus: 'verified',
    cards: [
        {
            id: 'c1',
            type: 'verve',
            number: '5061 **** **** 1234',
            expiry: '12/26',
            cvv: '***',
            isFrozen: false
        }
    ],
    transactions: [
        { id: 't1', type: 'debit', amount: 50000, description: 'Transfer to John Doe', date: new Date().toISOString(), status: 'success', reference: 'REF-001' },
        { id: 't2', type: 'credit', amount: 150000, description: 'Salary Deposit', date: new Date(Date.now() - 86400000).toISOString(), status: 'success', reference: 'REF-002' },
        { id: 't3', type: 'debit', amount: 12000, description: 'Utility Bill (PHED)', date: new Date(Date.now() - 172800000).toISOString(), status: 'success', reference: 'REF-003' },
    ],
    loans: []
};

// STORAGE KEYS
const KEY_POSTS = 'rivers_posts';
const KEY_USER = 'rivers_user';

export const mockDb = {
    // POSTS
    getPosts: (): BlogPost[] => {
        const stored = localStorage.getItem(KEY_POSTS);
        if (!stored) {
            localStorage.setItem(KEY_POSTS, JSON.stringify(INITIAL_POSTS));
            return INITIAL_POSTS;
        }
        return JSON.parse(stored);
    },

    addPost: (post: Omit<BlogPost, 'id' | 'date' | 'author'>) => {
        const posts = mockDb.getPosts();
        const newPost: BlogPost = {
            ...post,
            id: uuidv4(),
            date: new Date().toISOString().split('T')[0],
            author: 'Admin'
        };
        const updated = [newPost, ...posts];
        localStorage.setItem(KEY_POSTS, JSON.stringify(updated));
        return newPost;
    },

    // USER & TRANSACTIONS
    getUser: (): UserProfile => {
        const stored = localStorage.getItem(KEY_USER);
        if (!stored) {
            localStorage.setItem(KEY_USER, JSON.stringify(INITIAL_USER));
            return INITIAL_USER;
        }
        return JSON.parse(stored);
    },

    performTransfer: (amount: number, recipient: string, note: string): Transaction => {
        const user = mockDb.getUser();
        if (user.balance < amount) throw new Error("Insufficient funds");

        const newTransaction: Transaction = {
            id: uuidv4(),
            type: 'debit',
            amount,
            description: `Transfer to ${recipient} - ${note}`,
            date: new Date().toISOString(),
            status: 'success',
            reference: `TRX-${Math.floor(Math.random() * 1000000)}`
        };

        user.balance -= amount;
        user.transactions = [newTransaction, ...user.transactions];

        localStorage.setItem(KEY_USER, JSON.stringify(user));
        return newTransaction;
    },

    // CARDS
    toggleCardFreeze: (cardId: string) => {
        const user = mockDb.getUser();
        const cardIndex = user.cards.findIndex(c => c.id === cardId);
        if (cardIndex >= 0) {
            user.cards[cardIndex].isFrozen = !user.cards[cardIndex].isFrozen;
            localStorage.setItem(KEY_USER, JSON.stringify(user));
            return user.cards[cardIndex];
        }
        throw new Error("Card not found");
    },

    updateProfile: (data: Partial<UserProfile>) => {
        const user = mockDb.getUser();
        const updatedUser = { ...user, ...data };
        localStorage.setItem(KEY_USER, JSON.stringify(updatedUser));
        return updatedUser;
    },

    // LOANS
    getLoans: (): LoanApplication[] => {
        const user = mockDb.getUser();
        return user.loans || [];
    },

    updateLoanStatus: (loanId: string, status: 'approved' | 'rejected') => {
        const user = mockDb.getUser();
        const loanIndex = user.loans.findIndex(l => l.id === loanId);
        if (loanIndex >= 0) {
            user.loans[loanIndex].status = status;
            localStorage.setItem(KEY_USER, JSON.stringify(user));
            return user.loans[loanIndex];
        }
        throw new Error("Loan not found");
    },

    applyForLoan: (amount: number, type: string, purpose: string) => {
        const user = mockDb.getUser();
        const newLoan: LoanApplication = {
            id: `LN-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
            applicant: user.name,
            amount,
            type,
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            score: 750 // Mock score
        };
        user.loans = [newLoan, ...(user.loans || [])];
        localStorage.setItem(KEY_USER, JSON.stringify(user));
        return newLoan;
    },

    // KYC
    getKYCRequests: (): KYCRequest[] => {
        // Return a mix of static requests (for demo population) and dynamic ones
        const stored = localStorage.getItem('rivers_kyc_requests');
        const dynamicRequests = stored ? JSON.parse(stored) : [];

        // If the dynamic request list is empty, return static requests if you want pre-filled data,
        // or just return dynamic. Let's return mixed so the list isn't empty initially.
        const staticRequests: KYCRequest[] = [
            {
                id: "1",
                user: "John Doe",
                email: "john@example.com",
                type: "NIN Verification",
                status: "pending",
                date: "2024-01-23",
                details: "NIN: 12345678901"
            },
            {
                id: "2",
                user: "Jane Smith",
                email: "jane@example.com",
                type: "BVN Verification",
                status: "pending",
                date: "2024-01-23",
                details: "BVN: 22222222222"
            }
        ];

        // Filter out any static requests that might have been "processsed" (removed) 
        // Logic for "processing" static requests purely in frontend state is easier, 
        // but for persistence we'll just append new ones.
        return [...dynamicRequests, ...staticRequests];
    },

    addKYCRequest: (data: Omit<KYCRequest, 'id' | 'status' | 'date'>) => {
        const stored = localStorage.getItem('rivers_kyc_requests');
        const requests: KYCRequest[] = stored ? JSON.parse(stored) : [];

        const newRequest: KYCRequest = {
            id: uuidv4(),
            ...data,
            status: 'pending',
            date: new Date().toISOString().split('T')[0]
        };

        localStorage.setItem('rivers_kyc_requests', JSON.stringify([newRequest, ...requests]));
        return newRequest;
    }
};
