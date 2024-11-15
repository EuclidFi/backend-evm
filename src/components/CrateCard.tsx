import React from "react";
import { CiDollar } from "react-icons/ci";
import Link from "next/link";

interface CrateCardProps {
  crateData: {
    id: string;
    name: string;
    category: string;
    containsTokens: string[];
    oneMonthReturn: number;
    oneYearReturn: number;
    // totalStakers: number;
  };
}

const CrateCard: React.FC<CrateCardProps> = ({ crateData }) => {
  const { id, name, category, containsTokens, oneMonthReturn, oneYearReturn } =
    crateData;

  return (
    <div className="card my-5 bg-gray-200 shadow-xl">
      <div className=" p-5 justify-between items-center">
        <div className="flex flex-row w-full items-center gap-4">
          <CiDollar className="bg-yellow-300 rounded-xl text-3xl" />
          <div>
            <h2 className="text-left text-xl font-semibold">{name}</h2>
            <div className="text-[12px]">Category: {category}</div>
          </div>
        </div>
        <div className="divider divider-neutral"></div>

        <div>
          <div className="pb-4">
            Contains Tokens: {containsTokens.join(", ")}
          </div>
        </div>
        <div className="text-sm">
          <div className="my-1 border-t border-gray-300"></div>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="">1 month return</div>
              <div>{oneMonthReturn.toFixed(2)}%</div>
            </div>
          </div>

          <div className="my-1 border-t border-gray-300"></div>
          <div className="">
            <div className="flex items-center justify-between">
              <div className="">1 year return</div>
              <div>{oneYearReturn.toFixed(2)}%</div>
            </div>
          </div>

          <div className="my-1 border-t border-gray-300"></div>
          <div className="">
            {/* <div className="flex items-center justify-between">
                            <div className="">TOTAL NUM. STAKERS</div>
                            <div>{totalStakers.toFixed(3)}</div>
                        </div> */}
          </div>

          <div>
            <Link href={`/invest/${id}/${name}`}>
              <button className="bg-black text-white my-2 px-4 py-2 rounded-3xl">
                Invest Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


export default CrateCard;