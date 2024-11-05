"use client"

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useWalletModalStore } from "@/src/modals/wallet/state";
import { useWalletStore } from "@/src/zustand/wallet";
import ChainHorizontal from "../ChainHorizontal";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import AppLogo from '../../../public/images/logo.png';
import Image from "next/image";

export default function Navbar() {
    const { onModalStateChange } = useWalletModalStore()
    const { isConnected, chain } = useWalletStore()
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="bg-black text-white py-4">
            <div className="mx-auto justify-between items-center
        bg-black w-screen px-4 flex ">
                <Link href="/">
                    <div className="flex items-center cursor-pointer">
                        <Image src={AppLogo} height={80} width={50} alt="mantle logo" className="px-2 rounded" />
                        <div className="text-[32px] text-white font-serif"
                        >
                            BaseCrate
                        </div>
                        <div className="ml-[0.8rem] text-white font-semibold text-2xl"></div>
                    </div>
                </Link>

                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative flex flex-1 mx-[0.8rem] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c] ">
                        <input
                            type="text"
                            placeholder="Track Your Investment"
                            className="bg-[#363840] text-white p-2 rounded-lg w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            onClick={() => router.push(`/searching/${searchQuery}`)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                            <AiOutlineSearch className="text-[#8a939b]" />
                        </button>
                    </div>

                    <button
                        onClick={() => router.push("/dashboard")}
                        className="flex items-center space-x-1 hover:text-gray-300"
                    >
                        <CgProfile />
                        <span>Dashboard</span>
                    </button>

                    <ConnectButton />
                </div>

                <button onClick={toggleMenu} className="md:hidden">
                    <AiOutlineMenu size={24} />
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden mt-4 space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Track Your Investment"
                            className="bg-[#363840] text-white p-2 rounded-lg w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            onClick={() => router.push(`/searching/${searchQuery}`)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                            <AiOutlineSearch className="text-[#8a939b]" />
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            router.push("/dashboard");
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-1 hover:text-gray-300 w-full"
                    >
                        <CgProfile />
                        <span>Dashboard</span>
                    </button>

                    <div className="w-full">
                        {/* <ConnectButton /> */}
                    </div>
                </div>
            )}
            <div className="flex flex-row items-center bg-slate-500/10 backdrop-blur-md py-3 px-6">
                <h3 className="text-md">EuclidFi</h3>
                <div className="flex-1 flex flex-row items-center justify-end">
                    <Button onClick={() => onModalStateChange(true)} >{(isConnected && chain?.chain_uid) ?
                        <div className="flex flex-row items-center gap-x-2">
                            <ChainHorizontal chain_uid={chain?.chain_uid} />
                            <ChevronDown className="h-4 w-4" />
                        </div> : "Connect Wallet"}</Button>
                </div>
            </div>
        </nav>

    )
}