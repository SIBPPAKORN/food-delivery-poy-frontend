export type OrderItems = {
    food_item_id: number;
    quantity: number;
};

export type Transaction = {
    customer_id: number;
    items: OrderItems[];
};

export async function createTrasaction(
    data: Transaction,
): Promise<{ result: string }> {
    try {
        const res = await fetch(`http://localhost:3000/transactions`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });

       
        const result: { result: string } = await res.json();

        return result;
    } catch (error) {
        return { result: "no success" };
    }
}
