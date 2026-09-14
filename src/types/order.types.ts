import { IconButtonProps } from '@mui/material/IconButton';

//schema for orders status
interface FoodItem {
    foodId: number;
    img: string;
    alt: string;
    heading: string;
    price: number;
    quantity: number;
}

//schema for orders items
export interface OrderDetails {
    orderId: number;
    restaurantId: number;
    customerId: number;
    foodItem: FoodItem[];
    totalPrice: number;
    date: string;
    orderStatus: string;
    stockDeducted?: boolean;
}

export interface OrdersDetailProps {
    data: OrderDetails[];
    canChangeStatus: boolean;
    restaurantNames: Record<number, string>;
}

export interface OrderCardProps {
    data: OrderDetails;
    restaurantName: string;
    canChangeStatus: boolean;
}

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

//different order state for easy management
export interface OrdersState {
    byId: Record<number, OrderDetails>; //by order id
    allIds: number[]; //all orders
    byCustomerId: Record<number, number[]>; //mapping customer id with their orders
    byRestaurantId: Record<number, number[]>; //mapping restaurant with their orders
}

export interface RestaurantNameOrdersInterface {
    [key: number]: string;
}
