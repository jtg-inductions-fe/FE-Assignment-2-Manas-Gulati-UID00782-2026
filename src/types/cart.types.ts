export interface CartCardData {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
    quantity: number;
}

export interface CardProps {
    data: CartCardData;
}

export interface AutoGridProps {
    data: CartCardData[];
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
}
