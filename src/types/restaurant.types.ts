export interface RestaurantCardData {
    restaurantId: number;
    img: string;
    alt: string;
    heading: string;
    location: string;
    description: string;
    category: string;
    openingTime: string;
    closingTime: string;
}

export interface RestaurantFormData {
    img: string;
    alt: string;
    heading: string;
    location: string;
    description: string;
    category: string;
    openingTime: string;
    closingTime: string;
}

export interface RestaurantCardProps {
    data: RestaurantCardData;
}

export interface RestaurantAutoGridProps {
    data: RestaurantCardData[];
}

export interface SelectedRestaurant {
    restaurantId: number | null;
    restaurantName: string;
}
