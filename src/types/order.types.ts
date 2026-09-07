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
