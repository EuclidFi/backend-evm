"use client";
import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, Wallet } from 'lucide-react';

const InvestmentBasketsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'DeFi', 'Meme', 'GameFi'];

    const basketsData = [
        {
            id: "a",
            name: 'DeFi Basket 1',
            category: 'DeFi',
            containsTokens: ['TON', '1INCH', 'SUSHI'],
            oneMonthReturn: 50.00,
            oneYearReturn: 20.00,
        },
        {
            id: "b",
            name: 'DeFi Basket 2',
            category: 'DeFi',
            containsTokens: ['POL', 'ARB', 'OGC'],
            oneMonthReturn: 50.00,
            oneYearReturn: 20.00,
        },
        {
            id: "c",
            name: 'DeFi Basket 3',
            category: 'DeFi',
            containsTokens: ['UNI', 'BNB', 'TON'],
            oneMonthReturn: 50.00,
            oneYearReturn: 20.00,
        },
        {
            id: "d",
            name: 'Meme Basket 1',
            category: 'Meme',
            containsTokens: ['SONA', 'LOHA', 'SILVER'],
            oneMonthReturn: 50.00,
            oneYearReturn: 20.00,
        },
        {
            id: "e",
            name: 'Meme Basket 2',
            category: 'Meme',
            containsTokens: ['PEPE', 'MOTO', 'DOGE'],
            oneMonthReturn: 50.00,
            oneYearReturn: 20.00,
        }
    ];

    const filteredBaskets = basketsData.filter(basket =>
        selectedCategory === 'All' ? true : basket.category === selectedCategory
    );

    return (
        <div className="min-h-screen p-6 text-black">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Cross Chain Investment Baskets
                    </h1>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Diversify your portfolio with curated token baskets across different chains
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex justify-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                btn btn-sm rounded-full transition-all duration-200
                ${selectedCategory === category
                                    ? 'btn-primary'
                                    : 'btn-ghost'}
              `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Baskets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBaskets.map((basket) => (
                        <div key={basket.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-200">
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="card-title">{basket.name}</h2>
                                        <div className="badge badge-secondary mt-2">
                                            {basket.category}
                                        </div>
                                    </div>
                                    <ArrowUpRight className="text-primary" />
                                </div>

                                {/* Tokens */}
                                <div className="flex gap-2 mt-4">
                                    {basket.containsTokens.map((token) => (
                                        <div key={token} className="badge badge-outline">
                                            {token}
                                        </div>
                                    ))}
                                </div>

                                {/* Returns */}
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-success">
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="font-semibold">
                                                {basket.oneMonthReturn}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-base-content/60">1M Return</p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1 text-success">
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="font-semibold">
                                                {basket.oneYearReturn}%
                                            </span>
                                        </div>
                                        <p className="text-sm text-base-content/60">1Y Return</p>
                                    </div>
                                </div>

                                {/* Invest Button */}
                                <button className="btn btn-primary w-full mt-4 flex items-center justify-center gap-2">
                                    <Wallet className="w-4 h-4" />
                                    Invest Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvestmentBasketsPage;