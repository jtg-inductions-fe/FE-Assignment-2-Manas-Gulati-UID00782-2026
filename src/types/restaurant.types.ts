interface CardData {
    restaurantId: number;
    img: string;
    alt: string;
    heading: string;
    location: string;
    description: string;
    category: string;
}

export interface RestaurantFormData {
    img: string;
    alt: string;
    heading: string;
    location: string;
    description: string;
    category: string;
}

export interface RestaurantCardProps {
    data: CardData;
}

export interface RestaurantAutoGridProps {
    data: CardData[];
}
