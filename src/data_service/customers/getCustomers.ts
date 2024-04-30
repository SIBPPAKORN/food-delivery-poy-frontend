export type Customers = {
    id: number;
    name: string;
    address: string;
};

export async function getCustomerByid(
    id: number,
): Promise<Customers | undefined> {
    try {
        const res = await fetch(`http://localhost:3000/customers/${id}`);
        const data: { result: Customers[] } = await res.json();

        // console.log(data.result.at(0));
        return data.result.at(0);
    } catch (error) {
        return undefined;
    }
}
