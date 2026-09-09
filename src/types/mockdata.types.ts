export interface AuthDataInterface {
    [key: string]: {
        userId: number;
        name: string;
        email: string;
        password: string;
        role: string;
    };
}

export interface FooditemDataInterface {
    [key: string]: {
        foodId: number;
        img: string;
        alt: string;
        heading: string;
        description: string;
        ingredients: string;
        price: number;
        stock: number;
    }[];
}

export interface RestaurantDataInterface {
    [key: string]: {
        restaurantId: number;
        img: string;
        alt: string;
        heading: string;
        location: string;
        description: string;
        category: string;
    }[];
}
