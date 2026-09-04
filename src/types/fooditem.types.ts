interface CardData {
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
    data: CardData;
}

export interface AutoGridProps {
    data: CardData[];
}
