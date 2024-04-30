/* eslint-disable @next/next/no-img-element */
"use client";
import { NextPage } from "next";
import { useState, useEffect, useTransition } from "react";
import BanNers from "@/component/Banner";
import Cart from "@/component/CartOrder";
import Customerinfo from "@/component/Custumer";
import FoodIteminfo from "@/component/FoodItem";
import { IoFastFoodOutline } from "react-icons/io5";
import {
    type foodItemsType,
    getFoodItem,
} from "@/data_service/foods/getFoodItem";
import {
    type Customers,
    getCustomerByid,
} from "@/data_service/customers/getCustomers";
import Search from "@/component/SearchFilter";
import Category from "@/component/Category";
import {
    OrderItems,
    createTrasaction,
} from "@/data_service/transaction/create_transaction";
import { Restaurants } from "@/component/Restaurants";





export const Home: NextPage = () => {
    //ข้อมูลลูกค้า
    const [customers, setCustomers] = useState<Customers>();

    //ค้นหาด้วยชื่อ
    const [searchText, setSearchText] = useState<string>("");

    //ค้นหาด้วยcatagory
    const [catagory, setCatagory] = useState<string>("");

    //สินค้าFoodItem
    const [foodItem, setFoodItem] = useState<foodItemsType[]>([]);

    //เพิ่มสินค้าเข้าตะกร้าใน Data
    const [selectProductItems, setProductItems] = useState<OrderItems[] | null>(
        null,
    );

    //เพิ่มสินค้าเข้าตะกร้าใน Cart
    const [selectProductCart, setselectProductCart] = useState<foodItemsType[]>(
        [],
    );
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //ดึงข้อมูล data ของFoodItems
    async function loadFoodItems() {
        const data = await getFoodItem({
            search: searchText,
            catogory: catagory,
        });
        console.log(data);

        setFoodItem(data);
    }

    useEffect(() => {
        loadFoodItems();
    }, [searchText, catagory]);

    //ดึงข้อมูล data ของCustomers
    async function loadCustomers() {
        const data = await getCustomerByid(2);
        setCustomers(data);
    }

    useEffect(() => {
        loadCustomers();
        console.log("poy", customers);
    }, []);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // function กดสินค้าเข้าตะกร้า(Cart)
    const handleItemClickToCart = (foodItem: foodItemsType) => {
        setselectProductCart((prevSelectedCart) => [
            ...prevSelectedCart,
            foodItem,
        ]);
    };

    //function คลิกสินค้า เข้าตะกร้าสินค้า(data)
    const handleItemClickData = (foodItem: foodItemsType) => {
        setProductItems((prevSelectedItems: OrderItems[] | null) => {
            if (!prevSelectedItems) {
                return [{ food_item_id: foodItem.id, quantity: 1 }];
            }

            const isSelect = prevSelectedItems.some((prevItem: OrderItems) => {
                return prevItem.food_item_id === foodItem.id;
            });

            if (isSelect) {
                return prevSelectedItems.map((prevItem: OrderItems) => {
                    if (prevItem.food_item_id === foodItem.id) {
                        return { ...prevItem, quantity: prevItem.quantity + 1 };
                    }

                    return prevItem;
                });
            }

            prevSelectedItems.push({ food_item_id: foodItem.id, quantity: 1 });
            return prevSelectedItems;
        });
    };

    //function ลบสินค้าออกจาก Data
    const handleRemoveItem = (removId: number) => {
        setProductItems((prevSelectedItems: OrderItems[] | null) => {
            if (!prevSelectedItems) {
                return null;
            }

            const removeItem = prevSelectedItems.find(
                (prevItem: OrderItems) => {
                    return prevItem.food_item_id === removId;
                },
            );

            if (!removeItem) {
                return prevSelectedItems;
            }

            if (removeItem.quantity === 1) {
                return prevSelectedItems.filter(
                    (item) => item.food_item_id !== removId,
                );
            }

            return prevSelectedItems.map((prevItem: OrderItems) => {
                if (prevItem.food_item_id === removId) {
                    return { ...prevItem, quantity: prevItem.quantity - 1 };
                }

                return prevItem;
            });
        });
    };

    // function ลบสินค้าออกจาก Cart
    const handleRemoveItemCart = (index: number) => {
        const newProductItemsCart = [...selectProductCart];
        newProductItemsCart.splice(index, 1);
        setselectProductCart(newProductItemsCart);
    };

    // function ผลรวมราคาสินค้า
    const totalProductPriceSum = selectProductCart.reduce(
        (sum, item) => sum + item.price,
        0,
    );



    //function เมื่อกด Submit ตะกร้าสินค้า
    // function refresh() {
    //     location.reload();
    // }

    return (
        <main className="h-screen w-full flex overflow-auto">
            <div className="w-[75%] h-full pt-6 px-6 space-y-6 overflow-x-hidden">
                <section className="Search/Filter">
                    <Search
                        onSubmit={(searchText) => {
                            console.log(searchText);

                            setSearchText(searchText);
                        }}
                    />
                </section>

                <section className="Banner">
                    <BanNers />
                </section>
                <section className="Restaurants">
                    <Restaurants />
                </section>
                <section className="Category ">
                    <Category
                        onCatagoryClick={(value) => {
                            setCatagory(value);
                        }}
                    />
                </section>
                <section className="FoodItem ">
                    <FoodIteminfo
                        foodItemAll={foodItem}
                        clickAddCart={(food: foodItemsType) => {
                            handleItemClickData(food); // for data models
                            handleItemClickToCart(food); // for cart
                        }}
                    />
                </section>
            </div>
            <div className="w-[25%] h-full bg-blue-500 flex flex-col">
                <Customerinfo customerById={customers ? [customers] : []} />

                <div className="w-full h-full bg-slate-50 flex flex-col overflow-auto  ">
                    <p className="pl-3 text-gray-800 text-2xl mt-5 flex font-serif font-bold">
                        My ORDER
                        <IoFastFoodOutline className="ml-1" />
                    </p>

                    <Cart
                        selectProduct={selectProductCart}
                        handleRemoveItem={handleRemoveItem} 
                        handleRemoveItemCart={handleRemoveItemCart }                       // handleRemoveItemCart={handleRemoveItemCart}
                        totalProductpriceSum={totalProductPriceSum}
                    />
                </div>

                <div className="w-full h-[24%] bg-slate-50   items-stretch justify-center  text-slate-200  text-xl">
                    <button
                        onClick={async () => {
                            
                            if (!selectProductItems) {
                                return;
                            }

                            if (customers?.id) {
                                await createTrasaction({
                                    customer_id: customers.id,
                                    items: selectProductItems
                                });
                            }
                            
                        }}
                        className="btn btn-pimary rounded-2xl flex items-center justify-center w-[90%] h-[50%] mt-3 ml-5  bg-red-400 text-slate-200  text-xl"
                    >
                        Submit Oder
                    </button>
                </div>
            </div>
        </main>
    );
};
export default Home;
