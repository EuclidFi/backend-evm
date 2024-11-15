"use client";

import {
    CodegenGeneratedRouterSimulateSwapDocument,
    useCodegenGeneratedRouterAllTokensQuery,
    useCodegenGeneratedRouterSimulateSwapQuery,
    useCodegenGeneratedTokenTokenMetadataByIdQuery,
} from "@euclidprotocol/graphql-codegen/dist/src/react";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import Token from "../components/token";
import { ChevronDown, ArrowDownCircle, Settings2, RefreshCw } from "lucide-react";
import { useTokenSelectorModalStore } from "../modals/token-selector/state";
import { Input } from "../components/ui/input";
import { convertMacroToMicro, convertMicroToMacro } from "@andromedaprotocol/andromeda.js";
import { useGetRoutes } from "../hooks/rest/useGetRoutes";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../components/ui/select";
import PromiseButton from "../components/PromiseButton";
import { DenomSelector } from "../components/DenomSelector";
import { BalanceValue } from "../components/DenomBalance";
import { ITokenType } from "@euclidprotocol/graphql-codegen";
import { useWalletStore } from "../zustand/wallet";
import { useWalletModalStore } from "../modals/wallet/state";
import { useExecuteSwap } from "../hooks/rest/useExecuteSwap";
import { toast } from "sonner";
import { gqlClient } from "@/lib/gql/client";
import reactQueryClient from "@/lib/react-query/client";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function SwapEVM() {
    const { chain } = useWalletStore();
    const { onModalStateChange } = useWalletModalStore();
    const [fromToken, setFromToken] = useState<string>("");
    const [fromTokenAmount, setFromTokenAmount] = useState<string>("");
    const [toToken, setToToken] = useState<string>("");


    const [selectedFromDenom, setSelectedFromDenom] = useState<ITokenType>({ voucher: {} });

    useEffect(() => {
        setSelectedFromDenom({ voucher: {} });
    }, [fromToken])

    const [route, setRoute] = useState<string[]>([]);


    const { onOpenModal } = useTokenSelectorModalStore();

    const { data: tokens, loading } = useCodegenGeneratedRouterAllTokensQuery();

    const { data: fromTokenMetadata } =
        useCodegenGeneratedTokenTokenMetadataByIdQuery({
            variables: {
                token_token_metadata_by_id_token_id: fromToken || "",
            },
            skip: !fromToken,
        });

    const { data: toTokenMetadata } =
        useCodegenGeneratedTokenTokenMetadataByIdQuery({
            variables: {
                token_token_metadata_by_id_token_id: toToken || "",
            },
            skip: !toToken,
        });

    const microFromValue = useMemo(() => {
        return convertMacroToMicro(fromTokenAmount, fromTokenMetadata?.token.token_metadata_by_id.coinDecimal ?? 6).split(".")[0]
    }, [fromTokenAmount, fromTokenMetadata])

    const { data: routes, isLoading: routesLoading } = useGetRoutes({
        tokenIn: fromToken,
        tokenOut: toToken,
        amountIn: microFromValue
    })


    useEffect(() => {
        if (routes && routes.paths && routes.paths.length > 0) {
            setRoute(routes.paths[0]?.route || [])
        } else {
            setRoute([])
        }
    }, [routes])

    const { data: simulateSwapResult } = useCodegenGeneratedRouterSimulateSwapQuery({
        variables: {
            router_simulate_swap_amount_in: microFromValue,
            router_simulate_swap_asset_in: fromToken || "",
            router_simulate_swap_asset_out: toToken || "",
            router_simulate_swap_min_amount_out: "1",
            router_simulate_swap_swaps: route ?? [],
        },
        skip: !fromToken || !toToken || microFromValue === "0" || !route,
    });

    const macroAmountOut = useMemo(() => {
        return convertMicroToMacro(simulateSwapResult?.router.simulate_swap.amount_out ?? "0", toTokenMetadata?.token.token_metadata_by_id.coinDecimal ?? 6)
    }, [simulateSwapResult, toTokenMetadata])

    const { mutateAsync: executeSwap, isPending } = useExecuteSwap();

    const handleSwap = async () => {
        try {
            const tx = await executeSwap({
                amountIn: microFromValue,
                assetIn: {
                    token: fromToken!,
                    token_type: selectedFromDenom!,
                },
                assetOut: toToken || "",
                // TODO: Implement UI to generate cross chain addresses and update this
                crossChainAddresses: [],
                // TODO: Implement UI for splippage and calculate this using the slippage percentage
                minAmountOut: "1",
                swaps: route || [],
                timeout: 600,
            });
            // Invalidate the simulate swap query
            await gqlClient.refetchQueries({
                'include': [CodegenGeneratedRouterSimulateSwapDocument]
            });

            // Invalidate the routes query
            await reactQueryClient.invalidateQueries({
                queryKey: ["rest", "routes"]
            })
            console.log("Swap successful:", tx.transactionHash);

        } catch (error) {
            // @ts-expect-error Error is not typed
            toast.error(`Swap failed: ${error.message}`);
            console.error("Swap failed:", error);
        }
    }


    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Swap</h2>
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-800 hover:bg-gray-100">
                        <Settings2 className="h-5 w-5" />
                    </Button>
                </div>

                {/* From Token Section */}
                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <div className="space-y-2">
                            </div>

                            <span className="text-sm text-gray-600">From</span>
                            {fromToken && chain && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>Balance:</span>
                                    <BalanceValue
                                        tokenId={fromToken}
                                        selectedDenom={selectedFromDenom}
                                    />
                                    <DenomSelector
                                        selectedDenom={selectedFromDenom}
                                        chainUId={chain?.chain_uid ?? ""}
                                        tokenId={fromToken}
                                        setSelectedDenom={(d) => setSelectedFromDenom(d ?? { voucher: {} })}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={() =>
                                    onOpenModal({
                                        tokens: tokens?.router.all_tokens.tokens ?? [],
                                        title: "Select Token",
                                        description: "Select the token you want to swap",
                                        onTokenSelect: setFromToken,
                                    })
                                }
                                variant="ghost"
                                className="h-12 px-3 bg-white border border-gray-200 hover:bg-gray-50"
                            >
                                {fromToken ? (
                                    <div className="flex items-center gap-2">
                                        <Token token={fromToken} />
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </div>
                                ) : (
                                    "Select Token"
                                )}
                            </Button>
                            <Input
                                value={fromTokenAmount}
                                onChange={(e) => setFromTokenAmount(e.target.value)}
                                placeholder="0.00"
                                className="h-12 text-xl bg-transparent border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Swap Direction Button */}
                    <div className="flex justify-center -my-2 relative z-10">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm"
                        >
                            <ArrowDownCircle className="h-5 w-5 text-blue-600" />
                        </Button>
                    </div>

                    {/* To Token Section */}
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-bold">Connect Your EVM Wallet</span>
                            <div className="px-5">
                            <ConnectButton />

                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">To</span>
                            {simulateSwapResult && (
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <RefreshCw className="h-3 w-3" />
                                    <span>Best Price</span>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={() =>
                                    onOpenModal({
                                        tokens: tokens?.router.all_tokens.tokens ?? [],
                                        title: "Select Token",
                                        description: "Select the token you want to receive",
                                        onTokenSelect: setToToken,
                                    })
                                }
                                variant="ghost"
                                className="h-12 px-3 bg-white border border-gray-200 hover:bg-gray-50"
                            >
                                {toToken ? (
                                    <div className="flex items-center gap-2">
                                        <Token token={toToken} />
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </div>
                                ) : (
                                    "Select Token"
                                )}
                            </Button>
                            <Input
                                value={macroAmountOut}
                                placeholder="0.00"
                                className="h-12 text-xl bg-transparent border-gray-200"
                                readOnly
                                disabled
                            />
                        </div>
                    </div>
                </div>

                {/* Route Selection */}
                {(fromToken && toToken && (routes as any)?.paths?.length > 0) && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Route</span>
                            <Select
                                value={route.join("/")}
                                onValueChange={(r) => setRoute(r.split('/'))}
                            >
                                <SelectTrigger className="h-8 border-none bg-transparent hover:bg-white text-sm">
                                    {route.length > 0 ? route.join(" → ") : "Select Route"}
                                </SelectTrigger>
                                <SelectContent>
                                    {routes?.paths?.map((path) => (
                                        <SelectItem
                                            key={path.route.join("/")}
                                            value={path.route.join("/")}
                                        >
                                            {path.route.join(" → ")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                {chain ? (
                    <PromiseButton
                        disabled={isPending || !fromToken || !toToken || microFromValue === "0" || !route}
                        onClick={handleSwap}
                        className="w-full mt-6 h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-200 disabled:text-gray-500"
                    >
                        {isPending ? "Swapping..." : "Swap"}
                    </PromiseButton>
                ) : (
                    <Button
                        className="w-full mt-6 h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => onModalStateChange(true)}
                    >
                        Connect Chain
                    </Button>
                )}
            </div>
        </div>
    );
}