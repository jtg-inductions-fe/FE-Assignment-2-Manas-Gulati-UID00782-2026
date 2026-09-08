export interface FooditemCardData {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    description: string;
    ingredients: string;
    price: number;
    stock: number;
}

export interface FooditemFormData {
    img: string;
    alt: string;
    heading: string;
    description: string;
    ingredients: string;
    price: number;
    stock: number;
}

export interface FoodCardProps {
    data: FooditemCardData;
}

export interface FoodAutoGridProps {
    data: FooditemCardData[];
}
