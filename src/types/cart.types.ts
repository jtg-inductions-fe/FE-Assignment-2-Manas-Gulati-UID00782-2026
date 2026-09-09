export interface CartCardData {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
    quantity: number;
    stock: number;
}

export interface CardProps {
    data: CartCardData;
}

//schema for cart data required
export interface CartData {
    userId: number | null;
    restaurantId: number | null;
    food: CartCardData[];
}

//schema for Fooditem data required
export interface CartFooditemData {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
    stock: number;
}
export interface CartAutoGridProps {
    data: CartCardData[];
}
