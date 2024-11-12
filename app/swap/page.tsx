import TokenSelectorModal from "@/src/modals/token-selector";
import Swap from "@/src/swap";
import { ArrowLeftRight, Wallet, History, BookOpen, Github } from "lucide-react";


export default function Home() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Cross Chain Swap
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Seamlessly swap tokens across multiple Cosmos-based chains using universal liquidy pool.
            </p>
        </div>

        {/* Swap Interface Container */}
        <div className="max-w-xl mx-auto text-black">
            <Swap />
            <TokenSelectorModal />
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <ArrowLeftRight className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cross-Chain Swaps</h3>
                <p className="text-gray-600">Swap tokens across different Cosmos based chains with ease and security.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <History className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Best Rates</h3>
                <p className="text-gray-600">Get optimal rates through our advanced routing algorithm.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">User Friendly</h3>
                <p className="text-gray-600">Simple and intuitive interface for seamless trading experience.</p>
            </div>
        </div>

    </main>
    );
}
