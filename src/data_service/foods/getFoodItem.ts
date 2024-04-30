export type foodItemsType = {
    id: number;
    img: string;
    name: string;
    price: number;
    distime: string;
    distance: string;
    category: string;
    store_id: number;
    store_name: string;
};

type Props = {
    catogory?: string;
    name?: string;
    search?: string;
};

export async function getFoodItem({
    catogory,
    name,
    search,
}: Props): Promise<foodItemsType[]> {
    const url = new URL(`http://localhost:3000/foods`);

    if (catogory) {
        url.searchParams.set("category", catogory);
    }
    if (name) {
        url.searchParams.set("name", name);
    }
    if (search) {
        url.searchParams.set("search", search);
    }
    try {
        const res = await fetch(url);
        const data: { result: foodItemsType[] } = await res.json();
        // console.log(data);

        return data.result;
    } catch (error) {
        throw error;
    }
}
