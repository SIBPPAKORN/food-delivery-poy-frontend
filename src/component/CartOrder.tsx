/* eslint-disable @next/next/no-img-element */
"use client";
import { foodItemsType } from "@/data_service/foods/getFoodItem";
import React from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineDeliveryDining } from "react-icons/md";

type Props = {
    selectProduct: foodItemsType[];
    handleRemoveItem: (value: number) => void;
    handleRemoveItemCart: (value: number) => void;
    totalProductpriceSum: number;
};
export const Cart: React.FC<Props> = ({
    handleRemoveItemCart,
    selectProduct,
    handleRemoveItem,
    totalProductpriceSum,
}) => {
    return (
        <>
            {selectProduct.length > 0 && (
                <div className="w-full h-[400px] mt-3 overflow-y-scroll ">
                    <table className="table w-full h-auto">
                        <thead>
                            <tr>
                                <th className="text-sm text-gray-800 "></th>
                            </tr>
                        </thead>
                        {/*เพิ่มสินค้าเข้าตะกร้า */}
                        <tbody className="w-52 h-full text-black font-bold">
                            {selectProduct.map((item, index) => (
                                <tr key={index} className="flex py-3 px-3">
                                    <img
                                        src={item.img}
                                        alt=""
                                        className="rounded-md mx-2 w-[20%] h-full flex items-center"
                                    />

                                    <div className="flex items-center right-0 ml-auto">
                                        <td>{item.name}</td>
                                        <td className="flex items-center right-0">
                                            <span className="mr-1">
                                                ${item.price}
                                            </span>
                                            {/* ลบสินค้าออกจากตะกร้า */}
                                            <MdDelete
                                                onClick={() => {
                                                    handleRemoveItem(item.id);
                                                    handleRemoveItemCart(index);
                                                }}
                                                className="text-xl ml-1 cursor-pointer"
                                            />
                                        </td>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <div className=" flex  border-b-4 font-bold">
                <p className=" m-3  flex ">
                    Delivery ...
                    <MdOutlineDeliveryDining className="text-2xl ml-1" />
                </p>
                <p className=" m-3 ml-auto pr-5"> $0</p>
            </div>

            {/* รวมราคาสินค้า*/}
            <div className="flex items-center font-bold text-lg ml-auto pr-5">
                <div className="m-3 ">Total: ${totalProductpriceSum}</div>
            </div>
        </>
    );
};

export default Cart;
