"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { ethers } from 'ethers';
import { Chart } from 'react-google-charts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';
import { abi } from '@/lib/abi/Basket';
import { CrateData1, options } from '@/lib/data';

const Crate = () => {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const params = useParams();


  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null); const [open, setOpen] = useState('deposit');
  const [amount, setAmount] = useState('0');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setOpen(searchParams.get('state') || 'deposit');
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);
    }
  }, []);

  const priceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const termsHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
  };

  const handleTabOpen = (tabCategory: string) => {
    setOpen(tabCategory);
  };

  const deposit = async () => {
    if (!isConnected || !provider) {
      toast.error('Please connect your wallet');
      return;
    }
    try {
      await writeContract({
        abi,
        address: '0xaEa04f2a42d9dE2460979a88810Acef109d6a894',
        functionName: 'depositAndSwap',
        args: [
          params.id,
          '0x41181b2148ACA90F8d7A9559c2BA92BDFF4b57e4',
          BigInt(Number(amount) * 1e18),
        ],
      });
      toast.success('Deposit successful!');
    } catch (error) {
      toast.error('Deposit failed. Please try again.');
    }
  };

  const withdraw = async () => {
    if (!isConnected || !provider) {
      toast.error('Please connect your wallet');
      return;
    }
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    try {
      await writeContract({
        abi,
        address: '0xaEa04f2a42d9dE2460979a88810Acef109d6a894',
        functionName: 'withdraw',
        args: [
          'a',
          '0xAB1d05a66b93353eFf8ea519D4675a362c761894',
          BigInt(1e18),
        ],
      });
      toast.success('Withdrawal successful!');
    } catch (error) {
      toast.error('Withdrawal failed. Please try again.');
    }
  };

  return (
    <div className="p-4 md:p-16">
      <ToastContainer />
      <div className="flex flex-col md:flex-row gap-5 min-h-[500px]">
        <div className="card shadow-2xl rounded-xl w-full md:w-[40%]">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <h2 className="card-title text-2xl md:text-3xl">
                {decodeURIComponent(Array.isArray(params.name) ? params.name[0] : params.name)}
              </h2>
              <div className="text-xs bg-blue-500 px-2 py-1 rounded-xl font-bold text-white">
                DeFi
              </div>
            </div>
            <div className="p-2 md:p-5">
              <div className="card my-3 bg-blue-100 shadow-xl p-3">
                <div className="p-2 justify-between items-center">
                  <div className="flex flex-row w-full items-center gap-2 md:gap-4">
                    <div
                      className={`w-1/2 py-2 md:py-4 px-1 md:px-4 text-sm font-semibold md:text-base lg:px-12 hover:underline-offset-8
                          rounded-2xl text-center transition-all delay-75 text-black focus:ring focus:ring-blue-400 cursor-pointer 
                          ${open === "deposit" ? "bg-white drop-shadow-2xl text-black font-semibold" : ""}`}
                    >
                      <button onClick={() => handleTabOpen("deposit")}>
                        Buy
                      </button>
                    </div>
                    <div
                      className={`w-1/2 py-2 md:py-4 px-2 md:px-4 text-sm md:text-base lg:px-12 hover:underline-offset-8
                          text-center rounded-2xl transition-all delay-75 text-black cursor-pointer 
                          ${open === "withdraw" ? "bg-white drop-shadow-2xl text-black font-semibold" : ""}`}
                    >
                      <button onClick={() => handleTabOpen("withdraw")}>
                        Withdraw
                      </button>
                    </div>
                  </div>
                  <div className="divider divider-neutral mt-2"></div>

                  {open === "deposit" && (
                    <div>
                      <div className="w-full max-w-lg">
                        <div className="my-3">
                          <label className="form-control w-full">
                            <div className="label">
                              <div className="my-2">Enter Amount</div>
                            </div>
                            <input
                              type="text"
                              id="stake-value"
                              defaultValue={amount}
                              onChange={priceHandler}
                              className="input input-lg input-bordered w-full bg-white "
                              placeholder="0"
                              required
                            />
                          </label>
                        </div>
                        <div className="text-sm">
                          <div className="">
                            <div className="flex items-center justify-between"></div>
                          </div>
                        </div>
                        <button
                          onClick={deposit}
                          className="bg-yellow-400 dark:bg-slate-900 text-black font-bold py-2 px-4 dark:text-black border-blue-700 rounded-3xl w-full md:w-auto"
                        >
                          Invest
                        </button>
                      </div>
                    </div>
                  )}

                  {open === "withdraw" && (
                    <div>
                      <div>
                        <div className="w-full max-w-lg">
                          <div className="my-4">
                            <label className="form-control w-full">
                              <div className="label">
                                <div className="font-bold pt-2 md:pt-5">
                                  Crate Withdraw available
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="my-6"></div>
                          <div className="flex items-center mb-6">
                            <input
                              type="checkbox"
                              id="terms"
                              checked={termsAccepted}
                              onChange={termsHandler}
                              className="mr-2"
                            />
                            <label
                              htmlFor="terms"
                              className="text-sm lg:text-lg font-semibold text-black dark:text-white"
                            >
                              I want to withdraw my Crates position
                            </label>
                          </div>
                          <button
                            onClick={withdraw}
                            className="bg-yellow-400 dark:bg-slate-900 text-black font-bold py-2 px-4 dark:text-black border-blue-700 rounded-3xl w-full md:w-auto"
                          >
                            Withdraw
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow-2xl rounded-xl w-full md:w-[60%] p-4">
          <Chart
            chartType="LineChart"
            width="100%"
            height="300px"
            data={CrateData1}
            options={options}
            legendToggle
          />
        </div>
      </div>
    </div>
  );
};


// const TabButton = ({ label, isActive, onClick }) => (
//   <button
//     onClick={onClick}
//     className={`w-1/2 py-2 md:py-4 px-2 md:px-4 text-sm md:text-base rounded-2xl text-center transition-all delay-75 text-black focus:ring focus:ring-blue-400 cursor-pointer 
//       ${isActive ? 'bg-white drop-shadow-2xl font-semibold' : 'hover:bg-white/50'}`}
//   >
//     {label}
//   </button>
// );

// const DepositForm = ({ amount, setAmount, onDeposit }) => (
//   <div className="w-full">
//     <div className="my-3">
//       <label className="form-control w-full">
//         <div className="label">
//           <div className="my-2">Enter Amount</div>
//         </div>
//         <input
//           type="text"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           className="input input-lg input-bordered bg-white"
//           placeholder="0"
//           required
//         />
//       </label>
//     </div>
//     <button
//       onClick={onDeposit}
//       className="bg-yellow-400 dark:bg-slate-900 text-black font-bold py-2 px-4 dark:text-black border-blue-700 rounded-3xl w-full md:w-auto"
//     >
//       Invest
//     </button>
//   </div>
// );

// const WithdrawForm = ({ termsAccepted, setTermsAccepted, onWithdraw }) => (
//   <div className="w-full">
//     <div className="my-4">
//       <div className="font-bold pt-2 md:pt-5">Crate Withdraw available</div>
//     </div>
//     <div className="flex items-center mb-6">
//       <input
//         type="checkbox"
//         id="terms"
//         checked={termsAccepted}
//         onChange={(e) => setTermsAccepted(e.target.checked)}
//         className="mr-2"
//       />
//       <label
//         htmlFor="terms"
//         className="text-sm md:text-lg font-semibold text-black dark:text-white"
//       >
//         I want to withdraw my Crates position
//       </label>
//     </div>
//     <button
//       onClick={onWithdraw}
//       className="bg-yellow-400 dark:bg-slate-900 text-black font-bold py-2 px-4 dark:text-black border-blue-700 rounded-3xl w-full md:w-auto"
//     >
//       Withdraw
//     </button>
//   </div>
// );

export default Crate;




// import { ethers } from "ethers";
// import React, { useState, useEffect, ChangeEvent } from "react";
// import { useAccount, useWriteContract } from "wagmi";
// import { Chart } from "react-google-charts";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { abi, ERC20abi } from "@/lib/abi/Basket";
// import { CRATE_CONTRACT_ADDRESS, getCrateContract } from "@/lib/contracts";
// import { CrateData1, options } from "@/lib/data";
// import { useParams } from "next/navigation";

// const Crate = () => {
//   const { address, isConnected } = useAccount();
//   const { writeContract } = useWriteContract();

//   const [provider, setProvider] =
//     useState<ethers.providers.Web3Provider | null>(null);

//   const params = useParams();

//   const [state, setState] = useState<string>("deposit");
//   const [exchange, setExchange] = useState("1");
//   const [amount, setAmount] = useState<string>("0");
//   const [open, setOpen] = useState(state); // withdraw
//   const [withdrawAmount, setWithdrawAmount] = useState<string>("1");
//   const [withdrawStatus, setWithdrawStatus] = useState<boolean>(true);
//   const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     setOpen(searchParams.get("state") || "deposit");
//     if (typeof window !== "undefined" && window.ethereum) {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       setProvider(provider);
//     }
//   }, []);

//   const handleTabOpen = (tabCategory: string) => {
//     setOpen(tabCategory);
//   };

//   const priceHandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setAmount(e.target.value);
//   };

//   console.log("amount", amount);

//   const withdrawHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setWithdrawAmount(event.target.value);
//     console.log("withdraw amount", withdrawAmount);
//   };

//   const termsHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setTermsAccepted(event.target.checked);
//   };

//   const deposit = async () => {
//     if (!isConnected || !provider) {
//       toast.error("Please connect your wallet");
//       return;
//     }
//     console.log("amount --->>> ", amount);

//     const tx = await writeContract({
//       abi,
//       address: "0x9ECfCFb4f4388C3Fb61b689D340EDceb9eaeA6B6",
//       functionName: "depositAndSwap",
//       args: [
//         params.id,
//         "0x41181b2148ACA90F8d7A9559c2BA92BDFF4b57e4",
//         BigInt(Number(amount) * 1000000000000000000),
//       ],
//     });
//   };

//   const withdraw = async () => {
//     // event.preventDefault(); // Prevent the default form submission

//     if (!isConnected || !provider) {
//       toast.error("Please connect your wallet");
//       return;
//     }

//     if (!termsAccepted) {
//       toast.error("Please accept the terms and conditions");
//       return;
//     }

//     const tx = await writeContract({
//       abi,
//       address: "0x9ECfCFb4f4388C3Fb61b689D340EDceb9eaeA6B6",
//       functionName: "withdraw",
//       args: [
//         "a",
//         "0xAB1d05a66b93353eFf8ea519D4675a362c761894",
//         BigInt(Number(1) * 1000000000000000000),
//       ],
//     });
//   };

//   return (
//     <div className="p-16 ">
//       {/* <div className="pb-5 text-[30px] font-bold ">Dashboard</div> */}
//       <ToastContainer />
//       <div className="flex gap-5 min-h-[500px]">
//         <div className="card shadow-2xl rounded-xl w-[40%]">
//           <div className="card-body">
//             <div className="flex items-center justify-between">
//               <h2 className="card-title text-3xl">
//                 {" "}
//                 {decodeURIComponent(Array.isArray(params.name) ? params.name[0] : params.name)}
//               </h2>
//               <div className="text-xs bg-blue-500 px-2 py-1 rounded-xl font-bold text-white">
//                 {" "}
//                 DeFi
//               </div>
//             </div>
//             <div className="p-5">
//               {/* <div className="my-1 border-t border-gray-300"></div> */}
//               <div className="">
//                 <div className="flex items-center justify-between">
//                   {/* <div> Tokens: PEPE, MOTO, BNB </div> */}
//                   <div> </div>
//                 </div>
//               </div>
//               <div className="card my-3 bg-blue-100 shadow-xl p-3">
//                 <div className=" p-2 justify-between items-center">
//                   <div className="flex flex-row w-full items-center gap-4">
//                     <div
//                       className={`w-1/2 py-4 px-1 md:px-4 text-sm font-semibold md:text-base lg:px-12 hover:underline-offset-8
//                                     rounded-2xl text-center transition-all delay-75 text-black focus:ring focus:ring-blue-400 cursor-pointer 
//                                 ${
//                                   open === "deposit"
//                                     ? " bg-white drop-shadow-2xl text-black font-semibold"
//                                     : " "
//                                 }`}
//                     >
//                       <button onClick={() => handleTabOpen("deposit")}>
//                         Buy
//                       </button>
//                     </div>

//                     <div
//                       className={`w-1/2 py-4 px-4 text-sm md:text-base lg:px-12 hover:underline-offset-8
//                           text-center rounded-2xl transition-all delay-75 text-black  cursor-pointer ${
//                             open === "withdraw"
//                               ? " bg-white drop-shadow-2xl text-black font-semibold "
//                               : " "
//                           }`}
//                     >
//                       <button onClick={() => handleTabOpen("withdraw")}>
//                         Withdraw
//                       </button>
//                     </div>
//                   </div>
//                   <div className="divider divider-neutral mt-0"></div>

//                   {/* stake option */}
//                   {open === "deposit" && (
//                     <div>
//                       <div className="w-full max-w-lg">
//                         {/* <div className="my-4">
//                                                     <label className="form-control w-full">
//                                                         <div className="label">
//                                                             <div>Select the Asset</div>
//                                                         </div>
//                                                         <select className="select select-bordered">
//                                                             <option>stNIBI</option>
//                                                         </select>
//                                                     </label>
//                                                 </div> */}

//                         <div className="my-3">
//                           <label className="form-control w-full">
//                             <div className="label">
//                               <div className="my-2">Enter Amount</div>
//                             </div>
//                             <input
//                               type="text"
//                               id="stake-value"
//                               defaultValue={amount}
//                               onChange={priceHandler}
//                               className="input input-lg input-bordered"
//                               placeholder="0"
//                               required
//                             />
//                           </label>
//                         </div>
//                         <div className="text-sm">
//                           <div className="">
//                             <div className="flex items-center justify-between"></div>
//                           </div>

//                           {/* <div className="my-2">
//                                                         <div className="flex items-center justify-between">
//                                                             <div className="">Exchange Rate</div>
//                                                             <div>1 = {exchange}</div>
//                                                         </div>
//                                                     </div> */}
//                         </div>

//                         <button
//                           onClick={deposit}
//                           className="bg-yellow-400 dark:bg-slate-900 text-black font-bold py-2 px-4  dark:text-black border-blue-700 rounded-3xl "
//                         >
//                           Invest
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {/* withdraw option */}
//                   {open === "withdraw" && (
//                     <div>
//                       <div>
//                         <div className="w-full max-w-lg">
//                           <div className="my-4">
//                             <label className="form-control w-full">
//                               <div className="label">
//                                 <div className="font-bold pt-5">
//                                   Crate Withdraw available
//                                 </div>
//                               </div>
//                             </label>
//                           </div>

//                           <div className="my-6">
//                             {/* <label className="form-control w-full">
//                               <div className="input input-lg input-bordered">
//                                 <div className="flex align-middle justify-between text-center pt-2 ">
//                                   {withdrawAmount} Crate
//                                 </div>
//                               </div>
//                             </label> */}
//                           </div>

//                           <div className="flex items-center mb-6">
//                             <input
//                               type="checkbox"
//                               id="terms"
//                               checked={termsAccepted}
//                               onChange={termsHandler}
//                               className="mr-2"
//                             />
//                             <label
//                               htmlFor="terms"
//                               className="text-lg font-semibold text-black dark:text-white"
//                             >
//                               I want to withdraw my Crates position
//                             </label>
//                           </div>

//                           <button
//                             onClick={withdraw}
//                             className="bg-yellow-400 dark:bg-slate-900 text-black font-bold py-2 px-4  dark:text-black border-blue-700 rounded-3xl "
//                           >
//                             Withdraw
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="card shadow-2xl rounded-xl w-[60%] p-4">
//           {/* <h2 className="card-title">Amountd ETH</h2> */}
//           <Chart
//             chartType="LineChart"
//             width="100%"
//             height="100%"
//             data={CrateData1}
//             options={options}
//             legendToggle
//           />
//         </div>
//       </div>

//       {/* <div className="pt-5">
//         <div className="text-xl font-bold"> Transaction History</div>
//         <div className="card w-full my-5 p-5 items-center bg-base-200 shadow-xl">
//           {!isConnected ? (
//             <div className="card-body">
//               <h2 className="card-title">Connect your Wallet</h2>
//               <div>
//                 <span className="loading loading-ring loading-xs"></span>
//                 <span className="loading loading-ring loading-sm"></span>
//                 <span className="loading loading-ring loading-md"></span>
//                 <span className="loading loading-ring loading-lg"></span>
//               </div>
//             </div>
//           ) : (
//             <div className="w-full">
//               <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//                 <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                   <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                       <th scope="col" className="px-6 py-3">
//                         Hash
//                       </th>
//                       <th scope="col" className="px-6 py-3">
//                         Crates
//                       </th>
//                       <th scope="col" className="px-6 py-3">
//                         Time
//                       </th>


//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                       <th
//                         scope="row"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         0x9726e6cac75e92941f13bfe705a0b32cf132ff2451ce1a6cc8bf0748a6c61b17
//                       </th>
//                       <td className="px-6 py-4">1</td>
//                       <td className="px-6 py-4">
//                         <div>
//                           <div className=" "> 10:23:50 13 Oct</div>
//                         </div>
//                       </td>

//                     </tr>
//                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                       <th
//                         scope="row"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         0xj3k3jb235e92941f13bfe705a0b32cf132ff2451ce1a6cc8bf0748a6c61b17
//                       </th>
//                       <td className="px-6 py-4">1</td>
//                       <td className="px-6 py-4">
//                         <div>
//                           <div className=" "> 2:23:50 13 Oct</div>
//                         </div>
//                       </td>

//                     </tr>
//                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                       <th
//                         scope="row"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         0x34jn726e6cac75e92941f13bfe705a0b32cf132ff2451ce1a6cc8bf0748a6c61b17
//                       </th>
//                       <td className="px-6 py-4">1</td>
//                       <td className="px-6 py-4">
//                         <div>
//                           <div className=" "> 1:23:50 12 Oct</div>
//                         </div>
//                       </td>

//                     </tr>
//                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                       <th
//                         scope="row"
//                         className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                       >
//                         0x34kje6cac75e92941f13bfe705a0b32cf132ff2451ce1a6cc8bf0748a6c61b17
//                       </th>
//                       <td className="px-6 py-4">1</td>
//                       <td className="px-6 py-4">
//                         <div>
//                           <div className=" "> 3:23:50 11 Oct</div>
//                         </div>
//                       </td>

//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Crate;
