"use client";
import React, { useState } from 'react';
import { CiDollar } from 'react-icons/ci';
import { HoverBorderGradient } from '@/src/components/ui/hover-border-gradient';
import { useRouter } from 'next/navigation';
import CrateCard from './CrateCard';

interface GridComponentProps {
    title: string;
    value: string;
    label: string;
    onClick?: () => void;
}

const categories = ['All', 'DeFi', 'Meme', 'GameFi'];

const crateData = [
    {
        id: "a",
        name: 'DeFi Crate 1',
        category: 'DeFi',
        containsTokens: ['TON', '1INCH', 'SUSHI'],
        oneMonthReturn: 50.00,
        oneYearReturn: 20.00,
    },
    {
        id: "b",
        name: 'DeFi Crate 2',
        category: 'DeFi',
        containsTokens: ['POL', 'ARB', 'OGC'],
        oneMonthReturn: 50.00,
        oneYearReturn: 20.00,
    },
    {
        id: "c",
        name: 'DeFi Crate 3',
        category: 'DeFi',
        containsTokens: ['UNI', 'BNB', 'TON'],
        oneMonthReturn: 50.00,
        oneYearReturn: 20.00,
    },
    {
        id: "d",
        name: 'Meme Crate 1',
        category: 'Meme',
        containsTokens: ['SONA', 'LOHA', 'SILVER'],
        oneMonthReturn: 50.00,
        oneYearReturn: 20.00,
    },
    {
        id: "e",
        name: 'Meme Crate 2',
        category: 'Meme',
        containsTokens: ['PEPE', 'MOTO', 'DOGE'],
        oneMonthReturn: 50.00,
        oneYearReturn: 20.00,
    },
    // Add more crate data objects here
];


const Grid: React.FC = () => {
    const router = useRouter()
    const [selectedCategory, setSelectedCategory] = useState<string | null>('All');

    const filteredCrates = crateData.filter((crate) => {
        if (selectedCategory === 'All') {
            return true; // Show all crates if no category is selected
        }
        return crate.category === selectedCategory;
    });

    return (
        <div className='p-5'>
            <div className='py-2'>
                <div className='text-3xl lg:text-5xl text-center'>Select Your Crate</div>
            </div>
            <div className="flex gap-4 text-center align-middle justify-center items-center pb-4 px-5 sm:text-[10px]">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-3 lg:px-6 py-2 rounded-3xl ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCrates.map((crateData, index) => (
                    <CrateCard crateData={crateData} key={index} />
                ))}
            </div>

            {/* 
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(1)].map((_, index) => (
                    <CrateCard crateData={crateData}
                        key={index}
                    // title={`Card ${index + 1}`}
                    />
                ))}
            </div> */}
        </div >
    );
};

export default Grid;

const GridComponent: React.FC<GridComponentProps> = ({ title, value, label, onClick }) => {
    return (

        <div className="flex flex-col items-center justify-center">
            <div className="w-px h-12 bg-green-300"></div>
            <div className="flex flex-col px-2">
                <div>{value}</div>
                <div className="text-xs">{label}</div>
            </div>
            {onClick && (
                <HoverBorderGradient
                    containerClassName="rounded-2xl"
                    as="button"
                    onClick={onClick}
                    className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
                >
                    {title}
                </HoverBorderGradient>
            )}
        </div>
    );
};
