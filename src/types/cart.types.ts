interface CardData {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
    quantity: number;
}

export interface CardProps {
    data: CardData;
}

export interface AutoGridProps {
    data: CardData[];
}
