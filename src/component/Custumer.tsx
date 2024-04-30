import { IoPersonSharp } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import React from "react";
import { Customers } from "@/data_service/customers/getCustomers";

type Props = {
    customerById: (Customers | undefined)[];
};

export const customerinfo: React.FC<Props> = ({ customerById }) => {
    return (
        <div>
            {customerById?.map((item, index) => (
                <div
                    className="w-full h-[100px] bg-slate-50 font-bold text-2xs flex flex-nowrap border-b-4 justify-center my-auto"
                    key={index}
                >
                    <span className="w-[50%] h-full flex p-5 pt-[8%] ">
                        <IoPersonSharp className="text-red-400 mr-2 text-2xl" />
                        {item?.name}
                    </span>
                    <span className="w-[50%] h-full flex p-5 pt-[8%]">
                        <FaLocationDot className="text-red-400 mr-2 items-center text-2xl" />{" "}
                        {item?.address}
                    </span>
                </div>
            ))}
        </div>
    );
};
export default customerinfo;
